const { Review } = require('../models');

class ReviewsReposiroty {
    reviewOrder = async (reviewer_id, reviewee_id, content, star) => {
        const reviewOrder = await Review.create({
            reviewer_id: reviewer_id,
            reviewee_id: reviewee_id,
            content: content,
            star: star,
        });
        return reviewOrder;
    };
}

module.exports = ReviewsReposiroty;
