const pool = require("./servidor");
const format = require("pg-format");

const getJoyas = async ({ limits = "3", page = 1, order_by = 'id_ASC' }) => {
    const [campo, direccion] = order_by.split("_");
    const offset = (page - 1) * limits;
    const formatQuery = format("SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s", campo, direccion, limits, offset)
    const { rows: joyas } = await pool.query(formatQuery);
    return joyas;
}

const getJoyasHATEOAS = (joyas) => {
    const result = joyas.map((ele) => {
        return {
            name: ele.nombre,
            url: `/joyas/joya/${ele.id}`
        }
    }).splice(0, 4);

    const total = joyas.length;
    const HATEOAS = {
        total,
        result
    };
    return HATEOAS;
}

const getJoyasFilter = async ({ precio_max, precio_min, categoria, metal }) => {
    let filtros = [];
    const values = [];

    const addfilters = (campo, comparador, valor) => {
        values.push(valor);
        const i = filtros.length;
        filtros.push(`${campo} ${comparador} $${i + 1}`)
    };

    if (precio_max) addfilters("precio", ">=", precio_max);
    if (precio_min) addfilters("precio", "<=", precio_min);
    if (categoria) addfilters("categoria", "=", categoria);
    if (metal) addfilters("metal", "=", metal);

    let consulta = "SELECT * FROM inventario";

    if (filtros.length > 0) {
        filtros = filtros.join(" AND ");
        consulta += ` WHERE ${filtros}`
    }
    console.log(consulta);
    console.log(values);

    const { row: joyas } = await pool.query(consulta, values);
    return joyas;
}

module.exports = {
    getJoyas,
    getJoyasHATEOAS,
    getJoyasFilter
}