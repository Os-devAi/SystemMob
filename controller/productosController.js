const db = require('../config/db');

// obtener los productos
exports.productos = (req, res) => {
    db.query('SELECT * FROM productos', (err, result) => {
        if (err) {
            console.log(err);
            console.error('Error obteniendo resultados ', err);
            return;
        } else {
            res.status(200).json(result);
        }
    });
};

// agregar productos
exports.agregarProductos = (req, res) => {
    const { nombre, descripcion, imagen, marca, stock, stock_min, categoria, estado, costo, precio, proveedor } = req.body;

    // Validar que los datos requeridos no sean undefined o null
    if (!nombre || !descripcion || !categoria || !estado || !costo || !precio) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const sql = `
        INSERT INTO productos (nombre, descripcion, imagen, marca, stock, stock_min, categoria, estado, costo, precio, proveedor, fecha_actualizado) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`;

    const values = [nombre, descripcion, imagen || '', marca || '', stock || 0, stock_min || 0, categoria, estado, costo, precio, proveedor || ''];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error insertando producto:', err);
            return res.status(500).json({ error: "Error insertando producto", detalles: err });
        }
        res.status(201).json({ message: "Producto agregado con éxito", producto_id: result.insertId });
    });
};

// Actualizar un producto
exports.updateProducto = (req, res) => {
    const { id } = req.params; // ID del producto a actualizar
    const { nombre, descripcion, imagen, marca, stock, stock_min, categoria, estado, costo, precio, proveedor } = req.body;

    // Validar que el ID esté presente y sea un número válido
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "ID de producto no válido" });
    }

    // Validar que los campos obligatorios tengan valores
    if (!nombre || !descripcion || !categoria || !estado || !costo || !precio) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const sql = `
        UPDATE productos 
        SET nombre = ?, descripcion = ?, imagen = ?, marca = ?, stock = ?, stock_min = ?, categoria = ?, estado = ?, costo = ?, precio = ?, proveedor = ?, fecha_actualizado = NOW()
        WHERE producto_id = ?`;

    const values = [nombre, descripcion, imagen || '', marca || '', stock || 0, stock_min || 0, categoria, estado, costo, precio, proveedor || '', id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error actualizando producto:', err);
            return res.status(500).json({ error: "Error actualizando producto", detalles: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.status(200).json({ message: "Producto actualizado con éxito" });
    });
};
