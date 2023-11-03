const express = require("express");
const router = express.Router();
const auteurController = require("../controllers/auteur");

router.post("/", auteurController.addAuteur);


module.exports = router;