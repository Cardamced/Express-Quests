const validateMovie = (req, res, next) => {

    const { title, director, year, color, duration } = req.body;
    const errors = [];

    // avec des if pour vérifier chaque erreur et la pousser dans le tableau d'erreurs.

    // if (title == null) {
    //     errors.push({field: 'title', message: "The field 'title' is required"})
    //     res.status(422).send("The field 'title' is required");
    // } else if (director == null) {
    //     errors.push({field: 'director', message: "The field 'director' is required"})
    //     res.status(422).send("The field 'director' is resquired");
    // } else if (year == null) {
    //     errors.push({field: 'year', message: "The field 'year' is required"})
    //     res.status(422).send("The filed year is required");
    // } else if (color == null) {
    //     errors.push({field: 'color', message: "The field 'color' is required"})
    //     res.status(422).send("The field color is required");
    // } else if (duration == null) {
    //     errors.push({field: 'duration', message: "The field 'duration' is required"})
    //     res.status(422).send("The field duration is required");
    // } else {
    //     next();
    // }

    
    // Plus optimisé

    if (title == null) {
        errors.push({ field: "title", message: "This field is required" });
    } else if (title.length >= 255) {
        errors.push({ field: "title", message: "This field should contain less than 255 characters" });
    }
    if (director == null) {
        errors.push({ field: "director", message: "This field is required" });
    }
    if (year == null) {
        errors.push({ field: "year", message: "This field is required" });
    }
    if (color == null) {
        errors.push({ field: "color", message: "This field is required" });
    }
    if (duration == null) {
        errors.push({ field: "duration", message: "This field is required" });
    }
    /* La condition `if (errors.length)` vérifie s'il y a des erreurs dans le tableau `errors`. Si la
    longueur du tableau « erreurs » est supérieure à 0, cela signifie que des erreurs sont
    présentes. Dans ce cas, la condition est évaluée à « true » et le code à l'intérieur du bloc «
    if » est exécuté. Ce code envoie une réponse avec un statut 422 (Unprocessable Entity) et un
    objet JSON contenant les erreurs de validation. S'il n'y a pas d'erreurs (c'est-à-dire que la
    longueur du tableau « erreurs » est de 0), le bloc « else » est exécuté et la fonction « next()
    » est appelée pour passer au prochain middleware ou gestionnaire de route. */
    if (errors.length) {
        res.status(422).json({ validationErrors: errors });
    } else {
        next();
    }
};


module.exports = validateMovie;