const UsersRepository = require("../repositories/users.repository");
const OrdersRepository = require("../repositories/orders.repository");
class UsersService {
  usersRepository = new UsersRepository();
  ordersRepository = new OrdersRepository();

  reqOrderStatus = async (customer_id, order_id) => {
    try {
      const Order = await this.ordersRepository.reqOrderStatus(
        customer_id,
        order_id
      );

      if (customer_id === Order.customer_id || order_id === Order.id) {
        console.log(
          Order.phone,
          Order.address,
          Order.photo,
          Order.request,
          Order.status
        );
        return {
          phone: Order.phone,
          address: Order.address,
          photo: Order.photo,
          request: Order.request,
          status: Order.status,
        };
      }
    } catch (err) {
      console.log({ err, errorMessage: "알수 없는 오류" });
    }
  };
  orderResponse = async () => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const Order = await this.usersRepository.orderResponse();

    return Order.map((Order) => {
      return {
        userId: Order.user_id,
        driverId: Order.driver_id,
        address: Order.address,
        photo: Order.photo,
        status: Order.status,
        request: Order.request,
        createdAt: Order.createdAt,
        updatedAt: Order.updatedAt,
      };
    });
  };

  userSignUp = async (user_type, user_id, password) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const SignUpData = await this.usersRepository.userSignUp(
      user_type,
      user_id,
      password
    );
    return {
      user_id: SignUpData.user_id,
      password: SignUpData.password,
      user_type: SignUpData.user_type,
    };
  };
  verifyUser = (user) => {
    if (!user) {
      return {
        statusCode: 400,
        msg: "이메일 또는 패스워드가 잘못됐습니다.",
      };
    }
  };
}

module.exports = UsersService;
