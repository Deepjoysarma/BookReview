import express from 'express';
import { addBook, getAllBooks, getSingleBook } from '../controllers/BooksController.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.post('/add', upload.single('image'), addBook);
router.get('/all', getAllBooks);
router.get('/single/:title', getSingleBook);

export default router;