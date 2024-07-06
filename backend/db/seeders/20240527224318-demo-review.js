'use strict';

const { Review } = require('../models');

let options = {};
options.tableName = "Reviews"
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await Review.bulkCreate([
        {
          userId: 1,
          spotId: 3,
          review: 'Best spot ever!',
          stars: 5
        },
        {
          userId: 2,
          spotId: 1,
          review: 'Worst spot ever!',
          stars: 2
        },
        {
          userId: 2,
          spotId: 3,
          review: 'Most decent spot ever!',
          stars: 3
        },
        {
          userId: 2,
          spotId: 4,
          review: 'Mediocre spot!',
          stars: 4
        },
        {
          userId: 3,
          spotId: 1,
          review: 'Not so bad!',
          stars: 4
        },
        {
          userId: 3,
          spotId: 4,
          review: 'Best spot that ever was!',
          stars: 5
        },
      ], { validate: true })
    } catch(error) {
      console.error('Error during seeding of reviews');
      throw error;
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    let reviews = await Review.findAll();

    return queryInterface.bulkDelete(options, {
      where: { ...reviews }
    }, {});
  }
};
