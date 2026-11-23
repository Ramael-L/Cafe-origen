const { valorVenta, normalizarCiudad } = require("./analitica.js");

function totalVendidoContado(ventas, contador) {

    let total = 0;

    for (const venta of ventas) {

        contador.operaciones++;

        total += valorVenta(venta);
    }

    return total;
}

module.exports = { totalVendidoContado };
function ventaMayorContada(ventas, contador) {

    if (ventas.length === 0) {
        return null;
    }

    let mayor = ventas[0];
    contador.operaciones++;

    for (let i = 1; i < ventas.length; i++) {

        // Contamos la visita a esta venta.
        contador.operaciones++;

        // Contamos la comparación con la venta mayor.
        contador.operaciones++;

        if (valorVenta(ventas[i]) > valorVenta(mayor)) {
            mayor = ventas[i];
        }
    }

    return mayor;
}



function totalPorCiudadContado(ventas, contador) {

    const totales = {};
    const nombres = {};

    for (const venta of ventas) {

        // Contamos cada venta visitada.
        contador.operaciones++;

        const clave = normalizarCiudad(venta.ciudad);

        // Contamos la comprobación de la ciudad.
        contador.operaciones++;

        if (totales[clave] === undefined) {
            totales[clave] = 0;
            nombres[clave] = venta.ciudad.trim();
        }

        totales[clave] += valorVenta(venta);
    }

    const resultado = {};

    for (const entrada of Object.entries(totales)) {

        // Contamos cada grupo visitado.
        contador.operaciones++;

        const clave = entrada[0];
        const total = entrada[1];

        resultado[nombres[clave]] = total;
    }

    return resultado;
}

function primeraVentaContada(ventas, contador) {
    contador.operaciones++;
    return ventas[0] ?? null;
}


module.exports = {
    totalVendidoContado,
    ventaMayorContada,
    totalPorCiudadContado,
    primeraVentaContada
};