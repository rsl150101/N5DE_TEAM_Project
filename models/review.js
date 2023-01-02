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
            // 고객 id를 reviewer, 드라이버를 reviewee로 나눔
            models.review.belongsTo(models.Order, { foreignKey: 'reviewer_id', targetKey: 'costomer_id' });
            models.review.belongsTo(models.Order, { foreignKey: 'reviewee_id', targetKey: 'driver_id' });
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
                type: DataTypes.BIGINT,
            },
            reviewee_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
        },
        {
            sequelize,
            modelName: 'Review',
            timestamps: true,
        }
    );
    return Review;
};
