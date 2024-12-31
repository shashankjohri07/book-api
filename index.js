const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
require('./config/db');
const Book = require('./models/BookSchema');

app.use(express.json());

// Fetch all books
app.get('/books', (req, res) => {
    Book.find()
        .then((books) => res.json(books))
        .catch((err) => {
            console.error('Error fetching books:', err);
            res.status(500).json({ message: 'Error fetching books' });
        });
});

// Create a new book
app.post('/books', (req, res) => {
    Book.create(req.body)
        .then((book) => {
            res.status(201).json(book); // Success response with status code 201
        })
        .catch((err) => {
            console.error('Error creating book:', err); // Log the error for debugging
            res.status(500).json({ message: 'Error creating book' }); // Send proper error response
        });
});

// Delete a book by title
app.delete('/books/:title', (req, res) => {
    Book.findOneAndDelete({ title: req.params.title })
        .then(() => res.json({ message: 'Deleted Successfully!!!' }))
        .catch((err) => {
            console.error('Error deleting book:', err);
            res.status(500).json({ message: err.message });
        });
});

// <--------Updated book -------->
app.put('/books/:title', (req, res) => {
    Book.findOneAndUpdate({ title: req.params.title }, req.body, { new: true })
        .then((updatedBook) => res.json({ message: 'Updated Successfully!!!', updatedBook }))
        .catch((err) => {
            console.error('Error updating book:', err);
            res.status(500).json({ message: err.message });
        });
});

// <------Fetch a book by genre--->
app.get('/books/genre/:genre', (req, res) => {
    Book.findOne({ genre: req.params.genre })
        .then((book) => res.json(book))
        .catch((err) => {
            console.error('Error fetching book by genre:', err);
            res.status(500).json({ message: err.message });
        });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
