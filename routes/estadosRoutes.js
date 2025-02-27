const express = require("express");
const router = express.Router();
const controller = require("../controller/estadosController");

router.get("/estados", controller.estados);

module.exports = router;