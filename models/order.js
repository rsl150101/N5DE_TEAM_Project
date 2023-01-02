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
            models.Order.belongsTo(models.User, { foreignKey: 'user_id', sourceKey: 'id' });
            models.Order.hasOne(models.Review, { foreignKey: '' });
            models.Order.hasOne(models.Review, { foreignKey: 'costomer_id', sourceKey: 'id' });
        }
    }
    Order.init(
        {
            user_id: DataTypes.STRING,
            nickname: DataTypes.STRING,
            address: DataTypes.STRING,
            status: DataTypes.BIGINT,
            request: DataTypes.STRING,
            photo: DataTypes.STRING,
            asign_table: DataTypes.BIGINT,
        },
        {
            sequelize,
            modelName: 'Order',
        }
    );
    return Order;
};
