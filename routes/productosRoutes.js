const express = require("express");
const router = express.Router();
const controller = require("../controller/productosController");

router.get("/productos", controller.productos);
router.post("/nuevo/productos", controller.agregarProductos);
router.put('/update/productos/:id', controller.updateProducto);

module.exports = router;