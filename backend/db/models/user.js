'use strict';

const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(
        models.Spot,
        { foreignKey: 'ownerId', onDelete: 'CASCADE'}
      )
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          arg: true,
          msg: 'First Name is required'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          arg: true,
          msg: 'Last Name is required'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        arg: true,
        msg: 'User with that username already exists'
      },
      validate: {
        len: [4,30],
        notNull: {
          arg: true,
          msg: 'Username is required'
        },
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.')
          }
        }
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60,60]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        arg: true,
        msg: 'User with that email already exists'
      },
      validate: {
        isEmail: true,
        len: [3,256]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    }
  });
  return User;
};
