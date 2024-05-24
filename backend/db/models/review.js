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
          msg: 'Review is required'
        },
        isString(value) {
          if (typeof value !== 'string') {
            throw new ValidationError('Review must be in letters')
          }
        },
        len: [5, 240]
      }
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          arg: true,
          msg: 'Star rating is required'
        },
        min: 1,
        max: 5
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
