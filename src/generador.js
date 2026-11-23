const productos = [
    {
        nombre: "Origen Huila 500 g",
        precio: 42000
    },
    {
        nombre: "Origen Nariño 250 g",
        precio: 26000
    },
    {
        nombre: "Origen Sierra 500 g",
        precio: 45000
    },
    {
        nombre: "Prensa francesa",
        precio: 95000
    },
    {
        nombre: "Molino manual",
        precio: 120000
    }
];

const ciudades = [
    "Medellín",
    "Bogotá",
    "Cali",
    "Pereira"
];


function generarVentas(n) {

    if (!Number.isInteger(n) || n < 0) {
        throw new Error("n debe ser un entero mayor o igual a cero");
    }

    const ventas = [];

    const maxClientes = Math.max(1, Math.floor(n / 3));

    for (let i = 0; i < n; i++) {

        const posicionProducto = Math.floor(Math.random() * productos.length);
        const posicionCiudad = Math.floor(Math.random() * ciudades.length);

        const productoElegido = productos[posicionProducto];
        const ciudadElegida = ciudades[posicionCiudad];

        const cantidad = Math.floor(Math.random() * 5) + 1;
        const numeroCliente = Math.floor(Math.random() * maxClientes) + 1;
        const dia = Math.floor(Math.random() * 30) + 1;

        const nuevaVenta = {
            id: i + 1,
            fecha: `2026-09-${String(dia).padStart(2, "0")}`,
            cliente: `C${String(numeroCliente).padStart(2, "0")}`,
            producto: productoElegido.nombre,
            ciudad: ciudadElegida,
            cantidad: cantidad,
            precio: productoElegido.precio
        };

        ventas.push(nuevaVenta);
    }

    return ventas;
}

module.exports = { generarVentas };

// Solo ejecutamos esta prueba al abrir este archivo directamente.
if (require.main === module) {
    const prueba = generarVentas(100);

    console.table(prueba);
    console.log("Cantidad de ventas generadas:", prueba.length);
}
