"use strict";
const { Model } = require("sequelize");
const bcrypt = require("../helpers/bcrypt");
const { hash } = bcrypt;
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Palette, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: function (user, options) {
          user.password = hash(user.password);
        },
        beforeUpdate: function (user, options) {
          user.password = hash(user.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
