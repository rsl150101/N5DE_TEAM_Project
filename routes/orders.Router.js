const express = require("express");
const router = express.Router();

const OrdersController = require("../controllers/orders.controller.js");
const ordersController = new OrdersController();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/uploads/"); // 파일 경로 설정
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  }, //필드네임인 img와 현재 시각을 파일 이름으로 설정했다
});
const upload = multer({ storage: storage });

router.post(
  "/order/request",
  upload.single("photo"),
  ordersController.requestOrder
);

router.post(
  "/order/:order_id/review",
  ordersController.reviewOrder
);

module.exports = router;
