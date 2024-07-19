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
        { spotId: 1, url: "https://toginet.com/images/o2bnb/spot-image-1.webp", preview: true },
        { spotId: 1, url: "https://toginet.com/images/o2bnb/spot-image-2.webp", preview: false },
        { spotId: 1, url: "https://toginet.com/images/o2bnb/spot-image-3.webp", preview: false },
        { spotId: 1, url: "https://toginet.com/images/o2bnb/spot-image-4.webp", preview: false },
        { spotId: 1, url: "https://toginet.com/images/o2bnb/spot-image-5.webp", preview: false },
        { spotId: 2, url: "https://toginet.com/images/o2bnb/spot-image-6.webp", preview: true },
        { spotId: 2, url: "https://toginet.com/images/o2bnb/spot-image-7.webp", preview: false },
        { spotId: 2, url: "https://toginet.com/images/o2bnb/spot-image-8.webp", preview: false },
        { spotId: 2, url: "https://toginet.com/images/o2bnb/spot-image-9.webp", preview: false },
        { spotId: 2, url: "https://toginet.com/images/o2bnb/spot-image-10.webp", preview: false },
        { spotId: 3, url: "https://toginet.com/images/o2bnb/spot-image-11.webp", preview: true },
        { spotId: 3, url: "https://toginet.com/images/o2bnb/spot-image-12.webp", preview: false },
        { spotId: 3, url: "https://toginet.com/images/o2bnb/spot-image-13.webp", preview: false },
        { spotId: 3, url: "https://toginet.com/images/o2bnb/spot-image-14.webp", preview: false },
        { spotId: 3, url: "https://toginet.com/images/o2bnb/spot-image-15.webp", preview: false },
        { spotId: 4, url: "https://toginet.com/images/o2bnb/spot-image-16.webp", preview: true },
        { spotId: 4, url: "https://toginet.com/images/o2bnb/spot-image-17.webp", preview: false },
        { spotId: 4, url: "https://toginet.com/images/o2bnb/spot-image-18.webp", preview: false },
        { spotId: 4, url: "https://toginet.com/images/o2bnb/spot-image-19.webp", preview: false },
        { spotId: 4, url: "https://toginet.com/images/o2bnb/spot-image-20.webp", preview: false },
        { spotId: 5, url: "https://toginet.com/images/o2bnb/spot-image-21.webp", preview: true },
        { spotId: 5, url: "https://toginet.com/images/o2bnb/spot-image-22.webp", preview: false },
        { spotId: 5, url: "https://toginet.com/images/o2bnb/spot-image-23.webp", preview: false },
        { spotId: 5, url: "https://toginet.com/images/o2bnb/spot-image-24.webp", preview: false },
        { spotId: 5, url: "https://toginet.com/images/o2bnb/spot-image-25.webp", preview: false },
        { spotId: 6, url: "https://toginet.com/images/o2bnb/spot-image-26.webp", preview: true },
        { spotId: 6, url: "https://toginet.com/images/o2bnb/spot-image-27.webp", preview: false },
        { spotId: 6, url: "https://toginet.com/images/o2bnb/spot-image-28.webp", preview: false },
        { spotId: 6, url: "https://toginet.com/images/o2bnb/spot-image-29.webp", preview: false },
        { spotId: 6, url: "https://toginet.com/images/o2bnb/spot-image-30.webp", preview: false },
        { spotId: 7, url: "https://toginet.com/images/o2bnb/spot-image-31.webp", preview: true },
        { spotId: 7, url: "https://toginet.com/images/o2bnb/spot-image-32.webp", preview: false },
        { spotId: 7, url: "https://toginet.com/images/o2bnb/spot-image-33.webp", preview: false },
        { spotId: 7, url: "https://toginet.com/images/o2bnb/spot-image-34.webp", preview: false },
        { spotId: 7, url: "https://toginet.com/images/o2bnb/spot-image-35.webp", preview: false },
        { spotId: 8, url: "https://toginet.com/images/o2bnb/spot-image-36.webp", preview: true },
        { spotId: 8, url: "https://toginet.com/images/o2bnb/spot-image-37.webp", preview: false },
        { spotId: 8, url: "https://toginet.com/images/o2bnb/spot-image-38.webp", preview: false },
        { spotId: 8, url: "https://toginet.com/images/o2bnb/spot-image-39.webp", preview: false },
        { spotId: 8, url: "https://toginet.com/images/o2bnb/spot-image-40.webp", preview: false },
        { spotId: 9, url: "https://toginet.com/images/o2bnb/spot-image-41.webp", preview: true },
        { spotId: 9, url: "https://toginet.com/images/o2bnb/spot-image-42.webp", preview: false },
        { spotId: 9, url: "https://toginet.com/images/o2bnb/spot-image-43.webp", preview: false },
        { spotId: 9, url: "https://toginet.com/images/o2bnb/spot-image-44.webp", preview: false },
        { spotId: 9, url: "https://toginet.com/images/o2bnb/spot-image-45.webp", preview: false },
        { spotId: 10, url: "https://toginet.com/images/o2bnb/spot-image-46.webp", preview: true },
        { spotId: 10, url: "https://toginet.com/images/o2bnb/spot-image-47.webp", preview: false },
        { spotId: 10, url: "https://toginet.com/images/o2bnb/spot-image-48.webp", preview: false },
        { spotId: 10, url: "https://toginet.com/images/o2bnb/spot-image-49.webp", preview: false },
        { spotId: 10, url: "https://toginet.com/images/o2bnb/spot-image-50.webp", preview: false },
        { spotId: 11, url: "https://toginet.com/images/o2bnb/spot-image-51.webp", preview: true },
        { spotId: 11, url: "https://toginet.com/images/o2bnb/spot-image-52.webp", preview: false },
        { spotId: 11, url: "https://toginet.com/images/o2bnb/spot-image-53.webp", preview: false },
        { spotId: 11, url: "https://toginet.com/images/o2bnb/spot-image-54.webp", preview: false },
        { spotId: 11, url: "https://toginet.com/images/o2bnb/spot-image-55.webp", preview: false },
        { spotId: 12, url: "https://toginet.com/images/o2bnb/spot-image-56.webp", preview: true },
        { spotId: 12, url: "https://toginet.com/images/o2bnb/spot-image-57.webp", preview: false },
        { spotId: 12, url: "https://toginet.com/images/o2bnb/spot-image-58.webp", preview: false },
        { spotId: 12, url: "https://toginet.com/images/o2bnb/spot-image-59.webp", preview: false },
        { spotId: 12, url: "https://toginet.com/images/o2bnb/spot-image-60.webp", preview: false },
        { spotId: 13, url: "https://toginet.com/images/o2bnb/spot-image-61.webp", preview: true },
        { spotId: 13, url: "https://toginet.com/images/o2bnb/spot-image-62.webp", preview: false },
        { spotId: 13, url: "https://toginet.com/images/o2bnb/spot-image-63.webp", preview: false },
        { spotId: 13, url: "https://toginet.com/images/o2bnb/spot-image-64.webp", preview: false },
        { spotId: 13, url: "https://toginet.com/images/o2bnb/spot-image-65.webp", preview: false },
        { spotId: 14, url: "https://toginet.com/images/o2bnb/spot-image-66.webp", preview: true },
        { spotId: 14, url: "https://toginet.com/images/o2bnb/spot-image-67.webp", preview: false },
        { spotId: 14, url: "https://toginet.com/images/o2bnb/spot-image-68.webp", preview: false },
        { spotId: 14, url: "https://toginet.com/images/o2bnb/spot-image-69.webp", preview: false },
        { spotId: 14, url: "https://toginet.com/images/o2bnb/spot-image-70.webp", preview: false },
        { spotId: 15, url: "https://toginet.com/images/o2bnb/spot-image-71.webp", preview: true },
        { spotId: 15, url: "https://toginet.com/images/o2bnb/spot-image-72.webp", preview: false },
        { spotId: 15, url: "https://toginet.com/images/o2bnb/spot-image-73.webp", preview: false },
        { spotId: 15, url: "https://toginet.com/images/o2bnb/spot-image-74.webp", preview: false },
        { spotId: 15, url: "https://toginet.com/images/o2bnb/spot-image-75.webp", preview: false },
        { spotId: 16, url: "https://toginet.com/images/o2bnb/spot-image-76.webp", preview: true },
        { spotId: 16, url: "https://toginet.com/images/o2bnb/spot-image-77.webp", preview: false },
        { spotId: 16, url: "https://toginet.com/images/o2bnb/spot-image-78.webp", preview: false },
        { spotId: 16, url: "https://toginet.com/images/o2bnb/spot-image-79.webp", preview: false },
        { spotId: 16, url: "https://toginet.com/images/o2bnb/spot-image-80.webp", preview: false },
        { spotId: 17, url: "https://toginet.com/images/o2bnb/spot-image-81.webp", preview: true },
        { spotId: 17, url: "https://toginet.com/images/o2bnb/spot-image-82.webp", preview: false },
        { spotId: 17, url: "https://toginet.com/images/o2bnb/spot-image-83.webp", preview: false },
        { spotId: 17, url: "https://toginet.com/images/o2bnb/spot-image-84.webp", preview: false },
        { spotId: 17, url: "https://toginet.com/images/o2bnb/spot-image-85.webp", preview: false },
        { spotId: 18, url: "https://toginet.com/images/o2bnb/spot-image-86.webp", preview: true },
        { spotId: 18, url: "https://toginet.com/images/o2bnb/spot-image-87.webp", preview: false },
        { spotId: 18, url: "https://toginet.com/images/o2bnb/spot-image-88.webp", preview: false },
        { spotId: 18, url: "https://toginet.com/images/o2bnb/spot-image-89.webp", preview: false },
        { spotId: 18, url: "https://toginet.com/images/o2bnb/spot-image-90.webp", preview: false },
        { spotId: 19, url: "https://toginet.com/images/o2bnb/spot-image-91.webp", preview: true },
        { spotId: 19, url: "https://toginet.com/images/o2bnb/spot-image-92.webp", preview: false },
        { spotId: 19, url: "https://toginet.com/images/o2bnb/spot-image-93.webp", preview: false },
        { spotId: 19, url: "https://toginet.com/images/o2bnb/spot-image-94.webp", preview: false },
        { spotId: 19, url: "https://toginet.com/images/o2bnb/spot-image-95.webp", preview: false },
        { spotId: 20, url: "https://toginet.com/images/o2bnb/spot-image-96.webp", preview: true },
        { spotId: 20, url: "https://toginet.com/images/o2bnb/spot-image-97.webp", preview: false },
        { spotId: 20, url: "https://toginet.com/images/o2bnb/spot-image-98.webp", preview: false },
        { spotId: 20, url: "https://toginet.com/images/o2bnb/spot-image-99.webp", preview: false },
        { spotId: 20, url: "https://toginet.com/images/o2bnb/spot-image-100.webp", preview: false }
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
