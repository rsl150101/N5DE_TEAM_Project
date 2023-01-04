const OrdersRepository = require("../repositories/orders.repository");

class OrdersService {
  ordersRepository = new OrdersRepository();

  requestOrder = async (customer_id, nickname, phone, address, photo, request) => {
    const newOrderData = await this.ordersRepository.requestOrder(
      customer_id,
      nickname,
      phone,
      address,
      photo,
      request
    );
    return {
      user_id: newOrderData.user_id,
      status: newOrderData.status,
      driver_id: newOrderData.driver_id,
      nickname: newOrderData.driver_id,
      phone: newOrderData.phone,
      address: newOrderData.address,
      photo: newOrderData.photo,
      request: newOrderData.request,
    };
  };
  reviewOrder = async (user_id, nickname, content, star) => {
    const newReviewData = await this.ordersRepository.reviewOrder(
      nickname,
      user_id,
      content,
      star
    );
    return {
      nickname: newReviewData.nickname,
      user_id: newReviewData.user_id,
      content: newReviewData.content,
      star: newReviewData.star,
    };
  };
}

module.exports = OrdersService;
