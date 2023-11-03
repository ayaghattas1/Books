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
/*const getAuteurById = (req, res) => {
    Auteur.findById(req.params.id)
        .then(auteur => {
            if (!auteur) return res.status(404).json({ erreur: 'Livre non trouvé' });
            res.json(auteur);
        })
        .catch(err => {
            res.status(500).json({ erreur: 'Erreur du serveur' });
        });
};*/

module.exports = {
    addAuteur,
};