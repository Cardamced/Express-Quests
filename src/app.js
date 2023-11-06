require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const port = process.env.APP_PORT || 3000;

const movieControllers = require("./controllers/movieControllers");
const usersControllers = require("./controllers/usersControllers");


app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.post("/api/movies", movieControllers.postMovie);

// Créer une route GET /api/users, cette route doit renvoyer un statut 200
// et une liste d'utilisateurs de la base de données au format json

app.get("/api/users", usersControllers.getUsers);
app.post("/api/users", usersControllers.postUser);

//Créez une route GET /api/users/:id qui renverra uniquement l'utilisateur
//de la base de données correspondant à l'identifiant défini dans l'url
//S'il y a un utilisateur qui correspond aux paramètres, renvoie une réponse
//avec un statut 200 et l'utilisateur correspondant en tant qu'objet json
//Sinon, retourne un statut 404

app.get("/api/users/:id", usersControllers.getUserById);


module.exports = app;
