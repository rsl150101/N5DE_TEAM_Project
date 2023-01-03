const ApisRepository = require("../repositories/apis.repository");

class ApisService {
  apisRepository = new ApisRepository();

  requestOrder = async (
    user_id,
    status,
    driver_id,
    nickname,
    phone,
    address,
    photo,
    request,
    asign_table
  ) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const newOrderData = await this.apisRepository.requestOrder(
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
    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return {
      user_id: newOrderData.user_id,
      status: newOrderData.status,
      driver_id: newOrderData.driver_id,
      nickname: newOrderData.driver_id,
      phone: newOrderData.phone,
      address: newOrderData.address,
      photo: newOrderData.photo,
      request: newOrderData.request,
      asign_table: newOrderData.asign_table,
    };
  };
  reviewOrder = async (user_id, review_id, content, star) => {
    const newReviewData = await this.ApisRepository.reviewOrder(
      
    )
  };
}

module.exports = ApisService;
