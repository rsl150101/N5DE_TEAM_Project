const { Order, User } = require('../models');

class OrdersRepository {
    confirmOrder = async (driver_id, order_id) => {
        const pickConfirm = await Order.update({ driver_id: driver_id, status: 1 }, { where: { id: order_id } });
        const userConfirm = await User.update({ order: 1 }, { where: { id: driver_id } });
        return;
    };

    reqOrderStatus = async (customer_id, order_id) => {
        const reqOrderStatus = await Order.findOne({
            where: { id: order_id },
            // where: { customer_id: customer_id, id: order_id },
        });
        // console.log('reqOrderStatusRepo', reqOrderStatus);
        return reqOrderStatus;
    };

    requestOrder = async (customer_id, nickname, address, photo, request) => {
        // ORM인 Sequelize에서 Posts 모델의 create 메소드를 사용해 데이터를 요청합니다.
        const requestOrder = await Order.create({
            customer_id: customer_id,
            status: 0,
            nickname,
            address,
            photo,
            request,
        });
        const orderplus1 = await User.update({ order: 1 }, { where: { id: customer_id } });

        return requestOrder, orderplus1;
    };

    findOrderStatus = async (orderId) => {
        const order = await Order.findOne({ where: { id: orderId } });
        return order.status;
    };
    increaseOrderStatus = async (orderId, orderStatus) => {
        await Order.update({ status: orderStatus }, { where: { id: orderId } });
    };
}

module.exports = OrdersRepository;
