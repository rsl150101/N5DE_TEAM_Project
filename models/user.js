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
            //
        }
    }
    User.init(
        {
            user_id: {
                type: DataTypes.STRING,
            },
            password: {
                type: DataTypes.STRING,
            },
            nickname: {
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
};
