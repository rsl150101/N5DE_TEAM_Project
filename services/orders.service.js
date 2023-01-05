const OrdersRepository = require("../repositories/orders.repository");

class OrdersService {
  ordersRepository = new OrdersRepository();
  confirmOrder = async (driver_id, order_id) => {
    const pickConfirmData = await this.ordersRepository.confirmOrder(
      driver_id,
      order_id
    );
    return
  };

  requestOrder = async (
    customer_id,
    nickname,
    address,
    photo,
    request
  ) => {
    const newOrderData = await this.ordersRepository.requestOrder(
      customer_id,
      nickname,
      
      address,
      photo,
      request
    );
    return {
      user_id: newOrderData.user_id,
      status: newOrderData.status,
      driver_id: newOrderData.driver_id,
      nickname: newOrderData.driver_id,
      address: newOrderData.address,
      photo: newOrderData.photo,
      request: newOrderData.request,
    };
  };
}

module.exports = OrdersService;
