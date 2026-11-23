
const { generarVentas } = require("./generador.js");

const {
    totalVendidoContado,
    ventaMayorContada,
    totalPorCiudadContado,
    primeraVentaContada
} = require("./instrumentadas.js");

// Tamaños que pide el profesor.
const tamanos = [100, 1000, 10000, 100000];

// Aquí guardaremos las mediciones.
const resultados = [];

for (const n of tamanos) {

    const ventas = generarVentas(n);

    const contadorTotal = { operaciones: 0 };
    const contadorMayor = { operaciones: 0 };
    const contadorCiudades = { operaciones: 0 };
    const contadorPrimera = { operaciones: 0 };

    totalVendidoContado(ventas, contadorTotal);
    ventaMayorContada(ventas, contadorMayor);
    totalPorCiudadContado(ventas, contadorCiudades);
    primeraVentaContada(ventas, contadorPrimera);

    resultados.push({
        n: n,
        totalVendido: contadorTotal.operaciones,
        ventaMayor: contadorMayor.operaciones,
        totalPorCiudad: contadorCiudades.operaciones,
        primeraVenta: contadorPrimera.operaciones
    });
}

console.log("MEDICIÓN DE OPERACIONES - CAFÉ ORIGEN");
console.table(resultados);
