'use strict';
const {
  Model,
  ValidationError
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(
        models.Spot,
        {foreignKey: 'spotId'}
      ),
      Review.belongsTo(
        models.User,
        {foreignKey: 'userId'}
      )
    }
  }
  Review.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          arg: true,
          msg: 'Review text is required'
        },
        isString(value) {
          if (typeof value !== 'string') {
            throw new ValidationError('Review must be in letters')
          }
        },
        len: {
          args: [5, 240],
          msg: 'Review length must be from 5 to 240 characters'
        }
      }
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Star rating is required'
        },
        min: {
          args: 1,
          msg: 'Stars must be an integer from 1 to 5'
        },
        max: {
          args: 5,
          msg: 'Stars must be an integer from 1 to 5'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
