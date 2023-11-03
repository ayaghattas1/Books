const Book = require("../models/book");

// Créer un nouveau livre
const addBook = (req, res, next) => {
    const newBook = new Book(req.body);
  
    Aut.findOne({ _id: auteur })
      .then((authorResponse) => {
        if (!authorResponse) {
          res.status(401).json({ error: "Auteur introuvable!" });
        } else {
          cat.findOne({ _id: categorie })
            .then((categoryResponse) => {
              if (!categoryResponse) {
                res.status(401).json({ error: "Categorie introuvable!" });
              } else {
                newBook.save()
                  .then((newBook) => {
                    res.json(newBook);
                  })
                  .catch((err) => {
                    res.status(400).json({ erreur: "Échec de la création du livre" });
                  });
              }
            })
            .catch((categoryError) => {
              res.status(400).json({ erreur: "Erreur lors de la recherche de la catégorie" });
            });
        }
      })
      .catch((authorError) => {
        res.status(400).json({ erreur: "Erreur lors de la recherche de l'auteur" });
      });
  };

// Lire tous les livres
const getBook = (req, res) => {
    Book.find({})
    .populate('auteur')
    .populate('categorie')
        .then(books => {
            res.json(books);
        })
        .catch(err => {
            res.status(500).json({ erreur: 'Erreur du serveur' });
        });
};

// Lire un livre spécifique par son ID
const getBookId = (req, res) => {
    Book.findById(req.params.id)
    .populate('auteur')
    .populate('categorie')
        .then(book => {
            if (!book) return res.status(404).json({ erreur: 'Livre non trouvé' });
            res.json(book);
        })
        .catch(err => {
            res.status(500).json({ erreur: 'Erreur du serveur' });
        });
};

// Mettre à jour un livre existant
const updateBook = (req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(book => {
            if (!book) return res.status(404).json({ erreur: 'Livre non trouvé' });
            res.json(book);
        })
        .catch(err => {
            res.status(500).json({ erreur: 'Erreur du serveur' });
        });
};

// Supprimer un livre
const deleteBook = (req, res) => {
    Book.findByIdAndRemove(req.params.id)
        .then(book => {
            if (!book) return res.status(404).json({ erreur: 'Livre non trouvé' });
            res.json({ message: 'Livre supprimé avec succès' });
        })
        .catch(err => {
            res.status(500).json({ erreur: 'Erreur du serveur' });
        });
};

module.exports = {
    getBook,
    addBook,
    getBookId,
    updateBook,
    deleteBook,
};