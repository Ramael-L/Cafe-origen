const ventas = require("./datos.js");

// Calcula el valor de una venta
function valorVenta(venta) {
    return venta.cantidad * venta.precio;
}

// Calcula el dinero total vendido
function totalVendido(ventas) {
    let total = 0;

    for (const venta of ventas) {
        total += valorVenta(venta);
    }

    return total;
}

// Mestra las unidades vendidas 
function unidadesVendidas(ventas) {
    let unidades = 0;

    for (const venta of ventas) {
        unidades += venta.cantidad;
    }

    return unidades;
}

// Encuentra la venta de mayor valor
function ventaMayor(ventas) {
    let mayor = null;

    for (const venta of ventas) {
        if (mayor === null || valorVenta(venta) > valorVenta(mayor)) {
            mayor = venta;
        }
    }

    return mayor;
}

// Calcula el ticket promedio
function ticketPromedio(ventas) {
    let total = 0;
    let contador = 0;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            total += valorVenta(venta);
            contador++;
        }
    }

    if (contador === 0) {
        return 0;
    }

    return total / contador;
}

// Los console longs indicados para ver las pruebas 
console.log("Valor primera venta:", valorVenta(ventas[0]));

console.log("Total vendido:", totalVendido(ventas));

console.log("Unidades vendidas:", unidadesVendidas(ventas));

console.log("Venta mayor:", ventaMayor(ventas));

console.log("Ticket promedio:", ticketPromedio(ventas));

console.table(ventas)

