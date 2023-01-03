"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // 오더 포린키
      models.Order.belongsTo(models.User, {
        foreignKey: "customer_id",
        targetKey: "id",
      });
      models.Order.belongsTo(models.User, {
        foreignKey: "driver_id",
        targetKey: "id",
      });
      models.Order.hasOne(models.Review, {
        foreignKey: "reviewer_id",
        sourceKey: "customer_id",
      });
      models.Order.hasOne(models.Review, {
        forignKey: "reviewee_id",
        sourceKey: "driver_id",
      });
    }
  }
  Order.init(
    {
      customer_id: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      driver_id: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      nickname: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      address: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      status: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      request: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      photo: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
