const { Order, User } = require('../models');

class UsersRepository {
    ordersResponse = async () => {
        // ORM인 Sequelize에서 Order 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
        const ordersResponse = await Order.findAll();

        return ordersResponse;
    };

    newOrder = async (user_id, status, driver_id, nickname, address, photo, request) => {
        // ORM인 Sequelize에서 Order 모델의 create 메소드를 사용해 데이터를 요청합니다.
        const neworder = await Order.create({
            user_id,
            status,
            driver_id,
            nickname,
            address,
            photo,
            request,
        });
        return neworder;
    };

    userSignUp = async (user_type, user_id, password) => {
        if (user_type === 0) {
            const newuser = await User.create({
                user_id,
                password,
                user_type,
                point: 1000000,
                order: 0,
            });
            return newuser;
        }
        if (user_type === 1) {
            const newuser = await User.create({
                user_id,
                password,
                user_type,
                point: 0,
                order: 0,
            });
            return newuser;
        }
    };
    findUser = async (user_id) => {
        // console.log('finduser-userid', user_id, typeof user_id);
        const user = await User.findOne({
            where: { user_id: user_id },
        });
        // console.log('user', user);
        if (!user) {
            return false;
        } else {
            return {
                id: user.id,
                user_id: user.user_id,
                password: user.password,
                user_type: user.user_type,
            };
        }
    };
    findUser2 = async (user_id) => {
        // console.log('finduser-userid', user_id, typeof user_id);
        const user = await User.findOne({
            where: { id: user_id },
        });
        // console.log('user', user);
        if (!user) {
            return false;
        } else {
            return {
                id: user.id,
                user_id: user.user_id,
                password: user.password,
                user_type: user.user_type,
            };
        }
    };
}

module.exports = UsersRepository;
