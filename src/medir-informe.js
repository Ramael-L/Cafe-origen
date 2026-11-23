
const { generarVentas } = require("./generador.js");
const analitica = require("./analitica.js");

const {
    totalCiudadCadena,
    totalCiudadUnaPasada
} = require("./ciudades.js");

const { clientesRecurrentes } = require("./recurrentes.js");

// Generamos una sola muestra de 10.000 ventas.
const ventas = generarVentas(10000);

// Funciones que vamos a medir.
const pruebas = [
    ["valorVenta", () => analitica.valorVenta(ventas[0]), "constante", "1 venta"],
    ["totalVendido", () => analitica.totalVendido(ventas), "lineal"],
    ["unidadesVendidas", () => analitica.unidadesVendidas(ventas), "lineal"],
    ["ventaMayor", () => analitica.ventaMayor(ventas), "lineal"],
    ["ticketPromedio", () => analitica.ticketPromedio(ventas), "lineal"],

    ["normalizarCiudad", () => analitica.normalizarCiudad("Medellín"), "constante", "1 texto"],
    ["ventasPorCiudad", () => analitica.ventasPorCiudad(ventas, "Medellín"), "lineal"],

    ["totalVendidoM", () => analitica.totalVendidoM(ventas), "lineal"],
    ["unidadesVendidasM", () => analitica.unidadesVendidasM(ventas), "lineal"],
    ["ventasPorCiudadM", () => analitica.ventasPorCiudadM(ventas, "Medellín"), "lineal"],

    ["totalPorCiudad", () => analitica.totalPorCiudad(ventas), "lineal"],
    ["unidadesPorProducto", () => analitica.unidadesPorProducto(ventas), "lineal"],
    ["topProductosPorValor", () => analitica.topProductosPorValor(ventas, 3), "lineal"],

    ["clientesRecurrentes", () => clientesRecurrentes(ventas), "cuadratica"],

    ["totalCiudadCadena", () => totalCiudadCadena(ventas, "Medellín"), "lineal"],
    ["totalCiudadUnaPasada", () => totalCiudadUnaPasada(ventas, "Medellín"), "lineal"],

    ["generarVentas", () => generarVentas(10000), "lineal"]
];

const resultados = [];

for (const [nombre, ejecutar, crecimiento, entrada] of pruebas) {

    // Primera ejecución de preparación.
    ejecutar();

    const tiempos = [];

    // Medimos tres veces.
    for (let i = 0; i < 3; i++) {

        const inicio = process.hrtime.bigint();

        ejecutar();

        const fin = process.hrtime.bigint();

        const ms = Number(fin - inicio) / 1000000;

        tiempos.push(ms);
    }

    // Elegimos el valor central.
    tiempos.sort((a, b) => a - b);

    const tiempo = tiempos[1];

    // De 10.000 a 1.000.000 hay un factor de 100.
    let factor = 100;

    if (crecimiento === "constante") {
        factor = 1;
    }

    if (crecimiento === "cuadratica") {
        factor = 10000;
    }

    // Proyección expresada en segundos.
    const segundos = tiempo * factor / 1000;

    let proyeccion = segundos.toFixed(3) + " s";

    if (segundos >= 60) {
        proyeccion = (segundos / 60).toFixed(2) + " min";
    }

    resultados.push({
        funcion: nombre,
        entrada: entrada || "10.000 ventas",
        tiempoMs: tiempo.toFixed(6),
        proyeccion
    });
}

console.log("\nINFORME DE RENDIMIENTO");
console.table(resultados);

// Tabla Markdown para copiar en RENDIMIENTO.md.
console.log("\nTABLA PARA EL INFORME:\n");
console.log("| Función | Entrada medida | Tiempo medido (ms) | Proyección 1.000.000 |");
console.log("|---|---|---:|---:|");

for (const fila of resultados) {
    console.log(
        `| ${fila.funcion} | ${fila.entrada} | ${fila.tiempoMs} | ${fila.proyeccion} |`
    );
}
