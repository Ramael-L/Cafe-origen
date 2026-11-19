const ventas = require("./datos.js");


//Lee todo el arreglo y me dice cuantos datos hay
console.log("Cantidad de ventas:", ventas.length);

//me da todos los datos en la posicion 1 
console.log("Primera venta:", ventas[0]);

//estamos pidiendo el registro de la posicion 4
console.log("cuarta venta", ventas[3]);

//me muestra los datos en una tabla 
console.table(ventas);
