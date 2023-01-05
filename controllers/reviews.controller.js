const ReviewsService = require("../services/reviews.service")
const jwt = require("jsonwebtoken")

class ReviewsController {
	reviewsService = new ReviewsService();

	
	reviewOrder = async (req, res, next) => {
		try {
		const { content, star } = req.body;
		const cookie = req.cookies.token;
		const reviewer_id = jwt.decode(cookie).user_id;
		const reviewee_id = req.params;
		const reqReviewData = await this.reviewsService.reviewOrder(
			reviewer_id,
			reviewee_id,
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
module.exports = ReviewsController;