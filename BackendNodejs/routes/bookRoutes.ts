import { Router } from 'express';
import {
  createBook,
  getAllBooks,
  calculateAvgPagesPerChapter,
} from '../controllers/bookController';

const router = Router();

router.post('/books', createBook);
router.get('/books', getAllBooks);
router.get('/books/:id/avg-pages-per-chapter', calculateAvgPagesPerChapter);

export default router;