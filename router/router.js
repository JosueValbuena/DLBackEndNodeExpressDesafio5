const express = require('express');
const router = express.Router();
const { getJoyas, getJoyasHATEOAS, getJoyasFilter } = require("../consultas");

router.get("/", (req, res) => {
    res.send("Hola desde express");
})

router.get("/joyas", async (req, res) => {
    try {
        const queryString = req.query;
        const joyas = await getJoyas(queryString);
        const HATEOAS = await getJoyasHATEOAS(joyas);
        res.json(HATEOAS);
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

router.get("/joyas/filtro", async (req, res) => {
try {
    const queryString = req.query;
    const joyasfiltradas = await getJoyasFilter(queryString);
    res.json(joyasfiltradas)
} catch (error) {
    console.log(error);
    res.send(error);
}
})

router.get("*", (req, res) => {
    res.status(404).send("Esta pagina no existe");
})

module.exports = router;