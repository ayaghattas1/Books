const Book = require("../models/book");
const Auteur = require("../models/auteur");
const Categorie = require("../models/categorie");

// Créer un nouveau livre
const addBook = (req, res, next) => {
    const newBook = new Book(req.body);
    newBook.validate((err) => {
      if (err) {
        res.status(401).json({ error: 'ID d\'auteur invalide!' });
        return;
      }
    Auteur.findOne({ _id: auteur })
      .then((auteurResponse) => {
        if (!auteurResponse) {
          res.status(401).json({ error: "Auteur introuvable!" });
        } else {
          Categorie.findOne({ _id: categorie })
            .then((categorieResponse) => {
              if (!categorieResponse) {
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
            .catch((categorieError) => {
              res.status(400).json({ erreur: "Erreur lors de la recherche de la catégorie" });
            });
        }
      })
      .catch((auteurError) => {
        res.status(400).json({ erreur: "Erreur lors de la recherche de l'auteur" });
      });
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

const findByAuthor = (req, res) => {
  Book.find({ auteur: req.params.id })
       .then(books => res.json(books))
       .catch(err => res.status(500).json({ error: err }));
};

const createBookWithAuthorCheck = async (req, res, next) => {
  try {
    const { titre, auteur } = req.body;

    // Valider le livre avec Mongoose
    const newBook = new Book({ titre, auteur });
    await newBook.validate();

    // Vérifier si l'auteur a des anciens livres
    const anciensBooks = await Book.find({ auteur });

    if (anciensBooks.length > 0) {
      // L'auteur a des anciens livres, vous pouvez créer le nouveau livre
      await newBook.save();
      res.status(201).json({ message: 'Livre créé avec succès!' });
    } else {
      // L'auteur n'a pas d'anciens livres
      res.status(401).json({ error: 'L\'auteur doit avoir écrit d\'autres livres avant de créer celui-ci.' });
    }
  } catch (error) {
    res.status(400).json({ erreur: error.message });
  }
}

module.exports = {
    getBook,
    addBook,
    getBookId,
    updateBook,
    deleteBook,
    findByAuthor,
    createBookWithAuthorCheck,
};