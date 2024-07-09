'use strict';
const { ReviewImage } = require('../models');
let options = {};
options.tableName = "Review Images"
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await ReviewImage.bulkCreate([
        { reviewId: 1, url: "../../../frontend/dist/assets/reviewImages/spot-image02.jpeg" },
        { reviewId: 1, url: "../../../frontend/dist/assets/reviewImages/spot-image03.jpeg" },
        { reviewId: 1, url: "../../../frontend/dist/assets/reviewImages/spot-image04.jpeg" },
        { reviewId: 2, url: "../../../frontend/dist/assets/reviewImages/spot-image07.jpeg" },
        { reviewId: 2, url: "../../../frontend/dist/assets/reviewImages/spot-image08.jpeg" },
        { reviewId: 3, url: "../../../frontend/dist/assets/reviewImages/spot-image12.jpeg" },
        { reviewId: 3, url: "../../../frontend/dist/assets/reviewImages/spot-image13.jpeg" },
        { reviewId: 4, url: "../../../frontend/dist/assets/reviewImages/spot-image17.jpeg" },
        { reviewId: 4, url: "../../../frontend/dist/assets/reviewImages/spot-image18.jpeg" },
        { reviewId: 4, url: "../../../frontend/dist/assets/reviewImages/spot-image19.jpeg" },
        { reviewId: 5, url: "../../../frontend/dist/assets/reviewImages/spot-image22.jpeg" },
        { reviewId: 5, url: "../../../frontend/dist/assets/reviewImages/spot-image23.jpeg" },
        { reviewId: 6, url: "../../../frontend/dist/assets/reviewImages/spot-image27.jpeg" },
        { reviewId: 6, url: "../../../frontend/dist/assets/reviewImages/spot-image28.jpeg" },
        { reviewId: 7, url: "../../../frontend/dist/assets/reviewImages/spot-image32.jpeg" },
        { reviewId: 7, url: "../../../frontend/dist/assets/reviewImages/spot-image33.jpeg" },
        { reviewId: 8, url: "../../../frontend/dist/assets/reviewImages/spot-image37.jpeg" },
        { reviewId: 8, url: "../../../frontend/dist/assets/reviewImages/spot-image38.jpeg" },
        { reviewId: 9, url: "../../../frontend/dist/assets/reviewImages/spot-image42.jpeg" },
        { reviewId: 9, url: "../../../frontend/dist/assets/reviewImages/spot-image43.jpeg" },
        { reviewId: 10, url: "../../../frontend/dist/assets/reviewImages/spot-image47.jpeg" },
        { reviewId: 10, url: "../../../frontend/dist/assets/reviewImages/spot-image48.jpeg" },
        { reviewId: 11, url: "../../../frontend/dist/assets/reviewImages/spot-image52.jpeg" },
        { reviewId: 11, url: "../../../frontend/dist/assets/reviewImages/spot-image53.jpeg" },
        { reviewId: 12, url: "../../../frontend/dist/assets/reviewImages/spot-image57.jpeg" },
        { reviewId: 12, url: "../../../frontend/dist/assets/reviewImages/spot-image58.jpeg" },
        { reviewId: 13, url: "../../../frontend/dist/assets/reviewImages/spot-image62.jpeg" },
        { reviewId: 13, url: "../../../frontend/dist/assets/reviewImages/spot-image63.jpeg" },
        { reviewId: 14, url: "../../../frontend/dist/assets/reviewImages/spot-image67.jpeg" },
        { reviewId: 14, url: "../../../frontend/dist/assets/reviewImages/spot-image68.jpeg" },
        { reviewId: 15, url: "../../../frontend/dist/assets/reviewImages/spot-image72.jpeg" },
        { reviewId: 15, url: "../../../frontend/dist/assets/reviewImages/spot-image73.jpeg" },
        { reviewId: 16, url: "../../../frontend/dist/assets/reviewImages/spot-image77.jpeg" },
        { reviewId: 16, url: "../../../frontend/dist/assets/reviewImages/spot-image78.jpeg" },
        { reviewId: 17, url: "../../../frontend/dist/assets/reviewImages/spot-image82.jpeg" },
        { reviewId: 17, url: "../../../frontend/dist/assets/reviewImages/spot-image83.jpeg" },
        { reviewId: 18, url: "../../../frontend/dist/assets/reviewImages/spot-image87.jpeg" },
        { reviewId: 18, url: "../../../frontend/dist/assets/reviewImages/spot-image88.jpeg" },
        { reviewId: 19, url: "../../../frontend/dist/assets/reviewImages/spot-image92.jpeg" },
        { reviewId: 19, url: "../../../frontend/dist/assets/reviewImages/spot-image93.jpeg" },
        { reviewId: 20, url: "../../../frontend/dist/assets/reviewImages/spot-image97.jpeg" },
        { reviewId: 20, url: "../../../frontend/dist/assets/reviewImages/spot-image98.jpeg" },
        { reviewId: 22, url: "../../../frontend/dist/assets/reviewImages/spot-image09.jpeg" },
        { reviewId: 23, url: "../../../frontend/dist/assets/reviewImages/spot-image14.jpeg" },
        { reviewId: 24, url: "../../../frontend/dist/assets/reviewImages/spot-image20.jpeg" },
        { reviewId: 25, url: "../../../frontend/dist/assets/reviewImages/spot-image25.jpeg" },
        { reviewId: 26, url: "../../../frontend/dist/assets/reviewImages/spot-image30.jpeg" },
        { reviewId: 27, url: "../../../frontend/dist/assets/reviewImages/spot-image35.jpeg" },
        { reviewId: 28, url: "../../../frontend/dist/assets/reviewImages/spot-image40.jpeg" },
        { reviewId: 29, url: "../../../frontend/dist/assets/reviewImages/spot-image45.jpeg" },
        { reviewId: 30, url: "../../../frontend/dist/assets/reviewImages/spot-image50.jpeg" },
        { reviewId: 31, url: "../../../frontend/dist/assets/reviewImages/spot-image55.jpeg" },
        { reviewId: 32, url: "../../../frontend/dist/assets/reviewImages/spot-image60.jpeg" },
        { reviewId: 33, url: "../../../frontend/dist/assets/reviewImages/spot-image65.jpeg" },
        { reviewId: 34, url: "../../../frontend/dist/assets/reviewImages/spot-image70.jpeg" },
        { reviewId: 35, url: "../../../frontend/dist/assets/reviewImages/spot-image75.jpeg" },
        { reviewId: 36, url: "../../../frontend/dist/assets/reviewImages/spot-image80.jpeg" },
        { reviewId: 37, url: "../../../frontend/dist/assets/reviewImages/spot-image85.jpeg" },
        { reviewId: 38, url: "../../../frontend/dist/assets/reviewImages/spot-image90.jpeg" },
        { reviewId: 39, url: "../../../frontend/dist/assets/reviewImages/spot-image95.jpeg" },
        { reviewId: 40, url: "../../../frontend/dist/assets/reviewImages/spot-image100.jpeg" },
        { reviewId: 41, url: "../../../frontend/dist/assets/reviewImages/spot-image05.jpeg" },
        { reviewId: 42, url: "../../../frontend/dist/assets/reviewImages/spot-image10.jpeg" },
        { reviewId: 43, url: "../../../frontend/dist/assets/reviewImages/spot-image15.jpeg" },
        { reviewId: 45, url: "../../../frontend/dist/assets/reviewImages/spot-image24.jpeg" },
        { reviewId: 46, url: "../../../frontend/dist/assets/reviewImages/spot-image29.jpeg" },
        { reviewId: 47, url: "../../../frontend/dist/assets/reviewImages/spot-image34.jpeg" },
        { reviewId: 48, url: "../../../frontend/dist/assets/reviewImages/spot-image39.jpeg" },
        { reviewId: 49, url: "../../../frontend/dist/assets/reviewImages/spot-image44.jpeg" },
        { reviewId: 50, url: "../../../frontend/dist/assets/reviewImages/spot-image49.jpeg" },
        { reviewId: 51, url: "../../../frontend/dist/assets/reviewImages/spot-image54.jpeg" },
        { reviewId: 52, url: "../../../frontend/dist/assets/reviewImages/spot-image59.jpeg" },
        { reviewId: 53, url: "../../../frontend/dist/assets/reviewImages/spot-image64.jpeg" },
        { reviewId: 54, url: "../../../frontend/dist/assets/reviewImages/spot-image69.jpeg" },
        { reviewId: 55, url: "../../../frontend/dist/assets/reviewImages/spot-image74.jpeg" },
        { reviewId: 56, url: "../../../frontend/dist/assets/reviewImages/spot-image79.jpeg" },
        { reviewId: 57, url: "../../../frontend/dist/assets/reviewImages/spot-image84.jpeg" },
        { reviewId: 58, url: "../../../frontend/dist/assets/reviewImages/spot-image89.jpeg" },
        { reviewId: 59, url: "../../../frontend/dist/assets/reviewImages/spot-image94.jpeg" },
        { reviewId: 59, url: "../../../frontend/dist/assets/reviewImages/spot-image99.jpeg" }
      ], { validate: true })
    } catch(error) {
      console.error('Error during seeding of review images', error);
      throw error;
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Review Images';
    let reviewImages = await ReviewImage.findAll();

    return queryInterface.bulkDelete(options, {
      where: { ...reviewImages }
    }, {})
  }
};
