const UsersRepository = require("../repositories/users.repository");

class UsersService {
  usersRepository = new UsersRepository();

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

  userSignUp = async () => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const SignUpData = await this.usersRepository.Signup(
      user_id,
      password,
      star,
      point,
      user_type
    );
    return {
      user_id: SignUpData.user_id,
      password: SignUpData.password,
      star: SignUpData.star,
      point: SignUpData.point,
      user_type: SignUpData.user_type,
    };
  };
  verifyUser = (user) => {
    if (!user) {
      return { statusCode: 400, msg: "이메일 또는 패스워드가 잘못됐습니다." };
    }
  };
}

module.exports = UsersService;
