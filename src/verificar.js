// Importamos los datos de las ventas
const ventas = require("./datos.js");

// Importamos las funciones originales y las nuevas
const {
    totalVendido,
    totalVendidoM,
    unidadesVendidas,
    unidadesVendidasM,
    ventasPorCiudad,
    ventasPorCiudadM
} = require("./analitica.js");

// Función para comparar resultados.
function comparar(nombre, original, nuevo) {

    if (original === nuevo) {
        console.log(nombre, "OK");
    } else {
        console.log(nombre, "DIFERENTE");
    }

}

// Comparamos el total vendido.
comparar(
    "Total vendido:",
    totalVendido(ventas),
    totalVendidoM(ventas)
);

// Comparamos las unidades vendidas.
comparar(
    "Unidades vendidas:",
    unidadesVendidas(ventas),
    unidadesVendidasM(ventas)
);

// Comparamos las ventas de Medellín.
comparar(
    "Ventas Medellín:",
    ventasPorCiudad(ventas, "medellin"),
    ventasPorCiudadM(ventas, "medellin")
);