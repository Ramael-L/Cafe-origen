// Importamos las ventas.
const ventas = require("./datos.js");

// Importamos las funciones.
const {
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor
} = require("./analitica.js");

// Función para mostrar dinero en pesos colombianos.
function pesos(valor) {
    return "$" + valor.toLocaleString("es-CO", {
        maximumFractionDigits: 2
    });
}

// Encabezado.
console.log("       REPORTE CAFÉ ORIGEN");

// PRIMERA SECCIÓN
console.log("\nRESUMEN GENERAL");

console.log("Total vendido:", pesos(totalVendido(ventas)));
console.log("Unidades vendidas:", unidadesVendidas(ventas));
console.log("Ticket promedio:", pesos(ticketPromedio(ventas)));

const mayor = ventaMayor(ventas);

console.log("Venta mayor:", mayor ? pesos(mayor.cantidad * mayor.precio) : "Sin ventas");

// SEGUNDA SECCIÓN
console.log("\nVENTAS POR CIUDAD");

const ciudades = totalPorCiudad(ventas);
const tablaCiudades = [];

for (const entrada of Object.entries(ciudades)) {
    tablaCiudades.push({
        ciudad: entrada[0],
        total: pesos(entrada[1])
    });
}

console.table(tablaCiudades);

// TERCERA SECCIÓN
console.log("\nUNIDADES POR PRODUCTO");

console.table(unidadesPorProducto(ventas));

// CUARTA SECCIÓN
console.log("\nTOP 3 PRODUCTOS");

const top3 = topProductosPorValor(ventas, 3);

const tablaTop = top3.map(producto => {
    return {
        producto: producto.producto,
        total: pesos(producto.total)
    };
});

console.table(tablaTop);