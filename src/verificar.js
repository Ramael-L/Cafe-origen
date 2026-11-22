// Importamos los datos de las ventas
const ventas = require("./datos.js");

// Importamos las funciones originales y las nuevas
const {
    totalVendido,
    totalVendidoM,
    unidadesVendidas,
    unidadesVendidasM,
    ventasPorCiudad,
    ventasPorCiudadM,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor
} = require("./analitica.js");

// Función para comparar resultados.
function comparar(nombre, original, nuevo) {

    if (original === nuevo) {
        console.log(nombre, "OK");
    } else {
        console.log(nombre, "DIFERENTE");
    }

}

// Comparamos el total vendido.
comparar(
    "Total vendido:",
    totalVendido(ventas),
    totalVendidoM(ventas)
);

// Comparamos las unidades vendidas.
comparar(
    "Unidades vendidas:",
    unidadesVendidas(ventas),
    unidadesVendidasM(ventas)
);

// Comparamos las ventas de Medellín.
comparar(
    "Ventas Medellín:",
    ventasPorCiudad(ventas, "medellin"),
    ventasPorCiudadM(ventas, "medellin")
);

// Guardamos el orden original de las ventas.
const ordenAntes = ventas.map(venta => venta.id).join(",");


// Comprobamos las ventas agrupadas por ciudad.
console.log("\nVENTAS POR CIUDAD");

const ciudades = totalPorCiudad(ventas);
console.log(ciudades);

comparar("Cantidad de ciudades:", Object.keys(ciudades).length, 4);
comparar("Medellín:", ciudades["Medellín"], 356000);
comparar("Bogotá:", ciudades["Bogotá"], 276000);
comparar("Cali:", ciudades["Cali"], 185000);
comparar("Pereira:", ciudades["Pereira"], 168000);


// Comprobamos las unidades por producto.
console.log("\nUNIDADES POR PRODUCTO");

const productos = unidadesPorProducto(ventas);
console.table(productos);

const sumaUnidades = Object.values(productos).reduce((total, cantidad) => {
    return total + cantidad;
}, 0);

comparar("Total unidades agrupadas:", sumaUnidades, 21);


// Comprobamos el ranking de productos.
console.log("\nTOP 3 PRODUCTOS");

const top3 = topProductosPorValor(ventas, 3);
console.table(top3);

comparar("Cantidad en el ranking:", top3.length, 3);
comparar("Primer producto:", top3[0].producto, "Origen Huila 500 g");
comparar("Segundo producto:", top3[1].producto, "Origen Sierra 500 g");
comparar("Tercer producto:", top3[2].producto, "Prensa francesa");

comparar("Valor primer producto:", top3[0].total, 294000);
comparar("Valor segundo producto:", top3[1].total, 225000);
comparar("Valor tercer producto:", top3[2].total, 190000);


// Comprobamos que no cambiamos el arreglo original.
const ordenDespues = ventas.map(venta => venta.id).join(",");

comparar("Orden original de ventas:", ordenAntes, ordenDespues);
