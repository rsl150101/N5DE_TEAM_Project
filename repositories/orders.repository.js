const { Order, Review } = require("../models");
const { where, or } = require("sequelize");

class OrdersRepository {
  reqOrderStatus = async (customer_id, order_id) => {
    const reqOrderStatus = await Order.findOne({
      where: { customer_id: customer_id, id: order_id },
    });
    return reqOrderStatus;
  };
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

  reviewOrder = async (reviewer_id, reviewee_id, content, star) => {
    const reviewOrder = await Review.create({
      reviewer_id: reviewer_id,
      reviewee_id: reviewee_id,
      content: content,
      star: star,
    });
    return reviewOrder;
  };
}

module.exports = OrdersRepository;
