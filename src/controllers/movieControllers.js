const database = require("../../database");

const movies = [
  {
    id: 1,
    title: "Citizen Kane",
    director: "Orson Wells",
    year: "1941",
    color: false,
    duration: 120,
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: "1972",
    color: true,
    duration: 180,
  },
  {
    id: 3,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: "1994",
    color: true,
    duration: 180,
  },
];

const getMovies = (req, res) => {
  database
    .query("select * from movies")
    .then(([movies]) => {
      res.json(movies); // use res.json instead of console.log
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const postMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
      [title, director, year, color, duration]
      )
      .then(([result]) => {
        res.status(201).send({ id: result.insterId });
        console.log(result.insertId)
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};


// version où l'on va rechercher le film via une requête SQL en premier paramètre de la méthode query qui SELECT par l'id.
// Pratique peu sûre, d'injecter l'id dans une requête SQL. On va donc utiliser une requête préparée.

// const getMovieById = (req, res) => {
//   const id = parseInt(req.params.id);
//   database
//     .query(`select * from movies where id = ${id}`)
//     .then(...)
//     .catch(...);
// };


// Méthode avec requête préparée (aka avec les "?")
const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query("select * from movies where id = ?", [id])
    .then(([movies]) => {
      if (movies[0] != null) {
        res.json(movies[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getMovies,
  getMovieById,
  postMovie,
};
