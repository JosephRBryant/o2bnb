const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, ReviewImage } = require('../../db/models');
const { ValidationError } = require('sequelize');
const { reconstructFieldPath } = require('express-validator/src/field-selection');

const router = express.Router();

// Get all spots
router.get('/', async (_req, res, next) => {
  try {
    // find previewImage
    // const previewImage = await Spot.getSpotImages({
    //   where: {

    //   }
    // })

    const spots = await Spot.findAll();
    if(!spots || spots.length === 0) {
      throw new ValidationError('Could not get spots');
    }
    res.json(spots);
  } catch(error) {
    next(error)
  }
});

// Get all spots by current user
router.get('/current', requireAuth, async (req, res, next) => {
  try {
    let { user } = req;
    const spots = await Spot.findAll({
      where: {
        ownerId: user.id
      }
    });
    if (!spots || spots.length === 0) {
      throw new ValidationError('Current user has no spots')
    } else {
      res.json(spots);
    }
  } catch (error) {
    error.status = 404;
    next(error)
  }
})

// Get spot by spotId
router.get('/:id', async (req, res, next) => {
  try {
    let id = req.params.id;
    let spotDetails = await Spot.findByPk(id);
    if (spotDetails) {
      res.json(spotDetails)
    } else {
      throw new ValidationError('Could not get spot by spotId');
    }
  } catch (error) {
    error.status = 404;
    next(error)
  }
})

// Get all reviews by spotId, /:spotId/reviews
router.get('/:spotId/reviews', handleValidationErrors, async (req, res, next) => {
  try {
    let { user } = req;
    let spotId = req.params.spotId;
    spotId = Number(spotId);
    const spotReviews = await Review.findAll({
      where: {
        spotId: spotId
      },
      include: [
        {model: User, attributes: ['id', 'firstName', 'lastName']},
        // {model: ReviewImage, attributes: ['id', 'url']}
      ]
    });


    res.json({Reviews: spotReviews});
  } catch (error) {
    error.status = 404;
    next(error)
  }
})

// Create review for spot by spotId, /:spotId/reviews
router.post('/:spotId/reviews', handleValidationErrors, requireAuth, async (req, res, next) => {
  try {
    let spotId = req.params.spotId;
    spotId = Number(spotId);
    const { user } = req;

    // get user reviews
    let userReviews = await Review.findAll({
      where: {
        userId: user.id,
        spotId: spotId
      }
    })

    if (userReviews.length > 0) {
      return res.status(500).json({message: "User already has a review for this spot"})
    }

    // does the  belong to the user
    let isUserReview = false;
    userReviews.forEach((review) => {
      if (review.id === reviewId) {
        isUserReview = true;
      }
    });

    // does spot exist
    let spotExists = await Spot.findByPk(spotId);
    if (!spotExists) {
      return res.status(404).json({ message: "Spot couldn't be found"})
    }

    // find user spots
    let userSpots = await Spot.findAll({
      where: {
        ownerId: user.id
      }
    });

    // if spot belongs to user, user can't review spot
    let isUserSpot = false;
    userSpots.forEach((spot) => {
      if (spot.id === spotId) {
        isUserSpot = true;
      }
    });

    if (user) {
      const { review, stars } = req.body;
      if (isUserSpot) {
        throw new ValidationError('User cannot review their own spots')
      }
      const newReview = await Review.create({ spotId, userId: user.id, review, stars });
      return res.status(201).json(newReview);
    }
  } catch(error) {
    error.status = 400;
    next(error)
  }
})

// Create new spot
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { user } = req;
    if (user) {
      const { address, city, state, country, lat, lng, name, description, price } = req.body;
      const spot = await Spot.create({ ownerId: user.id, address, city, state, country, lat, lng, name, description, price });

      return res.json(spot);
    } else {
      throw new Error('User must be logged in to create spot!')
    }
  } catch(error) {
    next(error)
  }
});

// Add image to spot by spotId
router.post('/:spotId/images', handleValidationErrors, requireAuth, async (req, res) => {
  try {
    let { user } = req;
    let { url, preview } = req.body;
    let spotId = req.params.spotId;
    spotId = Number(spotId);

    // does spot exist
    let spotExists = await Spot.findByPk(spotId);
    if (!spotExists) {
      throw new ValidationError("Spot couldn't be found")
    }

    // find user spots
    let userSpots = await Spot.findAll({
      where: {
        ownerId: user.id
      }
    });

    // does the spot belong to the user
    let isUserSpot = false;
    userSpots.forEach((spot) => {
      if (spot.id === spotId) {
        isUserSpot = true;
      }
    });

    if (isUserSpot) {
      const image = await SpotImage.create({spotId, url, preview});
      return res.json(image)
    } else {
      throw new ValidationError('Current user does not own spot')
    }
  } catch (error) {
    error.status = 404;
    console.error("Error adding image to spot:", error);
    throw error;
  }
});

// Edit spot by spotId
router.put('/:spotId', handleValidationErrors, requireAuth, async (req, res) => {
  try {
    let { user } = req;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    let spotId = req.params.spotId;
    spotId = Number(spotId);

    // does spot exist
    let spotExists = await Spot.findByPk(spotId);
    if (!spotExists) {
      throw new ValidationError("Spot couldn't be found")
    }

    // find user spots
    let userSpots = await Spot.findAll({
      where: {
        ownerId: user.id
      }
    });

    // does the spot belong to the user
    let isUserSpot = false;
    userSpots.forEach((spot) => {
      if (spot.id === spotId) {
        isUserSpot = true;
      }
    });

    // if spot belongs to user update spot with req body
    if (isUserSpot) {
      const updatedSpot = await Spot.findByPk(spotId);
      updatedSpot.set({
        address,
        city,
        state, country,
        lat,
        lng,
        name,
        description,
        price
      })
      await updatedSpot.save();
      res.json(updatedSpot);
    } else {
      throw new ValidationError('Current user does not own spot')
    }
  } catch (error) {
    error.status = 400;
    console.error("Error deleting spot by spotId:", error);
    throw error;
  }
})

// Delete spot by spotId
router.delete('/:spotId', handleValidationErrors, requireAuth, async (req, res) => {
  try {
    let { user } = req;
    let spotId = req.params.spotId;
    spotId = Number(spotId);

    // does spot exist
    let spotExists = await Spot.findByPk(spotId);
    if (!spotExists) {
      throw new ValidationError("Spot couldn't be found")
    }

    // find user spots
    let userSpots = await Spot.findAll({
      where: {
        ownerId: user.id
      }
    });

    // does the spot belong to the user
    let isUserSpot = false;
    userSpots.forEach((spot) => {
      if (spot.id === spotId) {
        isUserSpot = true;
      }
    });

    // if spot belongs to user delete spot entry
    if (isUserSpot) {
      const deletedSpot = await Spot.findByPk(spotId);
      await deletedSpot.destroy();
      return res.json({ message: 'Successfully deleted' });
    } else {
      throw new ValidationError('Current user does not own spot')
    }
  } catch (error) {
    error.status = 404;
    console.error("Error deleting spot by spotId:", error);
    throw error;
  }
})
module.exports = router;
