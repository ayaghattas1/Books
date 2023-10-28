const Book = require("../models/book");

// Créer un nouveau livre
const addBook = (req, res) => {
    const newBook = new Book(req.body);
    newBook.save()
        .then(book => {
            res.json(book);
        })
        .catch(err => {
            res.status(400).json({ erreur: 'Échec de la création du livre' });
        });
};

// Lire tous les livres
const getBook = (req, res) => {
    Book.find({})
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