// models/Borrowing.js
import mongoose from 'mongoose';

const BorrowingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    borrowDate: { type: Date, default: Date.now },
    returnDate: { type: Date },
    status: { type: String, enum: ['borrowed', 'returned'], default: 'borrowed' },
});

const Borrowing = mongoose.model('Borrowing', BorrowingSchema);
export default Borrowing;