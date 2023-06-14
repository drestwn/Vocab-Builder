'use strict';
const { hashPassword } = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Log, { foreignKey: "UserId" })
    }
  }
  User.init({
    nickname: {
      type: DataTypes.STRING(5),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        len: {
          args: [5, 10],
          msg: "Nickname must be more than 5 characters long"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email already exist, Plase login"
      },
      validate: {
        isEmail: true,
        notNull: {
          msg: `Email must be filled`
        },
        notEmpty: {
          msg: `Email must be filled`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Password must be filled`
        },
        notEmpty: `Password must be filled`
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(el => {
    el.password = hashPassword(el.password)
  })
  return User;
};