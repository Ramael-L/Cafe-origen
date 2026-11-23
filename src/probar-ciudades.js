
const { generarVentas } = require("./generador.js");

const {
    totalCiudadCadena,
    totalCiudadUnaPasada
} = require("./ciudades.js");

// Generamos 10.000 ventas.
const ventas = generarVentas(10000);

// Elegimos la ciudad para analizar.
const ciudad = "Medellín";

// Ejecutamos las dos versiones.
const resultadoCadena = totalCiudadCadena(ventas, ciudad);
const resultadoUnaPasada = totalCiudadUnaPasada(ventas, ciudad);

// Mostramos los resultados.
console.log("Resultado con métodos:", resultadoCadena);
console.log("Resultado con un ciclo:", resultadoUnaPasada);

// Comprobamos si son iguales.
console.log("¿Los resultados son iguales?",
    resultadoCadena === resultadoUnaPasada
);
