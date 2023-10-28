const mongoose = require('mongoose');

const categorieSchema = new mongoose.Schema({
    titre: {
      type: String,
      enum: ["Horror", "Mystery", "Science Fiction", "Romance"]
    }
  });
  
module.exports = mongoose.model("Categorie", categorieSchema);