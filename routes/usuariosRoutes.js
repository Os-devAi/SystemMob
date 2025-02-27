const express = require("express");
const router = express.Router();
const controller = require("../controller/usuariosController");

router.get("/usuarios", controller.usuarios);
router.post("/nuevo/usuarios", controller.agregarUsuario);
router.put("/update/usuarios:id", controller.agregarUsuario);

module.exports = router;