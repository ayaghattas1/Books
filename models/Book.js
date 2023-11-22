const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseIdValidator = require('mongoose-id-validator');

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
    type: mongoose.Types.ObjectId,
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
// Ajouter des validateurs au schéma
bookSchema.path('titre').validate((value) => {
  return value.length > 0;
}, 'Le titre ne peut pas être vide.');

bookSchema.path('auteur').validate({
  validator: async function(value) {
    const auteur = await mongoose.model('Auteur').findById(value);
    return auteur !== null;
  },
  message: 'L\'auteur doit être un ID d\'auteur valide.'
});
bookSchema.plugin(mongooseIdValidator);

module.exports = Book = mongoose.model("Book", bookSchema);