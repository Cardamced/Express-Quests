require("dotenv").config();
const express = require("express");
const app = express();
const movieControllers = require("./controllers/movieControllers");
const usersControllers = require("./controllers/usersControllers");
const validateMovie = require("./middlewares/validateMovie");
const validateUser = require("./middlewares/validateUser");
const { hashPassword, verifyPassword, verifyToken } = require("./auth.js");


app.use(express.json());

const bonjour = (req, res) => {
    res.send("Bienvenue sur la page de mes films préférés")
}

/* Routes publiques */

app.get("/", bonjour);
app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.get("/api/users", usersControllers.getUsers);
app.get("/api/users/:id", usersControllers.getUserById);

app.post(
    "/api/login",
    usersControllers.getUserByEmailWithPasswordAndPassToNext,
    verifyPassword
    );
app.post("/api/users", validateUser, hashPassword, usersControllers.postUser);
    
app.use(verifyToken);

app.post("/api/movies", validateMovie, verifyToken, movieControllers.postMovie);
app.put("/api/movies/:id", validateMovie, verifyToken, movieControllers.updateMovie);
app.delete("/api/movies/:id", verifyToken, movieControllers.deleteMovie);
app.put("/api/users/:id", validateUser, hashPassword, verifyToken, usersControllers.updateUser);
app.delete("/api/users/:id", verifyToken, usersControllers.deleteUser);



/* Pour protéger les routes avec le middleware verifyToken,
on va répartir les routes publiques et celles privées (à protéger)
On construit entre les deux parties du fichier un mur d'authentification avec app.use(verifyToken).

Chaque route avant le mur : pas besoin de token
Chaque route après le mur : besoin d'un token */

/* 1) dans les routes publiques, les routes get */

/* 2) dans les routes publiques, la route login */

/* 3) dans les routes privées, les routes post, put et delete */


module.exports = app;
