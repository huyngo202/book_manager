// routes/borrowingRoutes.js
import express from 'express';
import { borrowBook, returnBook, getUserBorrowings } from '../controllers/borrowingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/myhistory', protect, getUserBorrowings); 
router.post('/borrow/:bookId', protect, borrowBook);
router.put('/return/:id', protect, returnBook); 
export default router;