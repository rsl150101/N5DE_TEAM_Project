"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // 유저 포린키
      models.User.hasOne(models.Order, {
        foreignKey: "costomer_id",
        sourceKey: "id",
      });
      models.User.hasOne(models.Order, {
        foreignKey: "driver_id",
        sourceKey: "id",
      });
    }
  }
  User.init(
    {
      user_id: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      point: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      user_type: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
