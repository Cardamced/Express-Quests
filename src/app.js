require("dotenv").config();
const express = require("express");
const app = express();
const movieControllers = require("./controllers/movieControllers");
const usersControllers = require("./controllers/usersControllers");
const { hashPassword } = require("./auth.js");
const validateMovie = require("./middlewares/validateMovie");
const validateUser = require("./middlewares/validateUser");

app.use(express.json());

const bonjour = (req, res) => {
    res.send("Bienvenue sur la page de mes films préférés")
}


app.get("/", bonjour);
app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.post("/api/movies", validateMovie, movieControllers.postMovie);
app.put("/api/movies/:id", validateMovie, movieControllers.updateMovie);
app.delete("/api/movies/:id", movieControllers.deleteMovie);

// Créer une route GET /api/users, cette route doit renvoyer un statut 200
// et une liste d'utilisateurs de la base de données au format json
// création des routes post et put pour créer un nouvel utlisateur et le modifier.

app.get("/api/users", usersControllers.getUsers);
app.post("/api/users", validateUser, hashPassword, usersControllers.postUser);
app.put("/api/users/:id", validateUser, hashPassword, usersControllers.updateUser);
app.delete("/api/users/:id", usersControllers.deleteUser);

//Créer une route GET /api/users/:id qui renverra uniquement l'utilisateur
//de la base de données correspondant à l'identifiant défini dans l'url
//S'il y a un utilisateur qui correspond aux paramètres, renvoie une réponse
//avec un statut 200 et l'utilisateur correspondant en tant qu'objet json
//Sinon, retourne un statut 404

app.get("/api/users/:id", usersControllers.getUserById);

  
module.exports = app;
