/*const Categorie = require("../models/categorie");

const addCategorie = (req, res) => {
    const newAuteur = new Categorie(req.body);
    newAuteur.save()
        .then(categorie => {
            res.json(categorie);
        })
        .catch(err => {
            res.status(400).json({ erreur: 'Échec de la création de l\'categorie' });
        });
};

module.exports = {
    addCategorie,
};*/