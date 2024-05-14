'use strict';

const { User } = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await User.bulkCreate([
    {
      email: 'demoUser1@gmail.com',
      username: 'Demo_User_1',
      hashedPassword: bcrypt.hashSync('password1')
    },
    {
      email: 'demoUser2@gmail.com',
      username: 'Demo_User_2',
      hashedPassword: bcrypt.hashSync('password2')
    },
    {
      email: 'demoUser3@gmail.com',
      username: 'Demo_User_3',
      hashedPassword: bcrypt.hashSync('password3')
    }
   ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo_User_1', 'Demo_User_2', 'Demo_User_3']}
    }, {});
  }
};
