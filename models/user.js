'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // foreignKey 설정
            models.User.hasOne(models.Order, { foreignKey: 'user_id', sourceKey: 'id' });
        }
    }
    User.init(
        {
            user_id: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            nickname: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING,
            },
            point: {
                type: DataTypes.BIGINT,
            },
            user_type: {
                type: DataTypes.BIGINT,
            },
        },
        {
            sequelize,
            modelName: 'User',
        }
    );
    return User;
    timestamps: true;
};
