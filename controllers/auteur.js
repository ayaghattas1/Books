const Auteur = require("../models/auteur");

const addAuteur = (req, res) => {
    const newAuteur = new Auteur(req.body);
    newAuteur.save()
        .then(auteur => {
            res.json(auteur);
        })
        .catch(err => {
            res.status(400).json({ erreur: 'Échec de la création de l\'auteur' });
        });
};

module.exports = {
    addAuteur,
};