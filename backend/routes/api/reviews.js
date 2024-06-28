const express = require('express');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Review, ReviewImage, User, Spot, SpotImage } = require('../../db/models');
const { ValidationError } = require('sequelize');
const { formatDateTime } = require('../../helper-functions/date-formatter')

const router = express.Router();

// Get all reviews by current user
router.get('/current', requireAuth, async (req, res, next) => {
  try {
    let { user } = req;

    // Initial Response build
    const reviews = await Review.findAll({
      where: {
        userId: user.id
      },
      include: [
        {model: User, attributes: ['id', 'firstName', 'lastName']},
        {model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']},
        {model: ReviewImage, attributes: ['id', 'url']}
      ]
    })

    // Get all spot images
    const spotImages = await SpotImage.findAll()
    // For each review get spotId
    // For each spot image if spotId match and prev img is true
      // add previewImage and url to associated Spot
    if (!reviews || reviews.length === 0) {
      res.status(404).json({message: 'Current user has no reviews'})
    } else {
      reviews.forEach(review => {
        // format dates
        // review.dataValues.createdAt = review.dataValues.createdAt.toISOString().replace('Z', '').replace('T', ' ').split('.')[0];
        // review.dataValues.updatedAt = review.dataValues.updatedAt.toISOString().replace('Z', '').replace('T', ' ').split('.')[0];
        review.dataValues.createdAt = formatDateTime(review.dataValues.createdAt);
        review.dataValues.updatedAt = formatDateTime(review.dataValues.updatedAt);
        review.Spot.lat = Number(review.Spot.lat);
        review.Spot.lng = Number(review.Spot.lng);
        review.Spot.price = Number(review.Spot.price);
        let spotId = review.spotId;
        spotImages.forEach(image => {
          if (image.spotId === spotId && image.preview) {
            return review.Spot.dataValues.previewImage = image.url;
          }
        })
        // If spot preview is false add previewImage and No preview message to spot
        if (!review.Spot.dataValues.previewImage) {
          return review.Spot.dataValues.previewImage = "No preview image";
        }
      })




      res.json({Reviews: reviews})
    }
  } catch (error) {
    next(error)
  }
})

// Add image to review by reviewId
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
  try {
    let { user } = req;
    let { url } = req.body;
    let reviewId = req.params.reviewId;
    reviewId = Number(reviewId);

    // does review exist
    let reviewExists = await Review.findByPk(reviewId);
    if (!reviewExists) {
      return res.status(404).json({message: "Review couldn't be found"})
    }

    // check review image count, max 10 per review
    let imageCount = await ReviewImage.count({
      where: {
        reviewId: reviewId
      }
    })
    if (imageCount >= 10) {
      return res.status(403).json({message: "Maximum number of images for this resource was reached"})
    }

    // find user reviews
    let userReviews = await Review.findAll({
      where: {
        userId: user.id
      }
    });

    // does the review belong to the user
    let isUserReview = false;
    userReviews.forEach((review) => {
      if (review.id === reviewId) {
        isUserReview = true;
      }
    });

    if (isUserReview) {
      const image = await ReviewImage.create({reviewId, url});
      res.status(201);
      return res.json({"id": image.id, "url": image.url})
    } else {
      return res.status(403).json({message: 'Forbidden'});
    }

  } catch (error) {
    error.status = 404;
    console.error('Error adding image to review:', error)
    throw error;
  }
})

// Edit review by reviewId
router.put('/:reviewId', requireAuth, handleValidationErrors, async (req, res, next) => {
  try {
    let reviewId = req.params.reviewId;
    reviewId = Number(reviewId);
    const { user } = req;
    const { review, stars } = req.body

    // does review exist
    let reviewExists = await Review.findByPk(reviewId);
    if (!reviewExists) {
      res.status(404).json({message: "Review couldn't be found"})
    }

    // find user reviews
    let userReviews = await Review.findAll({
      where: {
        userId: user.id
      }
    })

    // if review belongs to user, let user update review
    let isUserReview = false;
    userReviews.forEach(review => {
      if (review.id === reviewId) {
        isUserReview = true;
      }
    })

    if (isUserReview) {
      let updatedReview = await Review.findByPk(reviewId);
      updatedReview.set({
        review,
        stars
      })
      await updatedReview.save();
      updatedReview = updatedReview.toJSON();
      updatedReview.createdAt = formatDateTime(updatedReview.createdAt);
      updatedReview.updatedAt = formatDateTime(updatedReview.updatedAt);

      res.json(updatedReview);
    } else {
      return res.status(403).json({message: 'Forbidden'});
    }

  } catch (error) {
    error.message = "Bad Request";
    error.status = 400;
    next(error)
  }
})

// Delete review by reviewId
router.delete('/:reviewId', handleValidationErrors, requireAuth, async (req, res) => {
  try {
    let { user } = req;
    let reviewId = req.params.reviewId;
    reviewId = Number(reviewId);

    // does review exist
    let reviewExists = await Review.findByPk(reviewId);
    if (!reviewExists) {
      res.status(404).json({message: "Review couldn't be found"})
    }

    // find user reviews
    let userReviews = await Review.findAll({
      where: {
        userId: user.id
      }
    });

    // does the review belong to the user
    let isUserReview = false;
    userReviews.forEach((review) => {
      if (review.id === reviewId) {
        isUserReview = true;
      }
    });

    // if review belongs to user delete review entry
    if (isUserReview) {
      const deletedReview = await Review.findByPk(reviewId);
      await deletedReview.destroy();
      return res.json({ message: 'Successfully deleted' });
    } else {
      return res.status(403).json({message: 'Forbidden'});
    }
  } catch (error) {
    error.status = 404;
    console.error("Error deleting review by reviewId:", error);
    throw error;
  }
})
module.exports = router;
