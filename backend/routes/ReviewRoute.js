import express from "express";
import { addReview, getReviewsByBook } from "../controllers/ReviewController.js";
const router = express.Router();

router.post("/add", addReview);
router.get('/:bookId', getReviewsByBook);

export default router;
