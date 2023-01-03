const UsersService = require("../services/users.service");

// User의 컨트롤러(Controller)역할을 하는 클래스
class UsersController {
  usersService = new UsersService();

  orderResponse = async (req, res, next) => {
    // 서비스 계층에 구현된 로직을 실행합니다.
    const order = await this.usersService.findMyOrder();
    res.status(200).json({ data: order });
  };

  orderRequest = async (req, res, next) => {
    const { nickname, phone, address, photo, request } = req.body;
    const { user_id } = req.params;
    const status = 0;
    const driver_id = null;
    const asign_table = 0;
    try {
      const reqOrderData = await this.usersService.newOrder(
        user_id,
        status,
        driver_id,
        nickname,
        phone,
        address,
        photo,
        request,
        asign_table
      );
      res.status(201).json({ data: reqOrderData });
    } catch (err) {
      console.log(err);
      res.status(400).json({ errorMessage: "요청 실패" });
    }
  };
}

module.exports = UsersController;
