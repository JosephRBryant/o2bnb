const express = require('express');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage } = require('../../db/models');
const { ValidationError } = require('sequelize');

const router = express.Router();

// Get all spots
router.get('/', async (_req, res, next) => {
  try {
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
})

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
})
module.exports = router;
