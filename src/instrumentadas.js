const { valorVenta } = require("./analitica.js");

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

module.exports = {
    totalVendidoContado,
    ventaMayorContada
};