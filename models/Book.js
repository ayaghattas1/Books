const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  titre: {
    type: String,
    required: true
  },
  auteur: {
    type: mongoose.Types.ObjectId,
    ref: 'Auteur'
  },
  categorie: [{
    type: Schema.Types.ObjectId,
    ref: 'Categorie'
  }],
  edition: {
    type: String,
    required: true
  },
  annee: {
    type: String,
    required: true
  },
});

module.exports = Book = mongoose.model("Book", bookSchema);