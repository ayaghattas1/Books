const express = require("express");
const mongoose = require("mongoose");
const auteurRouter= require("./routes/auteur")
const bookRouter= require("./routes/book")
const categorieRouter= require("./routes/categorie");

//const categorieRouter= require("./routes/categorie")



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

//sur mongo local
mongoose.connect("mongodb://127.0.0.1:27017/Biblio",{
  useNewUrlParser: true , useUnifiedTopology:true }
).then(() => console.log("connexion a MongoDB reussie!"))
.catch((e) => console.log("connexion a MongoDB échouée!",e))

app.use("/api/book", bookRouter)
app.use("/api/auteur",auteurRouter)
app.use("/api/categorie",categorieRouter)

//app.use("/api/categorie",categorieRouter)

module.exports = app;