const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, ReviewImage } = require('../../db/models');
const { ValidationError } = require('sequelize');
const { reconstructFieldPath } = require('express-validator/src/field-selection');
const { sign } = require('jsonwebtoken');

const router = express.Router();

// Get all spots
router.get('/', async (_req, res, next) => {
  try {
    let spotData = await Spot.findAll({
      include: [
        {model: Review},
        {model: SpotImage}
      ]
    });

    let spots = [];
    spotData.forEach(spot => {

      // get average rating
      let sum = 0;
      let count = spot.Reviews.length;
      spot.Reviews.forEach(review => {
        sum += review.stars
      })
      let avg = sum / count

      //If avg is more than one decimal long
      if (JSON.stringify(avg).split('.').length === 2) {
        avg = avg.toFixed(1);
        avg = Number(avg);
      }
      // get preview image
      let prevImgUrl;
      spot.SpotImages.forEach(image => {
        if (image.preview) {
          prevImgUrl = image.url;
        }
      })

      // build response
      spots.push({
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt.toISOString().replace('Z', '').replace('T', ' ').split('.')[0],
        updatedAt: spot.updatedAt.toISOString().replace('Z', '').replace('T', ' ').split('.')[0],
        avgRating: avg || 0,
        previewImage: prevImgUrl || 'No Image'
      })
    })

    if(!spots || spots.length === 0) {
      res.status(404).json({message: 'There are no spots'})
    }
    res.json({"Spots": spots});
  } catch(error) {
    next(error)
  }
});

// Get all spots by current user
router.get('/current', requireAuth, async (req, res, next) => {
  try {
    let { user } = req;
    let spotData = await Spot.findAll({
      where: {ownerId: user.id},
      include: [
        {model: Review},
        {model: SpotImage}
      ]
    });

    let spots = [];
    spotData.forEach(spot => {

      // get average rating
      let sum = 0;
      let count = spot.Reviews.length;
      spot.Reviews.forEach(review => {
        sum += review.stars
      })
      let avg = sum / count

      //If avg is more than one decimal long
      if (JSON.stringify(avg).split('.').length === 2) {
        avg = avg.toFixed(1);
        avg = Number(avg);
      }

      // get preview image
      let prevImgUrl;
      spot.SpotImages.forEach(image => {
        console.log('image obj', image.dataValues.preview)
        if (image.preview) {
          prevImgUrl = image.url;
        }
      })

      // build response
      spots.push({
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt.toISOString().replace('Z', '').replace('T', ' ').split('.')[0],
        updatedAt: spot.updatedAt.toISOString().replace('Z', '').replace('T', ' ').split('.')[0],
        avgRating: avg || 0,
        previewImage: prevImgUrl || 'No Image'
      })
    })

    if(!spots || spots.length === 0) {
      res.status(404).json({message: 'User owns no spots'});
    }
    res.json({"Spots": spots});
  } catch (error) {
    error.status = 404;
    next(error)
  }
})

// Get spot by spotId
router.get('/:id', async (req, res, next) => {
  try {

    // Get spot and all associations
    let id = req.params.id;

    // does spot exist
    let spotExists = await Spot.findByPk(id);
    if (!spotExists) {
      return res.status(404).json({ message: "Spot couldn't be found"})
    }
    let spotData = await Spot.findOne({
      where: { id: id },
      include: [
        { model: SpotImage,
          attributes: ['id', 'url', 'preview']
        },
        { model: User,
          as: 'Owner',
          attributes: ['id','firstName','lastName']
        }
      ]
    });
    let spotReviews = await Review.findAll({
      where: {
        spotId: id
      }
    })

     // get average rating
     let sum = 0;
     let count = spotReviews.length;
     spotReviews.forEach(review => {
       sum += review.stars
     })
     let avg = sum / count;
     avg = Number(avg.toFixed(1));

    spotData.dataValues.numReviews = count || 0;
    spotData.dataValues.avgStarRating = avg || 0;

    if (!spotData) {
      res.status(404).json({message: 'Could not get spot by spotId'});
    }
    res.json(spotData)
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
        {model: ReviewImage, attributes: ['id', 'url']}
      ]
    });

    // format dates
    spotReviews.forEach(review => {
      review.dataValues.createdAt = review.dataValues.createdAt.toISOString().replace('Z', '').replace('T', ' ').split('.')[0];
      review.dataValues.updatedAt = review.dataValues.updatedAt.toISOString().replace('Z', '').replace('T', ' ').split('.')[0];
    })


    res.json({Reviews: spotReviews});
  } catch (error) {
    error.status = 404;
    next(error)
  }
})

// Create review for spot by spotId, /:spotId/reviews
router.post('/:spotId/reviews', requireAuth, handleValidationErrors, async (req, res, next) => {
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
      newReview.dataValues.createdAt = newReview.dataValues.createdAt.toISOString().replace('Z', '').replace('T', ' ').split('.')[0];
      newReview.dataValues.updatedAt = newReview.dataValues.updatedAt.toISOString().replace('Z', '').replace('T', ' ').split('.')[0];
      return res.status(201).json(newReview);
    }
  } catch(error) {
    error.status = 400;
    next(error)
  }
})

// Create new spot
router.post('/', requireAuth, handleValidationErrors, async (req, res, next) => {
  try {
    const { user } = req;
    if (user) {
      const { address, city, state, country, lat, lng, name, description, price } = req.body;
      const spot = await Spot.create({ ownerId: user.id, address, city, state, country, lat, lng, name, description, price });

      spot.dataValues.createdAt = spot.dataValues.createdAt.toISOString().replace('Z', '').replace('T', ' ').split('.')[0];
      spot.dataValues.updatedAt = spot.dataValues.updatedAt.toISOString().replace('Z', '').replace('T', ' ').split('.')[0];

      return res.json(spot);
    } else {
      res.status(400).json({message: 'User must be logged in to create spot!'})
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
      res.status(404).json({"message": "Spot couldn't be found"})
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
      const imageRes = {
        id: image.id,
        url: image.url,
        preview: image.preview
      }
      return res.json(imageRes)
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
      updatedSpot.dataValues.createdAt = updatedSpot.dataValues.createdAt.toISOString().replace('Z', '').replace('T', ' ').split('.')[0];
      updatedSpot.dataValues.updatedAt = updatedSpot.dataValues.updatedAt.toISOString().replace('Z', '').replace('T', ' ').split('.')[0];
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
