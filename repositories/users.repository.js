const { where, or } = require("sequelize");
const { Order, User } = require("../models");

class UsersRepository {
  

  ordersResponse = async () => {
    // ORM인 Sequelize에서 Posts 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
    const ordersResponse = await Order.findAll();

    return ordersResponse;
  };

  newOrder = async (
    user_id,
    status,
    driver_id,
    nickname,
    phone,
    address,
    photo,
    request,
  ) => {
    // ORM인 Sequelize에서 Posts 모델의 create 메소드를 사용해 데이터를 요청합니다.
    const neworder = await Order.create({
      user_id,
      status,
      driver_id,
      nickname,
      phone,
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
}

module.exports = UsersRepository;
