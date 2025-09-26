"use strict";
const { Model } = require("sequelize");
const { hash } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Palette, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: function (User, options) {
          User.password = hash(User.password);
        },
        beforeUpdate: function (User, options) {
          User.password = hash(User.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
