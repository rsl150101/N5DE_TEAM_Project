'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // 포린키로 User에게 받아오고
            models.Order.belongsTo(models.User, { foreignKey: 'costomer_id', targetKey: 'costomer_id' });
            models.Order.belongsTo(models.User, { foreignKey: 'driver_id', targetKey: 'driver_id' });
            // 각각 리뷰테이블과 관계를 맺음
            models.Order.hasOne(models.Review, { foreignKey: 'costomer_id', targetKey: 'costomer_id' });
            models.Order.hasOne(models.Review, { foreignKey: 'driver_id', targetKey: 'driver_id' });
        }
    }
    Order.init(
        {
            costomer_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            driver_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
            nickname: {
                allowNull: false,
                unique: true,
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
                type: DataTypes.STRING,
            },
            photo: {
                allowNull: false,
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: 'Order',
            timestamps: true,
        }
    );
    return Order;
};
