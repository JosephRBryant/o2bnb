'use strict';
const { SpotImage } = require('../models');
let options = {};
options.tableName = "Spot Images"
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await SpotImage.bulkCreate([
        { spotId: 1, url: "../../../dist/assets/spotImages/spot-image01.jpeg", preview: true },
        { spotId: 1, url: "../../../dist/assets/spotImages/spot-image02.webp", preview: false },
        { spotId: 1, url: "../../../dist/assets/spotImages/spot-image03.webp", preview: false },
        { spotId: 1, url: "../../../dist/assets/spotImages/spot-image04.webp", preview: false },
        { spotId: 1, url: "../../../dist/assets/spotImages/spot-image05.webp", preview: false },
        { spotId: 2, url: "../../../dist/assets/spotImages/spot-image06.webp", preview: true },
        { spotId: 2, url: "../../../dist/assets/spotImages/spot-image07.webp", preview: false },
        { spotId: 2, url: "../../../dist/assets/spotImages/spot-image08.webp", preview: false },
        { spotId: 2, url: "../../../dist/assets/spotImages/spot-image09.webp", preview: false },
        { spotId: 2, url: "../../../dist/assets/spotImages/spot-image10.webp", preview: false },
        { spotId: 3, url: "../../../dist/assets/spotImages/spot-image11.webp", preview: true },
        { spotId: 3, url: "../../../dist/assets/spotImages/spot-image12.webp", preview: false },
        { spotId: 3, url: "../../../dist/assets/spotImages/spot-image13.webp", preview: false },
        { spotId: 3, url: "../../../dist/assets/spotImages/spot-image14.webp", preview: false },
        { spotId: 3, url: "../../../dist/assets/spotImages/spot-image15.webp", preview: false },
        { spotId: 4, url: "../../../dist/assets/spotImages/spot-image16.webp", preview: true },
        { spotId: 4, url: "../../../dist/assets/spotImages/spot-image17.webp", preview: false },
        { spotId: 4, url: "../../../dist/assets/spotImages/spot-image18.webp", preview: false },
        { spotId: 4, url: "../../../dist/assets/spotImages/spot-image19.webp", preview: false },
        { spotId: 4, url: "../../../dist/assets/spotImages/spot-image20.webp", preview: false },
        { spotId: 5, url: "../../../dist/assets/spotImages/spot-image21.webp", preview: true },
        { spotId: 5, url: "../../../dist/assets/spotImages/spot-image22.webp", preview: false },
        { spotId: 5, url: "../../../dist/assets/spotImages/spot-image23.webp", preview: false },
        { spotId: 5, url: "../../../dist/assets/spotImages/spot-image24.webp", preview: false },
        { spotId: 5, url: "../../../dist/assets/spotImages/spot-image25.webp", preview: false },
        { spotId: 6, url: "../../../dist/assets/spotImages/spot-image26.webp", preview: true },
        { spotId: 6, url: "../../../dist/assets/spotImages/spot-image27.webp", preview: false },
        { spotId: 6, url: "../../../dist/assets/spotImages/spot-image28.webp", preview: false },
        { spotId: 6, url: "../../../dist/assets/spotImages/spot-image29.webp", preview: false },
        { spotId: 6, url: "../../../dist/assets/spotImages/spot-image30.webp", preview: false },
        { spotId: 7, url: "../../../dist/assets/spotImages/spot-image31.webp", preview: true },
        { spotId: 7, url: "../../../dist/assets/spotImages/spot-image32.webp", preview: false },
        { spotId: 7, url: "../../../dist/assets/spotImages/spot-image33.webp", preview: false },
        { spotId: 7, url: "../../../dist/assets/spotImages/spot-image34.webp", preview: false },
        { spotId: 7, url: "../../../dist/assets/spotImages/spot-image35.webp", preview: false },
        { spotId: 8, url: "../../../dist/assets/spotImages/spot-image36.webp", preview: true },
        { spotId: 8, url: "../../../dist/assets/spotImages/spot-image37.webp", preview: false },
        { spotId: 8, url: "../../../dist/assets/spotImages/spot-image38.webp", preview: false },
        { spotId: 8, url: "../../../dist/assets/spotImages/spot-image39.webp", preview: false },
        { spotId: 8, url: "../../../dist/assets/spotImages/spot-image40.webp", preview: false },
        { spotId: 9, url: "../../../dist/assets/spotImages/spot-image41.webp", preview: true },
        { spotId: 9, url: "../../../dist/assets/spotImages/spot-image42.webp", preview: false },
        { spotId: 9, url: "../../../dist/assets/spotImages/spot-image43.webp", preview: false },
        { spotId: 9, url: "../../../dist/assets/spotImages/spot-image44.webp", preview: false },
        { spotId: 9, url: "../../../dist/assets/spotImages/spot-image45.webp", preview: false },
        { spotId: 10, url: "../../../dist/assets/spotImages/spot-image46.webp", preview: true },
        { spotId: 10, url: "../../../dist/assets/spotImages/spot-image47.webp", preview: false },
        { spotId: 10, url: "../../../dist/assets/spotImages/spot-image48.webp", preview: false },
        { spotId: 10, url: "../../../dist/assets/spotImages/spot-image49.webp", preview: false },
        { spotId: 10, url: "../../../dist/assets/spotImages/spot-image50.webp", preview: false },
        { spotId: 11, url: "../../../dist/assets/spotImages/spot-image51.webp", preview: true },
        { spotId: 11, url: "../../../dist/assets/spotImages/spot-image52.webp", preview: false },
        { spotId: 11, url: "../../../dist/assets/spotImages/spot-image53.webp", preview: false },
        { spotId: 11, url: "../../../dist/assets/spotImages/spot-image54.webp", preview: false },
        { spotId: 11, url: "../../../dist/assets/spotImages/spot-image55.webp", preview: false },
        { spotId: 12, url: "../../../dist/assets/spotImages/spot-image56.webp", preview: true },
        { spotId: 12, url: "../../../dist/assets/spotImages/spot-image57.webp", preview: false },
        { spotId: 12, url: "../../../dist/assets/spotImages/spot-image58.webp", preview: false },
        { spotId: 12, url: "../../../dist/assets/spotImages/spot-image59.webp", preview: false },
        { spotId: 12, url: "../../../dist/assets/spotImages/spot-image60.webp", preview: false },
        { spotId: 13, url: "../../../dist/assets/spotImages/spot-image61.webp", preview: true },
        { spotId: 13, url: "../../../dist/assets/spotImages/spot-image62.webp", preview: false },
        { spotId: 13, url: "../../../dist/assets/spotImages/spot-image63.webp", preview: false },
        { spotId: 13, url: "../../../dist/assets/spotImages/spot-image64.webp", preview: false },
        { spotId: 13, url: "../../../dist/assets/spotImages/spot-image65.webp", preview: false },
        { spotId: 14, url: "../../../dist/assets/spotImages/spot-image66.webp", preview: true },
        { spotId: 14, url: "../../../dist/assets/spotImages/spot-image67.webp", preview: false },
        { spotId: 14, url: "../../../dist/assets/spotImages/spot-image68.webp", preview: false },
        { spotId: 14, url: "../../../dist/assets/spotImages/spot-image69.webp", preview: false },
        { spotId: 14, url: "../../../dist/assets/spotImages/spot-image70.webp", preview: false },
        { spotId: 15, url: "../../../dist/assets/spotImages/spot-image71.webp", preview: true },
        { spotId: 15, url: "../../../dist/assets/spotImages/spot-image72.webp", preview: false },
        { spotId: 15, url: "../../../dist/assets/spotImages/spot-image73.webp", preview: false },
        { spotId: 15, url: "../../../dist/assets/spotImages/spot-image74.webp", preview: false },
        { spotId: 15, url: "../../../dist/assets/spotImages/spot-image75.webp", preview: false },
        { spotId: 16, url: "../../../dist/assets/spotImages/spot-image76.webp", preview: true },
        { spotId: 16, url: "../../../dist/assets/spotImages/spot-image77.webp", preview: false },
        { spotId: 16, url: "../../../dist/assets/spotImages/spot-image78.webp", preview: false },
        { spotId: 16, url: "../../../dist/assets/spotImages/spot-image79.webp", preview: false },
        { spotId: 16, url: "../../../dist/assets/spotImages/spot-image80.webp", preview: false },
        { spotId: 17, url: "../../../dist/assets/spotImages/spot-image81.webp", preview: true },
        { spotId: 17, url: "../../../dist/assets/spotImages/spot-image82.webp", preview: false },
        { spotId: 17, url: "../../../dist/assets/spotImages/spot-image83.webp", preview: false },
        { spotId: 17, url: "../../../dist/assets/spotImages/spot-image84.webp", preview: false },
        { spotId: 17, url: "../../../dist/assets/spotImages/spot-image85.webp", preview: false },
        { spotId: 18, url: "../../../dist/assets/spotImages/spot-image86.webp", preview: true },
        { spotId: 18, url: "../../../dist/assets/spotImages/spot-image87.webp", preview: false },
        { spotId: 18, url: "../../../dist/assets/spotImages/spot-image88.webp", preview: false },
        { spotId: 18, url: "../../../dist/assets/spotImages/spot-image89.webp", preview: false },
        { spotId: 18, url: "../../../dist/assets/spotImages/spot-image90.webp", preview: false },
        { spotId: 19, url: "../../../dist/assets/spotImages/spot-image91.webp", preview: true },
        { spotId: 19, url: "../../../dist/assets/spotImages/spot-image92.webp", preview: false },
        { spotId: 19, url: "../../../dist/assets/spotImages/spot-image93.webp", preview: false },
        { spotId: 19, url: "../../../dist/assets/spotImages/spot-image94.webp", preview: false },
        { spotId: 19, url: "../../../dist/assets/spotImages/spot-image95.webp", preview: false },
        { spotId: 20, url: "../../../dist/assets/spotImages/spot-image96.webp", preview: true },
        { spotId: 20, url: "../../../dist/assets/spotImages/spot-image97.webp", preview: false },
        { spotId: 20, url: "../../../dist/assets/spotImages/spot-image98.webp", preview: false },
        { spotId: 20, url: "../../../dist/assets/spotImages/spot-image99.webp", preview: false },
        { spotId: 20, url: "../../../dist/assets/spotImages/spot-image100.webp", preview: false }
      ], { validate: true })
    } catch(error) {
      console.error('Error during seeding of spot images');
      throw error;
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spot Images';
    let spotImages = await SpotImage.findAll();

    return queryInterface.bulkDelete(options, {
      where: { ...spotImages }
    }, {})
  }
};
