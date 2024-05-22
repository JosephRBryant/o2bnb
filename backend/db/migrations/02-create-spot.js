'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      city: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      state: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      country: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      lat: {
        type: Sequelize.DECIMAL(7,10),
        allowNull: false
      },
      lng: {
        type: Sequelize.DECIMAL(7,10),
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(49),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(240),
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL(2,6),
        allowNull: false
      },
      avgRating: {
        type: Sequelize.DECIMAL(1,2)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Spots');
  }
};
