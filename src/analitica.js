const ventas = require("./datos");

function totalVendido(ventas){
let total = 0;

for (const venta of ventas) {
    total += valorVenta(venta);
    //el += es un acumulador y ateriormente con el let definimos que comieza en 0/
}
return total;
}


//calucula las unidades vendidas 

function unidadesVendidas(ventas){
    let unidades = 0;
//la diferencia con el anterior es que venta tiene .cantidad esto quiere decir que solo va a tomar este dato 
    for (const venta of ventas){
        unidades += venta.cantidad;
    }
    return unidades;
}

console.log (valorVenta(ventas))




//calucla la venta mayor 

function ventamayor(ventas){
    let mayor = null;
 // este operador ||significa O si mayor es ingual a null O valor venta es mayor que valor venta entonces me retorna el mayor  
    for (const venta of ventas){
        if (mayor==null || valorVenta(venta)> valorVenta(mayor))        
    }
return mayor;
}



// Calcula el tiket promerdio 
function ticketPromedio(ventas) {
    let total = 0;
    let contador = 0;


    // el contador ++ es para incrementar el contador en una unidad 
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