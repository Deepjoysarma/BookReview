import Review from "../models/Review.model.js";

const addReview = async (req, res) => {
  try {
    const { userId, bookId, text, rating } = req.body;

    if (!userId || !bookId || !text) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const newReview = new Review({
      user: userId,
      book: bookId,
      text,
      rating
    });

    await newReview.save();

    res.status(201).json({ success: true, message: "Review submitted", review: newReview });
  } catch (error) {
      console.log("Error in addReview:", error);
      res.status(500).json({ success: false, message: "Server error" });
  }
};

const getReviewsByBook = async (req, res) => {

    try {
      const { bookId } = req.params;

      const reviews = await Review.find({ book: bookId }).populate('user', 'username email');

      res.status(200).json({ success: true, reviews });

    } catch (error) {
        console.error('Error in getReviewsByBook:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export { addReview, getReviewsByBook };
