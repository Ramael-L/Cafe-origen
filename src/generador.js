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

Math.random ()
const posicionAleatoria = Math.floor(Math.random() * productos.length);

const productoElegido = productos[posicionAleatoria];

console.log(productoElegido);



function generarVentas(n) {

    const ventas = [];

    for (let i = 0; i < n; i++) {
        console.log("Creando venta número:", i + 1);
    }

    return ventas;
}

generarVentas(6);