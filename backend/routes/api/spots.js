const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot } = require('../../db/models');

const router = express.Router();

// Get all spots
router.get('/', async (req, res, next) => {
  try {
    const { user } = req;
    if (user) {
      const spots = await Spot.findAll({
        where: {
          ownerId: user.id
        }
      })
      res.json(spots);
    } else {
      const spots = await Spot.findAll();
      res.json(spots);
    }
  } catch(error) {
    next(error)
  }
});

// Get all spots belonging to current user.

router.post('/', async (req, res, next) => {
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

module.exports = router;
