const OrdersService = require('../services/orders.service');
const jwt = require('jsonwebtoken');

// User의 컨트롤러(Controller)역할을 하는 클래스
class OrdersController {
    ordersService = new OrdersService();

    requestOrder = async (req, res, next) => {
        try {
            const { nickname, address, request } = req.body;
            const photo = req.file.path;
            const cookie = req.cookies.token;
            const customer_id = jwt.decode(cookie).user_id;
            const reqOrderData = await this.ordersService.requestOrder(customer_id, nickname, address, photo, request);
            return res.redirect(`/users/${customer_id}`);
        } catch (err) {
            console.log(err);
            res.status(400).json({ errorMessage: '요청 실패' });
        }
    };

    confirmOrder = async (req, res, next) => {
        try {
            const cookie = req.cookies.token;
            const driver_id = jwt.decode(cookie).user_id;
            const order_id = req.params.order_id;
            const confirmData = await this.ordersService.confirmOrder(driver_id, order_id);
            return res.sendStatus(200);
        } catch (err) {
            console.log(err);
            res.status(400).json({ errorMessage: '수락 실패' });
        }
    };
    increaseStatus = async (req, res) => {
        const { order_id } = req.params;
        console.log('제대로 작동하는지?');
        await this.ordersService.increaseStatus(order_id);
        return res.send('상태 증가');
    };
}

module.exports = OrdersController;
