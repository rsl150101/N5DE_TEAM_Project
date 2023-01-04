"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // 리뷰 포린키
      models.Review.belongsTo(models.Order, {
        forignKey: "reviewer_id",
        targetKey: "customer_id",
      });
      models.Review.belongsTo(models.Order, {
        forignKey: "reviewee_id",
        targetKey: "driver_id",
      });
    }
  }
  Review.init(
    {
      content: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      nickname: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      star: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      reviewer_id: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      reviewee_id: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
