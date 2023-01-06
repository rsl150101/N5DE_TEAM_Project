const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/orders.controller.js');
const ordersController = new OrdersController();
const authMiddleware = require('../middlewares/auth-middleware.js');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/uploads/'); // 파일 경로 설정
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }, //필드네임인 img와 현재 시각을 파일 이름으로 설정했다
});

const upload = multer({ storage: storage });
// 여기는 customer
router.post('/order/request', upload.single('photo'), ordersController.requestOrder);

// 여기부터 driver
router.patch('/order/:order_id/confirm', authMiddleware, ordersController.confirmOrder);
router.post('/order/:order_id/status', authMiddleware, ordersController.increaseStatus);

module.exports = router;
