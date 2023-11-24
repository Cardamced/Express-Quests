// require("dotenv").config();
// const express = require("express");
// const app = express();
// const movieControllers = require("./controllers/movieControllers");
// const usersControllers = require("./controllers/usersControllers");
// const validateMovie = require("./middlewares/validateMovie");
// const validateUser = require("./middlewares/validateUser");
// const { hashPassword, verifyPassword, verifyToken } = require("./auth.js");


// app.use(express.json());

// const bonjour = (req, res) => {
//     res.send("Bienvenue sur la page de mes films préférés")
// }

// /* Exemple du cours */
// // const isItDwight = (req, res) => {
// //     if (req.body.email === "dwight@office.com" && req.body.password === "123456") {
// //         res.send("Credentials are valid");
// //     } else {
// //         res.sendStatus("401")
// //     }
// // };

// app.get("/", bonjour);
// app.get("/api/movies", movieControllers.getMovies);
// app.get("/api/movies/:id", movieControllers.getMovieById);
// app.get("/api/users", usersControllers.getUsers);
// //Créer une route GET /api/users/:id qui renverra uniquement l'utilisateur
// //de la base de données correspondant à l'identifiant défini dans l'url
// //S'il y a un utilisateur qui correspond aux paramètres, renvoie une réponse
// //avec un statut 200 et l'utilisateur correspondant en tant qu'objet json
// //Sinon, retourne un statut 404

// app.get("/api/users/:id", usersControllers.getUserById);

// /* explication du long nom du middleware */
// /* la partie getUserByEmail est le miroir du middleware getUserById */
// /* WithPassword est explicite, car les méthodes GET ne sont pas sensées
// sélectionner le MDP. Là, nous n'avons pas le choix. */
// /* On veut également passer les informations de la BDD au middleware suivant (verifyPassword). D'où la partie "AndPassToNext" */
// app.post(
//     "/api/login",
//     usersControllers.getUserByEmailWithPasswordAndPassToNext,
//     verifyPassword
// );


// /* `app.get("/", bonjour);` crée une route GET pour l'URL racine ("/") de l'application. Lorsqu'une
// requête GET est faite à l'URL racine, la fonction `bonjour` sera exécutée et elle enverra la réponse
// "Bienvenue sur la page de mes films préférés". */

// app.use(verifyToken);

// app.post("/api/movies", validateMovie, verifyToken, movieControllers.postMovie);
// app.put("/api/movies/:id", validateMovie, movieControllers.updateMovie);
// app.delete("/api/movies/:id", movieControllers.deleteMovie);

// app.post("/api/users", validateUser, hashPassword, usersControllers.postUser);
// app.put("/api/users/:id", validateUser, hashPassword, usersControllers.updateUser);
// app.delete("/api/users/:id", usersControllers.deleteUser);



// /* Pour protéger les routes avec le middleware verifyToken,
// on va répartir les routes publiques et celles privées (à protéger)
// On construit entre les deux parties du fichier un mur d'authentification avec app.use(verifyToken).

// Chaque route avant le mur : pas besoin de token
// Chaque route après le mur : besoin d'un token */

// /* 1) dans les routes publiques, les routes get */

// /* 2) dans les routes publiques, la route login */

// /* 3) dans les routes privées, les routes post, put et delete */


// module.exports = app;
