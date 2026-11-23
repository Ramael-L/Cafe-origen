
const { generarVentas } = require("./generador.js");

const { clientesRecurrentes } = require("./recurrentes.js");

// Cantidades de ventas que vamos a probar.
const tamanos = [1000, 2000, 4000, 8000, 16000];

// Aquí guardaremos los resultados.
const resultados = [];

for (const n of tamanos) {

    const ventas = generarVentas(n);

    const etiqueta = `Prueba con ${n} ventas`;

    // Comenzamos a medir el tiempo.
    console.time(etiqueta);
    const inicio = process.hrtime.bigint();

    // Ejecutamos la función que queremos analizar.
    clientesRecurrentes(ventas);

    const fin = process.hrtime.bigint();
    console.timeEnd(etiqueta);

    // Convertimos el tiempo de nanosegundos a milisegundos.
    const tiempo = Number(fin - inicio) / 1000000;

    resultados.push({
        ventas: n,
        milisegundos: Number(tiempo.toFixed(3))
    });
}

// Mostramos los resultados en una tabla.
console.log("\nTIEMPOS DE CLIENTES RECURRENTES");
console.table(resultados);

// Utilizamos la última medición para estimar otros tamaños.
const tiempo16000 = resultados[resultados.length - 1].milisegundos;

const estimacion100000 = tiempo16000 * (100000 / 16000) ** 2;
const estimacion1000000 = tiempo16000 * (1000000 / 16000) ** 2;

console.log(
    "Estimación para 100.000 ventas:",
    (estimacion100000 / 1000).toFixed(2),
    "segundos"
);

console.log(
    "Estimación para 1.000.000 de ventas:",
    (estimacion1000000 / 60000).toFixed(2),
    "minutos"
);

console.log(
    "¿Conviene probar 100.000 ventas?",
    estimacion100000 < 120000 ? "Sí, estimación menor a 2 minutos" : "No, estimación mayor o igual a 2 minutos"
);

if (estimacion100000 < 120000) {

    console.log("Probando con 100.000 ventas...");

    const ventasGrandes = generarVentas(100000);

    console.time("100.000 ventas");

    clientesRecurrentes(ventasGrandes);

    console.timeEnd("100.000 ventas");

} else {

    console.log("No ejecutamos 100.000 ventas.");
    console.log("La estimación supera los 2 minutos.");

}
