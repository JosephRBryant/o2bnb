const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const spots = await Spot.findAll();
    res.json(spots);
  } catch(error) {
    next(error)
  }
})

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
