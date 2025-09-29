// controllers/borrowingController.js
import Borrowing from '../models/Borrowing.js';
import Book from '../models/Book.js';

export const borrowBook = async (req, res) => {
    const bookId = req.params.bookId;
    const userId = req.user._id;

    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Không tìm thấy sách' });
        }

        if (book.quantity <= 0) {
            return res.status(400).json({ message: 'Sách đã hết' });
        }

        book.quantity -= 1;
        await book.save();

        const borrowing = new Borrowing({ user: userId, book: bookId });
        await borrowing.save();

        res.status(201).json({ message: 'Mượn sách thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// @desc    Trả sách
// @route   PUT /api/borrowings/return/:id (id của bản ghi borrowing)
export const returnBook = async (req, res) => {
    try {
        const borrowing = await Borrowing.findById(req.params.id);

        if (!borrowing) {
            return res.status(404).json({ message: 'Không tìm thấy lượt mượn này' });
        }

        if (borrowing.status === 'returned') {
            return res.status(400).json({ message: 'Sách này đã được trả' });
        }

        // Cập nhật trạng thái và ngày trả
        borrowing.status = 'returned';
        borrowing.returnDate = new Date();
        await borrowing.save();

        // Tăng lại số lượng sách trong kho
        await Book.findByIdAndUpdate(borrowing.book, { $inc: { quantity: 1 } });

        res.json({ message: 'Trả sách thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// @desc    Lấy lịch sử mượn của user đang đăng nhập
// @route   GET /api/borrowings/myhistory
export const getUserBorrowings = async (req, res) => {
    try {
        const borrowings = await Borrowing.find({ user: req.user._id })
            .populate('book', 'title author') // Lấy thêm thông tin sách
            .sort({ borrowDate: -1 }); // Sắp xếp mới nhất lên đầu
        res.json(borrowings);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};