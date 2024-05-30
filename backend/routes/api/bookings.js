const express = require('express');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Booking, Spot, SpotImage } = require('../../db/models');
const { ValidationError } = require('sequelize');
const { formatDateTime, formatFullDate } = require('../../helper-functions/date-formatter')
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
    // turn bookings into POJO
    // bookings = bookings.toJSON();

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
      // booking = booking.toJSON();
      booking.dataValues.startDate = formatFullDate(booking.dataValues.startDate)
      booking.dataValues.endDate = formatFullDate(booking.dataValues.endDate)
      booking.dataValues.createdAt = formatDateTime(booking.dataValues.createdAt)
      booking.dataValues.updatedAt = formatDateTime(booking.dataValues.updatedAt)
      spotPrevImages.forEach(image => {
        if (image.dataValues.spotId === booking.dataValues.spotId) {
          booking.dataValues.Spot.previewImage = image.url;
        } else {
          booking.dataValues.Spot.previewImage = "No preview image"
        }
        console.log(booking.dataValues.Spot.previewImage)
      })
    })
    res.json({Bookings: bookings})
  } catch(error) {
    next(error)
  }
})

// Edit booking
router.put('/:bookingId', handleValidationErrors, requireAuth, async (req, res, next) => {
  let bookingId = req.params.bookingId;
  let { startDate, endDate } = req.body;
  let booking = await Booking.findByPk(bookingId);
  if (!booking) {
    res.status(404).json({message: "Booking couldn't be found"})
  }
  if (endDate < startDate) {
    res.status(400).json({
      message: "Validation error",
      errors: {
        endDate: "endDate cannot come before startDate"
      }
    })
  }

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
})

// Delete booking
router.delete('/:bookingId', handleValidationErrors, requireAuth, async (req, res, next) => {
  let bookingId = req.params.bookingId;
  let { user } = req;
  let userBookings = await Booking.findAll({
    where:{
      userId: user.id,
      id: bookingId
    }
  });
  if (userBookings.length < 1) {
    res.status(403).json({message: "Not user's booking"})
  }
  let booking = await Booking.findByPk(bookingId);
  if (!booking) {
    res.status(404).json({message: "Booking couldn't be found"})
  }
  booking = booking.toJSON()

  if (booking.startDate < new Date()) {
    res.status(403).json({message: "Bookings that have been started can't be deleted"})
  }
  await booking.destroy();
  res.json({message: "Successfully deleted"})
})
module.exports = router;
