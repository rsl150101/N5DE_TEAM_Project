const { Order } = require("../models");

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
    asign_table
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
      asign_table,
    });

    return neworder;
  };
}

module.exports = UsersRepository;
