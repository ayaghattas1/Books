const express = require("express");
const mongoose = require("mongoose");
const Book = require('./models/Book');

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.use(express.json());

mongoose.connect(
    "mongodb+srv://ayaghattas606:ayaatlas@cluster0.xwrdmxs.mongodb.net/<dbname>?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("Connexion à MongoDB réussite!"))
.catch((e) => console.log("Connexion à MongoDB échouée!", e));

// Créer un nouveau livre
app.post('/books', (req, res) => {
    const { titre, auteur, genre, edition, annee, nb_pages } = req.body;
    const newBook = new Book({ titre, auteur, genre, edition, annee, nb_pages });
    newBook.save()
        .then(book => {
            res.json(book);
        })
        .catch(err => {
            res.status(400).json({ erreur: 'Échec de la création du livre' });
        });
});

// Lire tous les livres
app.get('/books', async (req, res) => {
    Book.find({})
        .then(books => {
            res.json(books);
        })
        .catch(err => {
            res.status(500).json({ erreur: 'Erreur du serveur' });
        });
});

// Lire un livre spécifique par son ID
app.get('/books/:id', async (req, res) => {
    Book.findById(req.params.id)
        .then(book => {
            if (!book) return res.status(404).json({ erreur: 'Livre non trouvé' });
            res.json(book);
        })
        .catch(err => {
            res.status(500).json({ erreur: 'Erreur du serveur' });
        });
});

// Mettre à jour un livre existant
app.put('/books/:id', async (req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(book => {
            if (!book) return res.status(404).json({ erreur: 'Livre non trouvé' });
            res.json(book);
        })
        .catch(err => {
            res.status(500).json({ erreur: 'Erreur du serveur' });
        });
});

// Supprimer un livre
app.delete('/books/:id', async (req, res) => {
    Book.findByIdAndRemove(req.params.id)
        .then(book => {
            if (!book) return res.status(404).json({ erreur: 'Livre non trouvé' });
            res.json({ message: 'Livre supprimé avec succès' });
        })
        .catch(err => {
            res.status(500).json({ erreur: 'Erreur du serveur' });
        });
});

module.exports = app;