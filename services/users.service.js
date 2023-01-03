const UsersRepository = require("../repositories/users.repository");

class UsersService {
  usersRepository = new UsersRepository();

  orderResponse = async () => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const Order = await this.usersRepository.orderResponse();

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
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
}

module.exports = UsersService;
