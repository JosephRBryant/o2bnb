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
        {foreignKey: 'spotId', onDelete: 'CASCADE'}
      ),
      Review.belongsTo(
        models.User,
        {foreignKey: 'userId', onDelete: 'CASCADE'}
      ),
      Review.hasMany(
        models.ReviewImage,
        {foreignKey: 'reviewId', onDelete: 'CASCADE'}
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
          args: [5, 1000],
          msg: 'Review length must be from 5 to 1000 characters'
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
