'use strict';
const httpStatus = require('http-status');
const {
  Model
} = require('sequelize');
const ApiError = require('../utils/ApiError');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Warehouse, {
        foreignKey: 'warehouseId'
      })
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      defaultValue: "Imam"
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        customValidator(value) {
          if (value.length <= 8)
            throw new ApiError(httpStatus.BAD_REQUEST, "password gak boleh kurang dari 8 karakter")
        }
      }
    },
    warehouseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  },
    User.findUser = async function (value) {
      console.log("ini instance method")
      const user = await User.findOne(
        {
          where: {
            email: value
          }
        }
      )
      return user
    },
    // contoh instance method
    User.hello = function () {
      console.log("hello FSW4")
    });
  return User;
};
