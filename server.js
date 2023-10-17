const http = require("http")
const app = require ("./app")
//createServer accepte un callback qui a comme paramètre la requete et la réponse
const port = process.env.Port || 5000
app.set("port", port);
const server = http.createServer(app);

server.listen(port, () => {
  console.log("Listening on " + port);
})