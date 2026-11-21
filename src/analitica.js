//const ventas = require("./datos.js");


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

//iniciando el minireto 3

// Calcula el total vendido utilizando reduce.
function totalVendidoM(ventas) {

    return ventas.reduce((total, venta) => {
        return total + valorVenta(venta);
    }, 0);

}

// Calcula las unidades vendidas utilizando métodos.
function unidadesVendidasM(ventas) {

    return ventas
        .map(venta => venta.cantidad)
        .reduce((total, cantidad) => {
            return total + cantidad;
        }, 0);

}

// Calcula el total de una ciudad utilizando métodos.
function ventasPorCiudadM(ventas, ciudad) {

    const ciudadBuscada = normalizarCiudad(ciudad);

    return ventas
        .filter(venta => {
            return normalizarCiudad(venta.ciudad) === ciudadBuscada;
        })
        .reduce((total, venta) => {
            return total + valorVenta(venta);
        }, 0);

}



// Agrupa el dinero vendido por cada ciudad.
function totalPorCiudad(ventas) {

    const totales = {};
    const nombres = {};

    for (const venta of ventas) {

        const clave = normalizarCiudad(venta.ciudad);

        if (totales[clave] === undefined) {
            totales[clave] = 0;
            nombres[clave] = venta.ciudad.trim();
        }

        totales[clave] += valorVenta(venta);
    }

    const resultado = {};

    for (const entrada of Object.entries(totales)) {

        const clave = entrada[0];
        const total = entrada[1];

        resultado[nombres[clave]] = total;
    }

    return resultado;
}

// Agrupa las unidades vendidas por producto.
function unidadesPorProducto(ventas) {

    const productos = {};

    for (const venta of ventas) {

        const producto = venta.producto;

        if (productos[producto] === undefined) {
            productos[producto] = 0;
        }

        productos[producto] += venta.cantidad;
    }

    return productos;
}

// Encuentra los productos que más dinero generaron.
function topProductosPorValor(ventas, k) {

    const totales = {};

    // Acumulamos el dinero por producto.
    for (const venta of ventas) {

        const producto = venta.producto;

        if (totales[producto] === undefined) {
            totales[producto] = 0;
        }

        totales[producto] += valorVenta(venta);
    }

    // Convertimos el objeto en un arreglo.
    const ranking = Object.entries(totales).map(entrada => {
        return {
            producto: entrada[0],
            total: entrada[1]
        };
    });

    // Creamos una copia para ordenar.
    const copia = [...ranking];

    // Ordenamos de mayor a menor.
    copia.sort((a, b) => {
        return b.total - a.total;
    });

    // Devolvemos los primeros k productos.
    return copia.slice(0, k);
}


module.exports = {
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    normalizarCiudad,
    ventasPorCiudad,
    totalVendidoM,
    unidadesVendidasM,
    ventasPorCiudadM,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor
};


