const ReviewsRepository = require("../repositories/reviews.repository")

class ReviewsService {
	reviewsRepository = new ReviewsRepository();

	reviewOrder = async (reviewer_id, reviewee_id, content, star) => {
		const newReviewData = await this.reviewsRepository.reviewOrder(
			reviewer_id,
			reviewee_id,
			content,
			star
		);
	};
}

module.exports = ReviewsService;