import { Router } from 'express';
import { createAuthor, getAllAuthors } from '../controllers/authorController';

const router = Router();

router.post('/authors', createAuthor);
router.get('/authors', getAllAuthors);

export default router;