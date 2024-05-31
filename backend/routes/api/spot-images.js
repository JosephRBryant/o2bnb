const express = require('express');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage } = require('../../db/models');
const { ValidationError } = require('sequelize');
const { formatDateTime } = require('../../helper-functions/date-formatter')
const router = express.Router();

// Delete spot image
router.delete('/:imageId', requireAuth, handleValidationErrors, async (req, res, next) => {
  let imageId = req.params.imageId;
  let { user } = req;
  
})



module.exports = router;
