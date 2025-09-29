// models/Book.js
import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    quantity: { type: Number, required: true, min: 0 },
});

const Book = mongoose.model('Book', BookSchema);
export default Book;