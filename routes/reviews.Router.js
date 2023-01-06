const express = require("express");
const router = express.Router();
const ReviewsController = require("../controllers/reviews.controller.js");
const authMiddleware = require("../middlewares/auth-middleware.js");
const reviewsController = new ReviewsController();

router.post (
	"/order/:order_id/review",
	authMiddleware,
	reviewsController.reviewOrder
);

module.exports = router;