const db = require('../config/db');

// obtener los estados
exports.estados = (req, res) => {
    db.query('SELECT * FROM estados', (err, result) => {
        if (err) {
            console.log(err);
            console.error('Error obteniendo resultados ', err);
            return;
        } else {
            res.status(200).json(result);
        }
    });
};