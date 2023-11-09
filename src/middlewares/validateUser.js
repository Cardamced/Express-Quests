const { body, validationResult } = require('express-validator');

const validateUser = [
    body("firstname").exists().isLength({ max: 255 }),
    body("lastname").exists().isLength({ max: 255 }),
    body("email").exists().isEmail(),
    body("city").exists().isLength({ max: 255 }),
    body("language").exists().isLength({ min: 1, max: 30 }),
    body("password").exists().isLength({ max: 255 }),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({ validationErrors: errors.array() });
        } else {
            next();
        }
    },
];

module.exports = validateUser;

// [firstname, lastname, email, city, language, hashPassword, id]