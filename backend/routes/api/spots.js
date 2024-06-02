const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');
const { ValidationError, Op } = require('sequelize');
const { reconstructFieldPath } = require('express-validator/src/field-selection');
const { sign } = require('jsonwebtoken');
const { formatDateTime, formatDate, formatFullDate } = require('../../helper-functions/date-formatter')
const { hasBookingConflict } = require('../../helper-functions/booking-conflicts')
const router = express.Router();

const queryParams = [
  check('minLat')
    .optional()
    .isDecimal()
    .withMessage("Minimum latitude is invalid"),
  check('maxLat')
    .optional()
    .isDecimal()
    .withMessage("Maximum latitude is invalid"),
  check('minLng')
    .optional()
    .isDecimal()
    .withMessage("Minimum longitude is invalid"),
  check('maxLng')
    .optional()
    .isDecimal()
    .withMessage("Maximum longitude is invalid"),
  check('minPrice')
    .optional()
    .isDecimal()
    .withMessage("Minimum price must be a decimal value")
    .custom(value => {
      if (value < 0) {
        throw new Error("Minimum price must be greater than or equal to 0");
      }
      return true;
    }),
  check('maxPrice')
    .optional()
    .isDecimal()
    .withMessage("Maximum price must be a decimal value")
    .custom(value => {
      if (value < 0) {
        throw new Error("Maximum price must be greater than or equal to 0");
      }
      return true;
    }),
    handleValidationErrors
]

// Get all spots
router.get('/', queryParams, async (req, res, next) => {
  try {
    let { minLat, maxLat, minLng, maxLng, minPrice, maxPrice, page = 1, size = 20 } = req.query;
    if ((page < 1 || page === undefined) && (size < 1 ||size === undefined)) {
      console.log('tripping');
      res.status(400).json({message: "Bad Request",
      errors: {
        page: "Page must be greater than or equal to 1",
        size: "Size must be greater than or equal to 1"
      }})

    }
    if (page < 1 || page === undefined) {
      res.status(400).json({message: "Bad Request",
      errors: {
        page: "Page must be greater than or equal to 1"
      }})
    }
    if (size < 1 || size === undefined) {
      res.status(400).json({message: "Bad Request",
      errors: {
        page: "Size must be greater than or equal to 1"
      }})    }

    if (!page) page = 1;
    if (!size) size = 20;
    if (typeof Number(page) !== 'number') {

    }
    page = Number(page);
    size = Number(size);

    if (page > 10) page = 10;
    if (size > 20) size = 20;
    let pagination = {};
    pagination.limit = size;
    pagination.offset = (page - 1) * size;

    let where = {};
    if (minLat !== undefined) {
      where.lat = { ...where.lat, [Op.gte]: Number(minLat)};
    }
    if (maxLat !== undefined) {
      where.lat = { ...where.lat, [Op.lte]: Number(maxLat)};
    }
    if (minLng !== undefined) {
      where.lng = { ...where.lng, [Op.gte]: Number(minLng)};
    }
    if (maxLng !== undefined) {
      where.lng = { ...where.lng, [Op.lte]: Number(maxLng)};
    }
    if (minPrice !== undefined && minPrice >= 0) {
      where.price = { ...where.price, [Op.gte]: minPrice}
    }
    if (maxPrice !== undefined && maxPrice >= 0) {
      where.price = { ...where.price, [Op.lte]: maxPrice}
    }


    let spotData = await Spot.findAll({
      where,
      include: [
        {model: Review},
        {model: SpotImage}
      ],
      ...pagination
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
        lat: Number(spot.lat),
        lng: Number(spot.lng),
        name: spot.name,
        description: spot.description,
        price: Number(spot.price),
        createdAt: formatDateTime(spot.createdAt),
        updatedAt: formatDateTime(spot.updatedAt),
        avgRating: avg || 0,
        previewImage: prevImgUrl || 'No Image'
      })
    })

    if(!spots || spots.length === 0) {
      res.status(404).json({message: 'There are no spots'})
    }
    res.json({"Spots": spots, page, size});
  } catch(error) {
    next(error)
  }
});

// Get all spots by current user
router.get('/current', requireAuth, handleValidationErrors, async (req, res, next) => {
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
        lat: Number(spot.lat),
        lng: Number(spot.lng),
        name: spot.name,
        description: spot.description,
        price: Number(spot.price),
        createdAt: formatDateTime(spot.createdAt),
        updatedAt: formatDateTime(spot.updatedAt),
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

    spotData.dataValues.lat = Number(spotData.dataValues.lat)
    spotData.dataValues.lng = Number(spotData.dataValues.lng)
    spotData.dataValues.price = Number(spotData.dataValues.price)
    spotData.dataValues.numReviews = count || 0;
    spotData.dataValues.avgStarRating = avg || 0;
    spotData.dataValues.createdAt = formatDateTime(spotData.dataValues.createdAt)
    spotData.dataValues.updatedAt = formatDateTime(spotData.dataValues.updatedAt)

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
      // does spot exist
    let spotExists = await Spot.findByPk(spotId);
    if (!spotExists) {
      return res.status(404).json({ message: "Spot couldn't be found"})
    }
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

      review.dataValues.createdAt = formatDateTime(review.dataValues.createdAt);
      review.dataValues.updatedAt = formatDateTime(review.dataValues.updatedAt);
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
      let newReview = await Review.create({ spotId, userId: user.id, review, stars });
      newReview = newReview.toJSON();
      newReview.createdAt = formatDateTime(newReview.createdAt);
      newReview.updatedAt = formatDateTime(newReview.updatedAt);
      return res.status(201).json(newReview);
    }
  } catch(error) {
    error.status = 400;
    error.message = "Bad Request"
    next(error)
  }
})

// Create new spot
router.post('/', requireAuth, handleValidationErrors, async (req, res, next) => {
  try {
    const { user } = req;
    if (user) {
      const { address, city, state, country, lat, lng, name, description, price } = req.body;
      let spot = await Spot.create({ ownerId: user.id, address, city, state, country, lat, lng, name, description, price });

      spot = spot.toJSON();
      spot.createdAt = formatDateTime(spot.createdAt);
      spot.updatedAt = formatDateTime(spot.updatedAt);
      spot.lat = Number(spot.lat);
      spot.lng = Number(spot.lng);
      spot.price = Number(spot.price);
      res.status(201);
      return res.json(spot);
    } else {
      res.status(400).json({message: 'User must be logged in to create spot!'})
    }
  } catch(error) {
    error.message = "Bad Request";
    console.error('console.error error===============', error)
    error.status = 400;
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


      // is image a preview
      if (image.preview) {
        // get spot images by user
        let spotImagePreview = await SpotImage.findAll({
          where: {
            preview: true,
            spotId: spotId
          }
        })
        let preview = false;
        console.log(spotImagePreview[0].toJSON());

        if (spotImagePreview.length > 1) {
          spotImagePreview[0].set({
            preview
          });
          spotImagePreview[0].save();
        }

      }
      res.status(201);
      return res.json(imageRes)
    } else {
      res.status(403).json({message: "Forbidden"})
    }
  } catch (error) {
    error.status = 404;
    console.error("Error adding image to spot:", error);
    throw error;
  }
});

// Edit spot by spotId
router.put('/:spotId', requireAuth, handleValidationErrors, async (req, res) => {
  try {
    let { user } = req;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    let spotId = req.params.spotId;
    spotId = Number(spotId);

    // does spot exist
    let spotExists = await Spot.findByPk(spotId);
    if (!spotExists) {
      res.status(404).json({message: "Spot couldn't be found"})
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
      let updatedSpot = await Spot.findByPk(spotId);
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
      updatedSpot = updatedSpot.toJSON();
      updatedSpot.createdAt = formatDateTime(updatedSpot.createdAt);
      updatedSpot.updatedAt = formatDateTime(updatedSpot.updatedAt);
      res.json(updatedSpot);
    } else {
      res.status(403).json({message: "Forbidden"})
    }
  } catch (error) {
    error.status = 400;
    error.message = "Bad Request"
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
      res.status(404).json({message: "Spot couldn't be found"})
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
      res.status(403).json({message: "Forbidden"})
    }
  } catch (error) {
    error.status = 404;
    console.error("Error deleting spot by spotId:", error);
    throw error;
  }
})

// Create booking from spotId
router.post('/:spotId/bookings', handleValidationErrors, requireAuth, async (req, res, next) => {
  try {
    const spotId = Number(req.params.spotId);
    const { user } = req;
    let { startDate, endDate } = req.body;

    // endDate can't come on or before start date
    if (endDate <= startDate) {
      res.status(400).json({message: "Bad Request", errors: { endDate: "endDate cannot be on or before startDate"}})
    }

    // does spot exist
    let spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found"})
    }

    // is user spot
    if  (user.id === spot.dataValues.ownerId) {
      res.status(403).json({message: "Forbidden"});
    }

    // get booking dates for spot
    let bookingDates = await Booking.findAll({
      where: {
        spotId: spotId
      }
    })

    // is there a conflict with endDate and startDate
    bookingDates.forEach(booking => {
      let bookingStartDate = formatFullDate(booking.dataValues.startDate);
      let bookingEndDate = formatFullDate(booking.dataValues.endDate);
      // if the start and end date both overlap a booking
      if (hasBookingConflict(startDate, endDate, bookingStartDate, bookingEndDate) === "start end conflict") {
        res.status(403).json({
          message: "Sorry, this spot is already booked for the specified dates",
          errors: {
            startDate: "Start date conflicts with an existing booking",
            endDate: "End date conflicts with an existing booking"
          }
        }) // if the start overlaps a booking
      } else if (hasBookingConflict(startDate, endDate, bookingStartDate, bookingEndDate) === "start conflict") {
        res.status(403).json({
          message: "Sorry, this spot is already booked for the specified dates",
          errors: {
            startDate: "Start date conflicts with an existing booking"
          }
        }) // if the end overlaps a booking
      } else if (hasBookingConflict(startDate, endDate, bookingStartDate, bookingEndDate) === "end conflict") {
        res.status(403).json({
          message: "Sorry, this spot is already booked for the specified dates",
          errors: {
            endDate: "End date conflicts with an existing booking"
          }
        })
      }
    })

    // create booking
    let newBooking = await Booking.create({spotId, userId: user.id, startDate, endDate});
    newBooking = newBooking.toJSON();
    // formatting dates
    newBooking.createdAt = formatDateTime(newBooking.createdAt);
    newBooking.updatedAt = formatDateTime(newBooking.updatedAt);
    newBooking.startDate = formatDate(startDate)
    newBooking.endDate = formatDate(endDate)
    res.status(201).json(newBooking);
  } catch(error) {
    next(error)
  }
})

// Get all bookings by spotId
router.get('/:spotId/bookings', handleValidationErrors, requireAuth, async (req, res, next) => {
  try {
    let spotId = req.params.spotId;
    let { user } = req;
    let spot = await Spot.findByPk(spotId);
    if (!spot) {
      res.status(404).json({message: "Spot couldn't be found"})
    }
    if (spot.ownerId === user.id) {
      let spotBookings = await Booking.findAll({
        where: {
          spotId: spotId
        },
        include: [
          {model: User, attributes: ['id', 'firstName', 'lastName']}
        ]
      });
      spotBookings.forEach(booking => {
        booking.dataValues.startDate = formatFullDate(booking.dataValues.startDate);
        booking.dataValues.endDate = formatFullDate(booking.dataValues.endDate);
        booking.dataValues.createdAt = formatDateTime(booking.dataValues.createdAt);
        booking.dataValues.updatedAt = formatDateTime(booking.dataValues.updatedAt);
      })
      if (spotBookings.length === 0) {
        res.status(404).json({message: 'Spot has no bookings'})
      } else {
        res.json({Bookings: spotBookings})
      }
    }
    let spotBookings = await Booking.findAll({
      where: {
        spotId: spotId
      },
      attributes: ['spotId', 'startDate', 'endDate']
    })

    spotBookings.forEach(booking => {
      booking.dataValues.startDate = formatFullDate(booking.dataValues.startDate);
      booking.dataValues.endDate = formatFullDate(booking.dataValues.endDate);
    })
    if (spotBookings.length === 0) {
      res.status(404).json({message: 'Spot has no bookings'})
    } else {
      res.json({Bookings: spotBookings})
    }
  } catch(error) {
    next(error)
  }
})

module.exports = router;
