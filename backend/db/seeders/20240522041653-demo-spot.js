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
            description: "Serenity Haven is an elegant and modern retreat designed for a memorable stay. Nestled in the heart of New Peggy, this luxurious BnB offers a blend of contemporary amenities and classic charm. Guests can enjoy spacious living areas, a fully equipped kitchen, and serene outdoor spaces perfect for relaxation. Whether you're here for a romantic getaway or a family vacation, Serenity Haven promises an unforgettable experience.",
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
            description: "Cozy Corner Retreat is a charming and comfortable escape located in the bustling city of West Ramiro. This delightful BnB is perfect for travelers seeking a home away from home with all the conveniences. Featuring cozy bedrooms, a welcoming living area, and a lovely garden, guests can unwind and relax in style. Enjoy nearby attractions and the vibrant local culture, making your stay both enjoyable and memorable.",
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
            description: "Tranquil Getaway offers the perfect spot for a relaxing vacation in Lake Harmony. This serene BnB is surrounded by natural beauty, providing a peaceful environment for guests to unwind. The well-appointed rooms, cozy common areas, and beautiful outdoor spaces make it an ideal choice for those looking to escape the hustle and bustle of everyday life. Explore the scenic surroundings and enjoy a truly tranquil experience.",
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
            description: "Vista Oasis is a stunning house with breathtaking views, located in the picturesque town of Port Oliver. This luxurious BnB features elegant interiors, spacious rooms, and modern amenities to ensure a comfortable stay. Guests can enjoy panoramic vistas from the large windows and private balconies, making every moment here special. Whether you're seeking relaxation or adventure, Vista Oasis offers an unforgettable experience.",
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
            description: "Urban Nest is a modern BnB with top-notch amenities and a great location in West Melody. This stylish property is perfect for travelers looking to explore the city while enjoying the comforts of home. Featuring chic decor, comfortable furnishings, and a range of amenities, Urban Nest provides an excellent base for your stay. Discover local attractions, dine at nearby restaurants, and experience the vibrant culture of West Melody.",
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
            description: "Mountain Retreat is a spacious and comfortable home located in the scenic area of North Sandy. This inviting BnB offers a perfect blend of comfort and convenience for your stay. Guests can relax in the well-furnished rooms, enjoy the cozy living spaces, and take in the beautiful mountain views. Ideal for nature lovers and adventurers, Mountain Retreat is the perfect place to unwind and explore the great outdoors.",
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
            description: "Tranquil Haven is a quiet and serene escape in East Laurel. This charming BnB offers a peaceful environment for guests looking to relax and recharge. With comfortable accommodations, inviting common areas, and lovely outdoor spaces, Tranquil Haven is the perfect retreat. Enjoy the tranquil surroundings, explore the local attractions, and experience the calming atmosphere of this beautiful property.",
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
            description: "Luxury Living offers a prime location in South Jordan, providing guests with a truly luxurious experience. This upscale BnB features elegant decor, spacious rooms, and top-of-the-line amenities. Guests can enjoy the beautifully designed interiors, relax in the comfortable living areas, and take advantage of the excellent location to explore the city. Whether for business or pleasure, Luxury Living ensures a sophisticated and enjoyable stay.",
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
            description: "Comfort Cove is a stylish and comfortable home located in North Frances. This modern BnB offers guests a cozy retreat with all the amenities needed for a pleasant stay. The property features well-furnished rooms, a fully equipped kitchen, and inviting living spaces. Guests can enjoy the serene atmosphere and explore the local area, making Comfort Cove an ideal choice for both relaxation and adventure.",
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
            description: "Sunset Retreat is a charming home with modern features, located in the beautiful area of Lake Brenda. This delightful BnB offers a perfect blend of comfort and style, making it an ideal choice for travelers. Guests can relax in the cozy rooms, enjoy the well-appointed living spaces, and take in the stunning views. Whether you're here for a weekend getaway or an extended stay, Sunset Retreat promises a memorable experience.",
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
            description: "Family Escape is the perfect destination for a family vacation in East Dennis. This spacious BnB offers comfortable accommodations and plenty of amenities to ensure a fun and relaxing stay. The property features large rooms, a fully equipped kitchen, and inviting living spaces where families can gather and create lasting memories. Explore the local attractions and enjoy quality time together at Family Escape.",
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
            description: "Peaceful Retreat is an ideal place for a serene and relaxing vacation in West Angelica. This charming BnB offers a tranquil environment with comfortable accommodations and beautiful surroundings. Guests can unwind in the cozy rooms, enjoy the inviting common areas, and take in the picturesque views. Whether you're looking to escape the hustle and bustle or explore the local area, Peaceful Retreat is the perfect choice.",
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
            description: "Starlight Villa is a modern house with great amenities, located in the vibrant area of North Joe. This luxurious BnB offers guests a comfortable and stylish stay, with well-furnished rooms and excellent facilities. Enjoy the spacious living areas, relax in the cozy bedrooms, and take advantage of the prime location to explore the city. Starlight Villa promises a memorable and enjoyable experience for all guests.",
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
            description: "Peak View Cottage is a comfortable and cozy home located in the charming town of Port Dawn. This delightful BnB offers a welcoming atmosphere with all the amenities needed for a pleasant stay. Guests can enjoy the cozy rooms, inviting living spaces, and beautiful views from the property. Whether you're here for a short getaway or a longer stay, Peak View Cottage provides a relaxing and enjoyable experience.",
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
            description: "Tranquility Base is an ideal spot for a relaxing vacation in Lake Claire. This serene BnB offers comfortable accommodations and a peaceful environment for guests to unwind. The property features well-furnished rooms, inviting living spaces, and beautiful outdoor areas. Whether you're looking to explore the local attractions or simply relax, Tranquility Base provides a perfect retreat for a memorable stay.",
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
            description: "Panoramic View is a beautiful house with a great view, located in the scenic area of New Lucas. This luxurious BnB offers guests a comfortable and stylish stay with all the amenities needed for a relaxing vacation. Enjoy the spacious rooms, modern decor, and stunning views from the property. Whether you're here for a weekend escape or an extended stay, Panoramic View promises a memorable and enjoyable experience.",
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
            description: "Diamond Retreat is a lovely home with modern amenities, located in the peaceful area of Port Andy. This charming BnB offers a comfortable and stylish stay for guests looking to unwind and relax. The property features well-appointed rooms, inviting living spaces, and beautiful outdoor areas. Explore the local attractions or simply enjoy the serene surroundings, making your stay at Diamond Retreat both enjoyable and memorable.",
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
            description: "Summit Serenity offers a cozy and comfortable stay in the beautiful area of West Dana. This delightful BnB features well-furnished rooms, inviting living spaces, and all the amenities needed for a relaxing stay. Guests can enjoy the serene surroundings, explore the local attractions, and experience the warm hospitality. Whether you're here for a short trip or an extended stay, Summit Serenity provides a perfect retreat.",
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
            description: "Skyline Haven is a modern house with all the amenities needed for a comfortable stay in New Sam. This stylish BnB offers spacious rooms, chic decor, and excellent facilities. Guests can relax in the inviting living spaces, enjoy the well-furnished rooms, and explore the vibrant local area. Whether for business or leisure, Skyline Haven provides a perfect base for your stay, ensuring a memorable and enjoyable experience.",
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
            description: "Pioneer Paradise is a spacious home with great features, located in the beautiful area of Lake Kenny. This luxurious BnB offers guests a comfortable and stylish stay with all the amenities needed for a relaxing vacation. Enjoy the well-appointed rooms, inviting living spaces, and stunning views from the property. Whether you're here for a weekend escape or an extended stay, Pioneer Paradise promises a memorable and enjoyable experience.",
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
