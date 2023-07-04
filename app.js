const express = require('express');
const app = express();
const router = require("./router/router.js");

const port = process.env.PORT || 3001;

app.use("/", router);

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`));