// routes/bookRoutes.js
import express from 'express';
import { getAllBooks, createBook, deleteBook, updateBook } from '../controllers/bookController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getAllBooks)
    .post(protect, isAdmin, createBook);

router.route('/:id')
    .delete(protect, isAdmin, deleteBook)
    .put(protect, isAdmin, updateBook); 

export default router;