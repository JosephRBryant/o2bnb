'use strict';
const {
  Model,
  ValidationError
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      Spot.belongsTo(
        models.User,
        {
          as: 'Owner',
          foreignKey: 'ownerId',
          onDelete: 'CASCADE'
        }
      ),
      Spot.hasMany(
        models.SpotImage,
        {foreignKey: 'spotId', onDelete: 'CASCADE'}
      ),
      Spot.hasMany(
        models.Review,
        {foreignKey: 'spotId', onDelete: 'CASCADE'}
      ),
      Spot.hasMany(
        models.Booking,
        {foreignKey: 'spotId', onDelete: 'CASCADE'}
      )
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          arg: true,
          msg: 'Street address is required'
        },
        isValidAddress(value) {
          if (!value) {
            throw new Error('Street address is required')
          } else if (Number(value)) {
            throw new Error('Street address must be letters')
          } else if (value.length < 3 || value.length > 30) {
            throw new Error('Street address must be between 3 and 30 characters')
          }
        },
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          arg: true,
          msg: 'City is required'
        },
        isValidCity(value) {
          if (!value) {
            throw new Error('City is required')
          } else if (Number(value)) {
            throw new Error('City must be letters')
          } else if (value.length < 3 || value.length > 30) {
            throw new Error('City must be between 3 and 30 characters')
          }
        },
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          arg: true,
          msg: 'State is required'
        },
        isValidState(value) {
          if (!value) {
            throw new Error('State is required')
          } else if (Number(value)) {
            throw new Error('State must be letters')
          } else if (value.length < 3 || value.length > 30) {
            throw new Error('Do not abbreviate')
          }
        },
      }
    },
    country: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          arg: true,
          msg: 'Country is required'
        },
        isValidCountry(value) {
          if (!value) {
            throw new Error('Country is required')
          } else if (Number(value)) {
            throw new Error('Country must be letters')
          } else if (value.length < 3 || value.length > 30) {
            throw new Error('Country must be between 3 and 30 characters')
          }
        },
      }
    },
    lat: {
      type: DataTypes.DECIMAL(7,10),
      allowNull: false,
      validate: {
        notNull: {
          arg: true,
          msg: 'Latitude is required'
        },
        isValidLat(value) {
          let num = Number(value);
          let numArr = JSON.stringify(value).split('.');
          if (!value) {
            throw new Error('Latitude is required')
          } else if (
              Number.isInteger(num) ||
              !Number(value) ||
              numArr.length !== 2 ||
              num < -90 ||
              num > 90 ||
              numArr[1].length !== 7
            ) {
            throw new Error('Latitude is not valid')
          }
        }
      }
    },
    lng: {
      type: DataTypes.DECIMAL(7,10),
      allowNull: false,
      validate: {
        notNull: {
          arg: true,
          msg: 'Longitude is required'
        },
        isValidLng(value) {
          let num = Number(value);
          let numArr = JSON.stringify(value).split('.');
          if (!value) {
            throw new Error('Latitude is required')
          } else if (
              Number.isInteger(num) ||
              !Number(value) ||
              numArr.length !== 2 ||
              num < -180 ||
              num > 180 ||
              numArr[1].length !== 7
            ) {
            throw new Error('Longitude is not valid')
          }
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          arg: true,
          msg: 'Name is required'
        },
        isValidName(value) {
          if (!value) {
            throw new Error('Title is required')
          } else if (Number(value)) {
            throw new Error('Title must be letters')
          } else if (value.length < 3 || value.length > 30) {
            throw new Error('Title must be between 3 and 30 characters')
          }
        },
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          arg: true,
          msg: 'Description is required'
        },
        isValidDescription(value) {
          if (!value) {
            throw new Error('Description is required')
          } else if (Number(value)) {
            throw new Error('Description must be letters')
          } else if (value.length < 30) {
            console.log(value.length);
            throw new Error('Description must be 30 characters or more')
          }
        },
      }
    },
    price: {
      type: DataTypes.DECIMAL(2,6),
      allowNull: false,
      validate: {
        notNull: {
          arg: true,
          msg: 'Price per night is invalid'
        },
        isValidPrice(value) {
          if (!value) {
            throw new Error('Price per night is required')
          } else if (!Number(value)) {
            throw new Error('Price is invalid')
          }
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
