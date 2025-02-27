const db = require('../config/db');

exports.usuarios = (req, res) => {
    db.query('SELECT * FROM usuarios', (err, result) => {
        if (err) {
            console.log(err);
            console.error('Error obteniendo resultados ', err);
            return;
        } else {
            res.status(200).json(result);
        }
    });
};

// agregar usuario
exports.agregarUsuario = (req, res) => {
    const { nombre, apellido, direccion, telefono, usuario, email, clave, estado } = req.body;

    if (!nombre || !apellido || !direccion || !telefono || !usuario || !email || !clave || !estado) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const sql = `INSERT INTO usuarios(nombre, apellido, direccion, telefono, usuario, email, clave, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [nombre, apellido, direccion, telefono, usuario, email, clave, estado];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error insertando usuario:', err);
            return res.status(500).json({ error: "Error insertando usuario", detalles: err });
        }
        res.status(201).json({ message: "Usuario agregado con éxito", usuario_id: result.insertId });
    });
};

// actualizar usuairo
exports.updateUsuario = (req, res) => {
    const { id } = req.params; // ser recibe por parametros
    const { nombre, apellido, direccion, telefono, usuario, email, clave, estado } = req.body;

    if (!id || idNaN(id)) {
        return res.status(400).json({ error: "ID de usuario no válido" });
    }

    if (!nombre || !apellido || !direccion || !telefono || !usuario || !email || !clave || !estado) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const sql = `
        UPDATE usuarios
        SET nombre = ?, apellido = ?, direccion = ?, telefono = ?, usuario = ?, email = ?, clave = ?, estado = ?
        WHERE usuario_id = ?`;

    db.query(sql, values, (err, result) => {
        if (err) {
            console.log('Error al actualizar usuarios', err);
            return res.status(500).json({ error: "Error al actualizar usuario", detalles: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.status(200).json({ message: "Usuario actualizado con exito" });
    });
};