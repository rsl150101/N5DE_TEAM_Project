const UsersService = require('../services/users.service');
const { User, Order } = require('../models');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');

// User의 컨트롤러(Controller)역할을 하는 클래스
class UsersController {
    usersService = new UsersService();

    reqOrderStatus = async (req, res, next) => {
        const cookie = req.cookies.token;
        const customer_id = jwt.decode(cookie).user_id;
        const order_id = req.params.order_id;
        const user_id = req.params.user_id;
        console.log('reqUserId', user_id);
        const reqOrderStatusData = await this.usersService.reqOrderStatus(user_id, order_id);
        const userType = await this.usersService.getUserType(parseInt(user_id));
        // console.log('reqOrder', reqOrderStatusData);
        console.log('userType', userType);

        return res.render('customer-order-status-inquiry', {
            orderData: reqOrderStatusData,
            userType,
            order_id,
        });
    };

    orderResponse = async (req, res, next) => {
        // 서비스 계층에 구현된 로직을 실행합니다.
        // const order = await this.usersService.findMyOrder();
        // return res.render("customer-order-status", { order: false });
        try {
            const cookie = req.cookies.token;
            const user_id = jwt.decode(cookie).user_id;
            let order;
            const user = await User.findOne({ where: { id: user_id } });
            if (user.dataValues.user_type) {
                order = await Order.findOne({ where: { driver_id: user_id } });
            } else {
                order = await Order.findOne({ where: { customer_id: user_id } });
            }
            // const orders = await Order.findAll({ where: { status: 0 } });
            const orders = await Order.findAll({ where: { status: 0 } });
            const orders_id = JSON.stringify(
                orders.map((item) => {
                    return item.id;
                })
            );
            // console.log("order Id" , orders_id)
            // console.log("orders", orders);
            // const jsonOrders = JSON.stringify(orders);
            // console.log("json",jsonOrders)
            // const jsonOrders = JSON.stringify([ { a: 1, b: 2 }, { a: 2, b: 3 }, { a: 3, b: 4 } ]);
            return res.render('customer-main', {
                orders_id,
                photo: order ? order.photo : '',
                request: order ? order.request : '',
                driver_id: order ? order.driver_id : '',
                customer_id: order ? order.customer_id : '',
                order_id: order ? order.id : '',
                orders: order ? '' : orders,
                order: user.dataValues.order,
                user_type: user.dataValues.user_type,
                user_id,
            });
        } catch (err) {
            res.status(400).send({ message: err.message });
        }

        // return res.send("내가 만든 쿠키")
        // res.status(200).json({ data: order });
    };

    // 가입 get
    getJoin = (req, res) => {
        return res.render('join_page');
    };

    // 가입 post
    userSignup = async (req, res) => {
        const { user_type, user_id, password, confirmPassword } = req.body;
        try {
            if (password !== confirmPassword) {
                res.status(412).send({
                    errorMessage: '패스워드가 패스워드 확인란과 동일하지 않습니다.',
                });
                return;
            }
            if (user_id.length < 4) {
                res.status(412).send({
                    errorMessage: 'ID 형식이 올바르지 않습니다(4자 이상)',
                });
                return;
            }
            const existUsers = await User.findAll({
                where: {
                    [Op.or]: [{ user_id }],
                },
            });
            if (existUsers.length) {
                res.status(412).send({
                    errorMessage: '이미 사용중인 닉네임입니다.',
                });
                return;
            }
            const reqSignUpData = await this.usersService.userSignUp(
                parseInt(user_type),
                user_id,
                password,
                confirmPassword,
                res.status(201).send({
                    message: '회원가입을 축하합니다.',
                })
            );
        } catch (error) {
            console.log(error.message);
            res.status(400).send({ errorMessage: '회원가입에 실패하였습니다.' });
        }
    };

    //로그인

    userLogin = async (req, res) => {
        const { user_id, password } = req.body;
        if ((await this.usersService.checkUser(user_id, password)) === false) {
            return res.status(400).send('ID 또는 패스워드가 잘못됐습니다.');
        } else {
            const token = await this.usersService.issueToken(user_id);

            res.cookie('token', token);
            return res.redirect(`/users/${await this.usersService.getUserId(user_id)}`);
        }

        // userLogin = async (req, res) => {
        //   const { user_id, password } = req.body;

        //   const user = await User.findOne({ where: [{ user_id, password }] });

        //   return res.status(201).redirect(`/users/${user.id}`);
    };
}

module.exports = UsersController;
