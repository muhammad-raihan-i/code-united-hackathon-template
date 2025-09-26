"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Palette extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Palette.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Palette.init(
    {
      palette: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Palette",
    }
  );
  return Palette;
};
