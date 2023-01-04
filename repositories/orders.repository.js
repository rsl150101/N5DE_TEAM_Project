const { Order, Review } = require("../models");

class ApisRepository {
  requestOrder = async (
    customer_id,
    nickname,
    phone,
    address,
    photo,
    request
  ) => {
    // ORM인 Sequelize에서 Posts 모델의 create 메소드를 사용해 데이터를 요청합니다.
    const requestOrder = await Order.create({
      customer_id: customer_id,
      status: 0,
      
      nickname,
      phone,
      address,
      photo,
      request,
    });

    return requestOrder;
  };

  reviewOrder = async (nickname, user_id, content, star) => {
    const reviewOrder = await Review.create({
      nickname,
      user_id,
      content,
      star,
    });
    return reviewOrder;
  };
}

module.exports = ApisRepository;
