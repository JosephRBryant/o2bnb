const express = require('express');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Booking, Spot, SpotImage } = require('../../db/models');
const { ValidationError } = require('sequelize');
const { formatDateTime, formatFullDate } = require('../../helper-functions/date-formatter')
const { hasBookingConflict } = require('../../helper-functions/booking-conflicts')
const router = express.Router();


// Get current user bookings
router.get('/current', handleValidationErrors, requireAuth, async (req, res, next) => {
  try {
    const { user } = req;

    // Get all bookings of user, include Spot and attributes
    let bookings = await Booking.findAll({
      where: {
        userId: user.id
      },
      include: [
        {model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']}
      ]
    })

    // get all spot preview images
    const spotPrevImages = await SpotImage.findAll({
      where: {
        preview: true
      }
    })

    // for each booking, if spot has spot preview image
    // create and assign previewImage key to image url
    // else create and assign previewImage to No prev Img
    bookings.forEach(booking => {
      booking.dataValues.startDate = formatFullDate(booking.dataValues.startDate);
      booking.dataValues.endDate = formatFullDate(booking.dataValues.endDate);
      booking.dataValues.createdAt = formatDateTime(booking.dataValues.createdAt);
      booking.dataValues.updatedAt = formatDateTime(booking.dataValues.updatedAt);
      booking.dataValues.Spot.lat = Number(booking.dataValues.Spot.lat);
      booking.dataValues.Spot.lng = Number(booking.dataValues.Spot.lng);
      booking.dataValues.Spot.price = Number(booking.dataValues.Spot.price);

      // get preview image
      let prevImgUrl;
      spotPrevImages.forEach(image => {
        if (image.dataValues.spotId === booking.dataValues.spotId) {
          prevImgUrl = image.dataValues.url;
        }
      })
      booking.dataValues.Spot.dataValues.previewImage = prevImgUrl || "No Image"
    })
    res.json({Bookings: bookings})
  } catch(error) {
    next(error)
  }
})

// Edit booking
router.put('/:bookingId', requireAuth, handleValidationErrors, async (req, res, next) => {
  try {
    let bookingId = req.params.bookingId;
    let { startDate, endDate } = req.body;
    let { user } = req;
    let booking = await Booking.findByPk(bookingId);
    // does booking exist
    if (!booking) {
      res.status(404).json({message: "Booking couldn't be found"})
    }
    // does booking belong to user
    if (booking.dataValues.userId !== user.id) {
      res.status(403).json({message: "Forbidden"})
    }
    // does endDate come before startDate
    if (endDate <= startDate) {
      res.status(400).json({
        message: "Bad Request",
        errors: {
          endDate: "endDate cannot come before startDate"
        }
      })
    }

    // get booking dates for spot
    let bookingDates = await Booking.findAll({
      where: {
        spotId: booking.dataValues.spotId
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

    if (endDate < formatFullDate(new Date())) {
      res.status(403).json({message: "Past bookings can't be modified"})
    }

    booking.set({
      startDate,
      endDate
    })
    await booking.save();
    booking = booking.toJSON();
    booking.startDate = formatFullDate(booking.startDate)
    booking.endDate = formatFullDate(booking.endDate)
    booking.createdAt = formatDateTime(booking.createdAt)
    booking.updatedAt = formatDateTime(booking.updatedAt)
    res.json(booking);
  } catch (error) {
    next(error)
  }
})

// Delete booking
router.delete('/:bookingId', requireAuth, handleValidationErrors, async (req, res, next) => {
  try {
    let bookingId = req.params.bookingId;
    let { user } = req;
    let booking = await Booking.findByPk(bookingId);
    // does booking exist
    if (!booking) {
      res.status(404).json({message: "Booking couldn't be found"})
    }
    // does user own booking
    if (booking.dataValues.userId !== user.id) {
      res.status(403).json({message: "Forbidden"})
    }

    if (booking.dataValues.startDate < new Date()) {
      res.status(403).json({message: "Bookings that have been started can't be deleted"})
    }
    await booking.destroy();
    res.json({message: "Successfully deleted"})
  } catch (error) {
    next(error)
  }
})
module.exports = router;
