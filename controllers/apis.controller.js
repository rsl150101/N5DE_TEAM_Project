const ApisService = require("../services/apis.service");

// User의 컨트롤러(Controller)역할을 하는 클래스
class ApisController {
  apisService = new ApisService();

  requestOrder = async (req, res, next) => {
    try {
      const { nickname, phone, address, photo, request } = req.body;
      const user_id = "milb4";
      const status = 0;
      const driver_id = null;
      const asign_table = 0;
      const reqOrderData = await this.apisService.requestOrder(
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
      res.render(photo);
      res.status(201).json({ data: reqOrderData });
    } catch (err) {
      console.log(err);
      res.status(400).json({ errorMessage: "요청 실패" });
    }
  };

  reviewOrder = async (req, res, next) => {
    try {
      const { content, star } = req.body;
      const review_id = req.params;
      const user_id = "milb4";
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

module.exports = ApisController;
