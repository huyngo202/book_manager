// controllers/bookController.js
import Book from '../models/Book.js';

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};

export const createBook = async (req, res) => {
    const { title, author, genre, quantity } = req.body;
    try {
        const book = new Book({ title, author, genre, quantity });
        const createdBook = await book.save();
        res.status(201).json(createdBook);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            await book.deleteOne();
            res.json({ message: 'Sách đã được xóa' });
        } else {
            res.status(404).json({ message: 'Không tìm thấy sách' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// @desc    Cập nhật sách (Admin)
// @route   PUT /api/books/:id
export const updateBook = async (req, res) => {
    const { title, author, genre, quantity } = req.body;

    try {
        const book = await Book.findById(req.params.id);

        if (book) {
            book.title = title || book.title;
            book.author = author || book.author;
            book.genre = genre || book.genre;
            // Cẩn thận khi cập nhật quantity, chỉ cập nhật nếu có giá trị được gửi lên
            if (quantity !== undefined) {
                book.quantity = quantity;
            }

            const updatedBook = await book.save();
            res.json(updatedBook);
        } else {
            res.status(404).json({ message: 'Không tìm thấy sách' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server' });
    }
};