const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true
  },
  auteur: {
    type: String,
    required: true
  },
  edition: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  annee: {
    type: String,
    required: true
  },
  nb_pages: {
    type: Number,
    required: true
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;