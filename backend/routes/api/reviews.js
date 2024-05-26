const express = require('express');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Review, ReviewImage, User, Spot, SpotImage } = require('../../db/models');
const { ValidationError } = require('sequelize');

const router = express.Router();

// Get all reviews by current user
router.get('/current', requireAuth, async (req, res, next) => {
  try {
    let { user } = req;

    // get spot preview image


    const reviews = await Review.findAll({
      where: {
        userId: user.id
      },
      include: [
        {model: User, attributes: ['id', 'firstName', 'lastName']},
        {model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price', previewImage]},
        {model: ReviewImage, attributes: ['id', 'url']}
      ]
    })
    if (!reviews || reviews.length === 0) {
      throw new ValidationError('Current user has no reviews')
    } else {
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

    // check review image count, max 10 per review
    let imageCount = await ReviewImage.count({
      where: {
        reviewId: reviewId
      }
    })
    if (imageCount > 9) {
      return res.status(403).json({message: "Maximum number of images for this resource was reached"})
    }

    if (isUserReview) {
      const image = await ReviewImage.create({reviewId, url});

      return res.json({"id": image.id, "url": image.url})
    } else {
      return res.status(500).json({message: 'Current user does not own review'});
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
      throw new ValidationError("Review couldn't be found")
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
      const updatedReview = await Review.findByPk(reviewId);
      updatedReview.set({
        review,
        stars
      })
      await updatedReview.save();
      res.json(updatedReview);
    } else {
      throw new ValidationError('Current user does not own review')
    }

  } catch (error) {
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
      return res.status(500).json({ message: "Current user does not own review"})
    }
  } catch (error) {
    error.status = 404;
    console.error("Error deleting review by reviewId:", error);
    throw error;
  }
})
module.exports = router;
