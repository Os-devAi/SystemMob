const db = require('../config/db');

exports.ventas = (req, res) => {
    db.query('SELECT * FROM ventas', (err, result) => {
        if (err) {
            console.log(err);
            console.error('Error obteniendo resultados ', err);
            return;
        } else {
            res.status(200).json(result);
        }
    });
};

// realizar venta
exports.nuevaVenta = (req, res) => {
    const { nombre_cliente, apellido_cliente, direccion, telefono, producto_id, cantidad, precio_venta, total, fecha_venta } = req.body;

    if (!nombre_cliente || !apellido_cliente || !direccion || !telefono || !producto_id || !cantidad || !precio_venta || !total || !fecha_venta) {
        return res.status(400).json({ error: "Faltan campos obligatorio" });
    }

    const sql = `INSERT INTO ventas (nombre_cliente, apellido_cliente, direccion, telefono, producto_id, cantidad, precio_venta, total, fecha_venta)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`;

    const values = [nombre_cliente, apellido_cliente, direccion, telefono, producto_id, cantidad, precio_venta, total, fecha_venta];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al insertar la venta', err);
            return res.status(500).json({ error: "Error al insertar la venta", detalle: err });
        }
        res.status(201).json({ message: "Venta realizada con éxito", venta_id: result.insertId });
    });
};