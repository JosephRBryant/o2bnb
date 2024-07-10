'use strict';

const { User } = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
options.tableName = "Users"
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await User.bulkCreate([
       {
         firstName: 'Mike',
         lastName: 'Andowsky',
         username: 'Demo-lition',
         hashedPassword: bcrypt.hashSync('password'),
         email: 'demo@user.io'
       },
       {
         firstName: 'Samwise',
         lastName: 'Tarly',
         username: 'Dragonslayer',
         hashedPassword: bcrypt.hashSync('password2'),
         email: 'user1@user.io'
       },
       {
         firstName: 'Judas',
         lastName: 'Smiley',
         username: 'FakeUser2',
         hashedPassword: bcrypt.hashSync('password3'),
         email: 'user2@user.io'
       },
       {
         firstName: 'Sarkar',
         lastName: 'Beezleboop',
         username: 'Jimmyjangs41',
         hashedPassword: bcrypt.hashSync('password4'),
         email: 'user3@user.io'
       }
     ], { validate: true })
    } catch(error) {
      console.error('seeder error================', error)
      throw new Error('Error in the Users seeder')
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo_User_1', 'Demo_User_2', 'Demo_User_3']}
    }, {});
  }
};
