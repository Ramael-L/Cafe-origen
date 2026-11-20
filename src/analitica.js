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



// Encuentra la venta que generó más dinero.
function ventaMayor(ventas) {

    // Si no hay ventas, devolvemos null.
    if (ventas.length === 0) {
        return null;
    }

    // Comenzamos suponiendo que la primera venta es la mayor.
    let mayor = ventas[0];

    // Recorremos todas las ventas.
    for (const venta of ventas) {

        // Comparamos el valor de cada venta.
        if (valorVenta(venta) > valorVenta(mayor)) {
            mayor = venta;
        }
    }

    // Devolvemos el objeto completo.
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


function normalizarCiudad(ciudad) {
    return ciudad
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

// Calcula el total vendido en cualquier ciudad.
function ventasPorCiudad(ventas, ciudad) {
    let total = 0;

    const ciudadBuscada = normalizarCiudad(ciudad);

    for (const venta of ventas) {
        const ciudadVenta = normalizarCiudad(venta.ciudad);

        if (ciudadVenta === ciudadBuscada) {
            total += valorVenta(venta);
        }
    }

    return total;
}



// Los console longs indicados para ver las pruebas 
console.log("Valor primera venta:", valorVenta(ventas[1]));

console.log("Total vendido:", totalVendido(ventas));

console.log("Unidades vendidas:", unidadesVendidas(ventas));

console.log("Venta mayor:", ventaMayor(ventas));

console.log("Ticket promedio:", ticketPromedio(ventas));


//pruebas que demuestran que ignora caracteres especiales 
console.log("Medellín:", ventasPorCiudad(ventas, "medellin"));

console.log("Bogotá:", ventasPorCiudad(ventas, "BOGOTA"));

console.log("Cali:", ventasPorCiudad(ventas, "cali"));

console.log("Pereira:", ventasPorCiudad(ventas, "pereira"));


 




