const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Username is required'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password is required'),
  check('firstName')
    .exists({checkFalsy: true})
    .withMessage('First Name is required'),
  check('lastName')
    .exists({checkFalsy: true})
    .withMessage('Last Name is required'),
  handleValidationErrors
];

router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { firstName, lastName, username, password, email } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ firstName, lastName, username, hashedPassword, email });

    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
  }
);


module.exports = router;
