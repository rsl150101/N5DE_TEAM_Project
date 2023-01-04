const OrdersService = require("../services/orders.service");
const jwt = require("jsonwebtoken");

// User의 컨트롤러(Controller)역할을 하는 클래스
class OrdersController {
  ordersService = new OrdersService();

  requestOrder = async (req, res, next) => {
    try {
      const { nickname, phone, address, request } = req.body;
      const photo = req.file.path;
      const cookie = req.cookies.token;
      const customer_id = jwt.decode(cookie).user_id;
      const reqOrderData = await this.ordersService.requestOrder(
        customer_id,
        nickname,
        phone,
        address,
        photo,
        request
      );
      console.log(photo)
      res.render("customer-order-status", { order:true,photo,request });
    } catch (err) {
      console.log(err);
      res.status(400).json({ errorMessage: "요청 실패" });
    }
  };

  reviewOrder = async (req, res, next) => {
    try {
      const { content, star } = req.body;
      const review_id = req.params;
      const user_id = "Milb4";
      const reqReviewData = await this.apisService.reviewOrder(
        user_id,
        review_id,
        content,
        star
      );
      res.status(200).json({ data: reqReviewData });
    } catch (err) {
      console.log(err);
      res.status(400).json({ errorMessage: "리뷰 등록 실패" });
    }
  };
}

module.exports = OrdersController;
