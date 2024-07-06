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
        { userId: 2, spotId: 1, review: 'Fantastic place to stay!', stars: 5 },
        { userId: 3, spotId: 1, review: 'Quite a cozy spot.', stars: 4 },
        { userId: 4, spotId: 1, review: 'Had a wonderful time.', stars: 5 },
        { userId: 1, spotId: 2, review: 'Really loved the environment.', stars: 4 },
        { userId: 3, spotId: 2, review: 'A decent place to unwind.', stars: 3 },
        { userId: 4, spotId: 2, review: 'Enjoyed my stay.', stars: 4 },
        { userId: 1, spotId: 3, review: 'Amazing spot!', stars: 5 },
        { userId: 2, spotId: 3, review: 'Very relaxing atmosphere.', stars: 4 },
        { userId: 4, spotId: 3, review: 'Will visit again.', stars: 5 },
        { userId: 1, spotId: 4, review: 'Great location.', stars: 4 },
        { userId: 2, spotId: 4, review: 'Pleasant stay.', stars: 4 },
        { userId: 3, spotId: 4, review: 'Wonderful experience.', stars: 5 },
        { userId: 2, spotId: 5, review: 'Comfortable and clean.', stars: 4 },
        { userId: 3, spotId: 5, review: 'Good value for money.', stars: 3 },
        { userId: 4, spotId: 5, review: 'Highly recommended.', stars: 5 },
        { userId: 1, spotId: 6, review: 'Lovely place.', stars: 4 },
        { userId: 3, spotId: 6, review: 'Could be better.', stars: 3 },
        { userId: 4, spotId: 6, review: 'Nice and cozy.', stars: 4 },
        { userId: 1, spotId: 7, review: 'Had a pleasant stay.', stars: 4 },
        { userId: 2, spotId: 7, review: 'Well-maintained.', stars: 3 },
        { userId: 4, spotId: 7, review: 'Would stay here again.', stars: 5 },
        { userId: 1, spotId: 8, review: 'Great amenities.', stars: 5 },
        { userId: 2, spotId: 8, review: 'Enjoyed the visit.', stars: 4 },
        { userId: 3, spotId: 8, review: 'Very comfortable.', stars: 4 },
        { userId: 2, spotId: 9, review: 'Nice place.', stars: 3 },
        { userId: 3, spotId: 9, review: 'Clean and cozy.', stars: 4 },
        { userId: 4, spotId: 9, review: 'Will recommend to others.', stars: 5 },
        { userId: 1, spotId: 10, review: 'Had a good time.', stars: 4 },
        { userId: 3, spotId: 10, review: 'Quiet and peaceful.', stars: 4 },
        { userId: 4, spotId: 10, review: 'Loved the stay.', stars: 5 },
        { userId: 1, spotId: 11, review: 'Very nice place.', stars: 4 },
        { userId: 2, spotId: 11, review: 'Good for the price.', stars: 3 },
        { userId: 4, spotId: 11, review: 'Excellent stay.', stars: 5 },
        { userId: 1, spotId: 12, review: 'Wonderful place.', stars: 5 },
        { userId: 2, spotId: 12, review: 'Nice and clean.', stars: 4 },
        { userId: 3, spotId: 12, review: 'Had a great experience.', stars: 5 },
        { userId: 2, spotId: 13, review: 'Great spot.', stars: 4 },
        { userId: 3, spotId: 13, review: 'Very enjoyable.', stars: 4 },
        { userId: 4, spotId: 13, review: 'Awesome place.', stars: 5 },
        { userId: 1, spotId: 14, review: 'Loved the ambiance.', stars: 4 },
        { userId: 3, spotId: 14, review: 'Perfect spot.', stars: 5 },
        { userId: 4, spotId: 14, review: 'Will return.', stars: 5 },
        { userId: 1, spotId: 15, review: 'Nice experience.', stars: 4 },
        { userId: 2, spotId: 15, review: 'Really good.', stars: 4 },
        { userId: 4, spotId: 15, review: 'Enjoyed my time here.', stars: 5 },
        { userId: 1, spotId: 16, review: 'Great view.', stars: 4 },
        { userId: 2, spotId: 16, review: 'Pleasant stay.', stars: 4 },
        { userId: 3, spotId: 16, review: 'Loved it.', stars: 5 },
        { userId: 2, spotId: 17, review: 'Comfortable and clean.', stars: 4 },
        { userId: 3, spotId: 17, review: 'Good value for money.', stars: 4 },
        { userId: 4, spotId: 17, review: 'Highly recommended.', stars: 5 },
        { userId: 1, spotId: 18, review: 'Lovely place.', stars: 4 },
        { userId: 3, spotId: 18, review: 'Could be better.', stars: 3 },
        { userId: 4, spotId: 18, review: 'Nice and cozy.', stars: 4 },
        { userId: 1, spotId: 19, review: 'Had a pleasant stay.', stars: 4 },
        { userId: 2, spotId: 19, review: 'Well-maintained.', stars: 4 },
        { userId: 4, spotId: 19, review: 'Would stay here again.', stars: 5 },
        { userId: 1, spotId: 20, review: 'Great amenities.', stars: 5 },
        { userId: 2, spotId: 20, review: 'Enjoyed the visit.', stars: 4 },
        { userId: 3, spotId: 20, review: 'Very comfortable.', stars: 4 }
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
