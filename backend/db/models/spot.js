'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
            throw new Error('Street address must be letters')
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
          if (typeof value !== 'string') {
            throw new Error('State must be letters')
          }
        },
        len: [3, 20]
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          arg: true,
          msg: 'Country is required'
        },
        isString(value) {
          if (typeof value !== 'string') {
            throw new Error('Country must be letters')
          }
        },
        len: [3, 20]
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
        isDecimal: {
          arg: true,
          msg: 'Latitude is not valid'
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
        isDecimal: {
          arg: true,
          msg: 'Longitude is not valid'
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
        len: {
          arg: [3, 49],
          msg: 'Name must be less than 50 characters'
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
          arg: [10, 240],
          msg: 'Description must be less than 240 characters'
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
        isDecimal: {
          arg: true,
          msg: 'Price is not valid'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
