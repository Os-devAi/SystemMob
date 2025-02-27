require("dotenv").config();
const express = require("express");

// importar rutas
const estadosRoutes = require("../app/routes/estadosRoutes");
const productosRoutes = require("../app/routes/productosRoutes");

const app = express();
app.use(express.json());

// Middleware
var cors = require("cors");
const { agregarProductos } = require("./controller/productosController");
var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["POST", "GET", "DELETE", "PUT"],
    })
);

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// rutas
app.use(estadosRoutes);
app.use(productosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});