const Show = require('../models/show.model.ts');



// Retrieve and return all shows from the database.
exports.findAll = (req, res) => {
    Show.find()
    .then(shows => {
        res.send(shows);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving shows."
        });
    });
};