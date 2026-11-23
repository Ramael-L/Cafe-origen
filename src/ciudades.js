
const { normalizarCiudad, valorVenta, totalPorCiudad } = require("./analitica.js");

// Versión 1: varios métodos encadenados.
function totalCiudadCadena(ventas, ciudad) {

    const ciudadBuscada = normalizarCiudad(ciudad);

    return ventas
        .map(venta => {
            return {
                ...venta,
                ciudad: normalizarCiudad(venta.ciudad)
            };
        })
        .filter(venta => {
            return venta.ciudad === ciudadBuscada;
        })
        .map(venta => {
            return valorVenta(venta);
        })
        .reduce((total, valor) => {
            return total + valor;
        }, 0);
}

// Versión 2: un solo recorrido.
function totalCiudadUnaPasada(ventas, ciudad) {

    const ciudadBuscada = normalizarCiudad(ciudad);
    let total = 0;

    for (const venta of ventas) {

        if (normalizarCiudad(venta.ciudad) === ciudadBuscada) {
            total += valorVenta(venta);
        }
    }

    return total;
}

module.exports = {
    totalCiudadCadena,
    totalCiudadUnaPasada,
    totalCiudad: totalCiudadUnaPasada
};
