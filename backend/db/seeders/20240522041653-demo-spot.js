'use strict';

const { Spot } = require('../models');

let options = {};
options.tableName = "Spots"
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await Spot.bulkCreate([
        {
          ownerId: 1,
          address: '124 Sandlewood Ln',
          city: 'Tyler',
          state: 'Texas',
          country: 'United States',
          lat: 37.7645358,
          lng: -122.4730327,
          name: 'Mi Casa Bryant',
          description: 'Brand new digs for fun times for all',
          price: 400
        },
        {
          ownerId: 2,
          address: '224 Sandlewood Ln',
          city: 'Byler',
          state: 'Texas',
          country: 'United States',
          lat: 67.7645358,
          lng: 102.4730327,
          name: 'Mi Casa Bryiantant',
          description: 'Brand Brand new digs for fun times for all',
          price: 200
        },
        {
          ownerId: 3,
          address: '324 Sandlewood Ln',
          city: 'Skyler',
          state: 'Texas',
          country: 'United States',
          lat: 77.7645358,
          lng: -127.4730327,
          name: 'Mi Casa Brrrrryant',
          description: 'Brand new new digs for fun times for all',
          price: 300
        },
        {
          ownerId: 1,
          address: '32 Sandood Ln',
          city: 'Sler',
          state: 'Texas',
          country: 'United States',
          lat: 44.7645358,
          lng: -177.4730327,
          name: 'Brrrrryant',
          description: 'Brand fun times for all',
          price: 300
        }
      ], { validate: true })
    } catch(error) {
      console.error('Error duing seeding spots: ', error);
      throw error;
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    let spots = await Spot.findAll();

    return queryInterface.bulkDelete(options, {
      where: { ...spots }
    }, {});
  }
};
