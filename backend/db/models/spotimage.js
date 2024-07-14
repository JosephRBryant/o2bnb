'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SpotImage.belongsTo(
        models.Spot,
        {foreignKey: 'spotId', onDelete: 'CASCADE'}
      )
    }
  }
  SpotImage.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    url: {
      type: DataTypes.STRING,
      unique: true
    },
    preview: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        isPreview(value) {
          if (value && !this.url.length) {
            throw new Error('Preview image is required')
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'SpotImage',
  });
  return SpotImage;
};
