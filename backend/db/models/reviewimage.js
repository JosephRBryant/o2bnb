'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ReviewImage.belongsTo(
        models.Review,
        {foreignKey: 'reviewId', onDelete: 'CASCADE'}
      )
    }
  }
  ReviewImage.init({
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isUrl: {
          args: true,
          msg: 'Enter a valid URL'
        }
      }

    }
  }, {
    sequelize,
    modelName: 'ReviewImage',
  });
  return ReviewImage;
};
