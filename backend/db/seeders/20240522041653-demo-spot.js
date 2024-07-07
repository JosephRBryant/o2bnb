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
            address: "455 Spencer Knolls",
            city: "New Peggy",
            state: "California",
            country: "United States",
            lat: 35.7645358,
            lng: -120.4730327,
            name: "Serenity Haven",
            description: "Elegant and modern place for a memorable stay.",
            price: 423
        },
        {
            ownerId: 2,
            address: "1242 Hudson Meadows",
            city: "West Ramiro",
            state: "Texas",
            country: "United States",
            lat: 30.5645358,
            lng: -97.4730327,
            name: "Cozy Corner Retreat",
            description: "A cozy and comfortable retreat in the city.",
            price: 278
        },
        {
            ownerId: 3,
            address: "1896 Bernier Canyon",
            city: "Lake Harmony",
            state: "Florida",
            country: "United States",
            lat: 27.2645358,
            lng: -81.4730327,
            name: "Tranquil Getaway",
            description: "Perfect spot for a relaxing getaway.",
            price: 355
        },
        {
            ownerId: 4,
            address: "777 Davis Point",
            city: "Port Oliver",
            state: "Nevada",
            country: "United States",
            lat: 39.7645358,
            lng: -119.4730327,
            name: "Vista Oasis",
            description: "Beautiful house with stunning views.",
            price: 305
        },
        {
            ownerId: 1,
            address: "1234 Park Vista",
            city: "West Melody",
            state: "Arizona",
            country: "United States",
            lat: 33.7645358,
            lng: -111.4730327,
            name: "Urban Nest",
            description: "Modern amenities and great location.",
            price: 289
        },
        {
            ownerId: 2,
            address: "6785 Hayes Hill",
            city: "North Sandy",
            state: "Colorado",
            country: "United States",
            lat: 39.5645358,
            lng: -105.4730327,
            name: "Mountain Retreat",
            description: "Spacious and comfortable home.",
            price: 360
        },
        {
            ownerId: 3,
            address: "8912 Arnold Lane",
            city: "East Laurel",
            state: "Utah",
            country: "United States",
            lat: 40.7645358,
            lng: -111.4730327,
            name: "Tranquil Haven",
            description: "A quiet and serene escape.",
            price: 297
        },
        {
            ownerId: 4,
            address: "3468 Bauer Street",
            city: "South Jordan",
            state: "Washington",
            country: "United States",
            lat: 47.7645358,
            lng: -122.4730327,
            name: "Luxury Living",
            description: "Luxury living in a prime location.",
            price: 420
        },
        {
            ownerId: 1,
            address: "9876 Peters Road",
            city: "North Frances",
            state: "New Mexico",
            country: "United States",
            lat: 35.7645358,
            lng: -106.4730327,
            name: "Comfort Cove",
            description: "Comfortable and stylish home.",
            price: 315
        },
        {
            ownerId: 2,
            address: "4569 Ford Court",
            city: "Lake Brenda",
            state: "Oregon",
            country: "United States",
            lat: 45.7645358,
            lng: -122.4730327,
            name: "Sunset Retreat",
            description: "Charming home with modern features.",
            price: 310
        },
        {
            ownerId: 3,
            address: "5631 Sherman Drive",
            city: "East Dennis",
            state: "Idaho",
            country: "United States",
            lat: 43.7645358,
            lng: -116.4730327,
            name: "Family Escape",
            description: "Perfect for a family vacation.",
            price: 299
        },
        {
            ownerId: 4,
            address: "7428 Vaughn Loop",
            city: "West Angelica",
            state: "Montana",
            country: "United States",
            lat: 46.7645358,
            lng: -112.4730327,
            name: "Peaceful Retreat",
            description: "Ideal place for a peaceful retreat.",
            price: 332
        },
        {
            ownerId: 1,
            address: "8745 Collins Avenue",
            city: "North Joe",
            state: "Nevada",
            country: "United States",
            lat: 36.7645358,
            lng: -115.4730327,
            name: "Starlight Villa",
            description: "Modern house with great amenities.",
            price: 400
        },
        {
            ownerId: 2,
            address: "2345 Kelly Drive",
            city: "Port Dawn",
            state: "Texas",
            country: "United States",
            lat: 31.7645358,
            lng: -97.4730327,
            name: "Peak View Cottage",
            description: "Comfortable and cozy home.",
            price: 275
        },
        {
            ownerId: 3,
            address: "1907 Jenkins Road",
            city: "Lake Claire",
            state: "Wyoming",
            country: "United States",
            lat: 44.7645358,
            lng: -107.4730327,
            name: "Tranquility Base",
            description: "Ideal for a relaxing vacation.",
            price: 345
        },
        {
            ownerId: 4,
            address: "6784 Schultz Way",
            city: "New Lucas",
            state: "Oklahoma",
            country: "United States",
            lat: 35.7645358,
            lng: -97.4730327,
            name: "Panoramic View",
            description: "Beautiful house with a great view.",
            price: 330
        },
        {
            ownerId: 1,
            address: "4590 Spencer Street",
            city: "Port Andy",
            state: "Utah",
            country: "United States",
            lat: 40.7645358,
            lng: -112.4730327,
            name: "Diamond Retreat",
            description: "Lovely home with modern amenities.",
            price: 298
        },
        {
            ownerId: 2,
            address: "2190 Prece Avenue",
            city: "West Dana",
            state: "Colorado",
            country: "United States",
            lat: 39.7645358,
            lng: -104.4730327,
            name: "Summit Serenity",
            description: "Cozy and comfortable place.",
            price: 280
        },
        {
            ownerId: 3,
            address: "3098 Jenkins Street",
            city: "New Sam",
            state: "Oregon",
            country: "United States",
            lat: 44.7645358,
            lng: -123.4730327,
            name: "Skyline Haven",
            description: "Modern house with all amenities.",
            price: 350
        },
        {
            ownerId: 4,
            address: "5874 Vaughn Loop",
            city: "Lake Kenny",
            state: "Idaho",
            country: "United States",
            lat: 43.7645358,
            lng: -115.4730327,
            name: "Pioneer Paradise",
            description: "Spacious home with great features.",
            price: 400
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
