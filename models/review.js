'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Review.init(
        {
            user_id: DataTypes.STRING,
            content: DataTypes.STRING,
            nickname: DataTypes.STRING,
            star: DataTypes.BIGINT,
        },
        {
            sequelize,
            modelName: 'Review',
        }
    );
    return Review;
};
