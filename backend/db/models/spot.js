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
        isString(value) {
          if (typeof value !== 'string') {
            throw new ValidationError('Street address must be letters')
          }
        },
        len: [5, 50]
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
        isString(value) {
          if (typeof value !== 'string') {
            throw new Error('City must be letters')
          }
        },
        len: [3, 30]
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
        isString(value) {
          if (Number(value)) {
            throw new Error('State must be letters')
          }
        },
        isRightLength(value) {
          if (value.length < 3 || value.length > 30) {
            throw new Error('State needs between 3 and 30 characters')
          }
        }
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
        isString(value) {
          if (Number(value)) {
            throw new Error('Country must be letters')
          }
        },
        isRightLength(value) {
          if (value.length < 3 || value.length > 30) {
            throw new Error('Country needs between 3 and 30 characters')
          }
        }
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
        isValidDecimal(value) {
          let numString = JSON.stringify(value);
          let numArr = numString.split('.');
          if (numArr[0].length >= 5 || numArr[1].length !== 7) {
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
        isValidDecimal(value) {
          let numString = JSON.stringify(value);
          let numArr = numString.split('.');
          if (numArr[0].length >= 5 || numArr[1].length !== 7) {
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
        isString(value) {
          if (typeof value !== 'string') {
            throw new Error('Name must be letters')
          }
        },
        isLessThan(value) {
          if (value.length >= 50) {
            throw new Error('Name must be less than 50 characters')
          }
        }
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
        isString(value) {
          if (typeof value !== 'string') {
            throw new Error('Description must be letters')
          }
        },
        len: {
          arg: [10, 1000],
          msg: 'Description must be less than 1000 characters'
        }
      }
    },
    price: {
      type: DataTypes.DECIMAL(2,6),
      allowNull: false,
      validate: {
        notNull: {
          arg: true,
          msg: 'Price per day is required'
        },
        isValidDecimal(value) {
          if (typeof value !== 'number') {
            throw new Error('Price per day is required')
          }
          let numString = JSON.stringify(value);
          if (numString.includes('.')) {
            let numArr = numString.split('.');
            if (numArr[0].length >= 5 || numArr[1].length !== 2) {
              throw new Error('Price per day is required')
            }
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
