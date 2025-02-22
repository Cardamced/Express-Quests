const database = require("../../database");

const getUsers = (req, res) => {
  let sql = "SELECT * FROM users";
  const sqlValues = [];

  if (req.query.language && req.query.city) {
    sql += " where language = ? AND city = ?";
    sqlValues.push(req.query.language, req.query.city);
  } else if (req.query.language) {
      sql += " where language = ?";
      sqlValues.push(req.query.language);
  } else if (req.query.city) {
    sql += " where city = ?";
    sqlValues.push(req.query.city);
  }

  database
    .query(sql, sqlValues)
    .then(([users]) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500).send("Une erreur est appartue lors de la récupération des utilisateurs");
    });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("SELECT id, firstname, lastname, email, city, language FROM users WHERE id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

const getUserByEmailWithPasswordAndPassToNext = (req, res, next) => {
  const { email } = req.body;

  database
    .query("select * from users where email = ?", [email])
    .then(([users]) => {
      if (users[0] != null) {
        req.user = users[0];
        next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500).send("Error retrieving data from database");
    });
}

const postUser = (req, res) => {
  const { firstname, lastname, email, city, language, hashedPassword } = req.body;

  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language, password) VALUES (?, ?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language, hashedPassword]
    )
    .then(([result]) => {
      res.status(201).send({ id: result.insterId });
      console.log(result.insertId)
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500).send("error retrieving data from database");
    });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language, hashPassword } = req.body;

  database
    .query(
      "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ?, password = ? WHERE id = ?",
      [firstname, lastname, email, city, language, hashPassword, id]
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

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("delete from users where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  updateUser,
  deleteUser,
  getUserByEmailWithPasswordAndPassToNext,
};
