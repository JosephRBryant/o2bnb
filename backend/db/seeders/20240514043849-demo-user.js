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
         firstName: 'Anthony',
         lastName: 'Weiner',
         username: 'FakeUser1',
         hashedPassword: bcrypt.hashSync('password2'),
         email: 'user1@user.io'
       },
       {
         firstName: 'Judas',
         lastName: 'Prast',
         username: 'FakeUser2',
         hashedPassword: bcrypt.hashSync('password3'),
         email: 'user2@user.io'
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
