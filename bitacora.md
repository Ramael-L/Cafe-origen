# Bitácora - Café Origen

## MiniReto 1

### Diccionario de datos

| Propiedad | Tipo | Significado |
|-----------|------|-------------|
| id | Number | Identificador de la venta |
fecha - string - fecha en la que se realizo 
cliente - string - Codigo que indefica al cliente 
producto - string - Nombre del producto vendido
Ciudad - string - Ciudad en la que se realizo la venta
Cantidad - Number - Cantidad de unidades registradas
Precio - Number - Precio de una unidad del producto en pesos colombianos 


Identificador de casos borde

estos casos son situaciones especiales que se deben tener en cuenta para que nuestro programa no produzca resultados incorrectos 
por ejemplo con los Arrays de datos.js 

Caso / Problema / Decision 
Ciudades / Medellin y medellin se estan escribiendo diferente / Ignorar diferencias de mayusculas y espacios al comparar 
Cantidades / La venta con id: 8 tiene cantidad 0. / conservar el registro pero no contarlo como una compra valida para el ticket promedio
Clientes / el cloente c01 aparece varias veces / Mantener sus compras por que un mismo cliente puede comprar varias veces

Plan de cada indicador

Valor de una venta: 
primero creamos la funcion valorventa despues entre parentesis ponemos el nombre del Array que seria ventas luego lo que queremos que nos retorne para esto debemos poner el array con un punto y despues el valor que queremos ver esto lo llama luego un asterisco que significa multiplicacion lo mismo con el otro valor que queremos multiplicar y seria asi : return venta.cantidad*venta.precio 

Total vendido: 
creamos la funcion totalvendido luego entre parentesis el array luego 

Unidades vendidas: 
Venta mayor:
ticket promedio:

