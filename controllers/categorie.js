const Categorie = require("../models/categorie");

const addCategorie = (req, res) => {
    const newCategorie = new Categorie(req.body);
    newCategorie.save()
        .then(categorie => {
            res.json(categorie);
        })
        .catch(err => {
            res.status(400).json({ erreur: 'Échec de la création de l\'categorie' });
        });
};

module.exports = {
    addCategorie,
};