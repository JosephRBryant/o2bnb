const router = require('express').Router();
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { ReviewImage, SpotImage, Spot, Review } = require('../../db/models')
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');
const bookingsRouter = require('./bookings.js');
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use('/reviews', reviewsRouter);

router.use('/bookings', bookingsRouter);

router.delete('/spot-images/:imageId', requireAuth, handleValidationErrors, async (req, res, next) => {
  try {
    let imageId = req.params.imageId;
    // Does image exist
    let deletedImage = await SpotImage.findByPk(imageId);
    if (!deletedImage) {
      res.status(404).json({message: "Spot Image couldn't be found"})
    }
    // Does user own image
    let spotId = deletedImage.spotId;
    let { user } = req;
    let spot = await Spot.findOne({
      where: {
        id: spotId,
        ownerId: user.id
      }
    })
    if (!spot) {
      res.status(400).json({message: "Forbidden"})
    }
    // Delete image
    await deletedImage.destroy();
    return res.json({ message: 'Successfully deleted' });
  } catch (error) {
    next(error)
  }
})

router.delete('/review-images/:imageId', requireAuth, handleValidationErrors, async (req, res, next) => {
  try {
    let imageId = req.params.imageId;
    // Does image exist
    let deletedImage = await ReviewImage.findByPk(imageId);
    if (!deletedImage) {
      res.status(404).json({message: "Review Image couldn't be found"})
    }
    // Does user exist
    let { user } = req;
    if (!user) {
      res.status(401).json({message: "Authentication required"})
    }
    // Does user own image
    let reviewId = deletedImage.reviewId;
    let review = await Review.findOne({
      where: {
        id: reviewId,
        userId: user.id
      }
    })
    if (!review) {
      res.status(400).json({message: "Forbidden"})
    }
    // Delete image
    await deletedImage.destroy();
    return res.json({ message: 'Successfully deleted' });
  } catch (error) {
    next(error)
  }
})

module.exports = router;
