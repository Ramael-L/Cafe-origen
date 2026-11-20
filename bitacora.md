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
primero creamos la funcion valorventa despues entre parentesis ponemos el nombre del Array que seria ventas luego lo que queremos que nos retorne para esto debemos poner el array con un punto y despues el valor que queremos ver esto lo llama luego un asterisco que significa multiplicacion lo mismo con el otro valor que queremos multiplicar y seria asi : return venta.cantidad*venta.precio y para que me lo muestre en consola seria console.log("valor primera venta:", valorVenta(venta[1])) lo que esta ""es la palabra que nos retronada luego el valorVenta es la funcion despues (es el array [] lo que este adentro del recuadro es la pocision que vamos a tomar en cuenta para nos diga el valor de si venta)

Total vendido: 
creamos la funcion totalvendido luego entre parentesis el array luego le ponemos let total = 0; por que es el inicio de nuestro contador y se pone let por que es una variable que puede cambiar luego ponemos el inicio del ciclo con for y entre () lo que queremos que pase Const que es una variable que no puede cambiar luego escribimos const venta of ventas que significa que tome venta de las ventas que es el array of es igual a de luego que sume el valor actual y guarde como el nuevo valor y le da el nombre de total despues se reutiliza la funcion antigua Valor venta que si recordamos multiplica la variable cantidad por la variable precio  juntando todo esto le pedimos que nos retrone total - return total;
 
Unidades vendidas:
 en los ejercicios donde se repitan cosas las omitire para no hacer tan larga la explicacion pero aca tambien utilizamos let unidades = 0 ; o un contador que inicia desde 0 luego un for osea sin cicilo que comieza con const venta of ventas despues unidades += venta.cantidad y le pedimos que nos retorne unidades

Venta mayor:
aqui comezamos creando la funcion luego tomando el array en el cual vamos a aplicar la funcion despues utilizamos el if que significa si cumple una condicion que pase esto en este caso primero escribimos if (ventas.length === 0) que significa ventas es el array luego.length es que va a pasar por cada uno de los elementos del array y esta el === que compara si dos valores son estricatemnte iguales esto quiere decir que si en el array no hay valores nos retorna null

despues para calcular la mayor venta utilizamos el mismo metodo del contador let mayor = ventas [0] le estamos diciendo que comieze desde la pocision 1 y tambien le damos algo que comparar para despues  luego usamos un for const venta of ventas que es para tome el valor venta del array ventas luego nos pone un if que significa si cumple una condicion escrito todo seria if (valorventa(venta)>valorventa(mayor)) { mayor = venta;}
y esto significa si el dinero es mayor al que anteriormente defini lo remplace 


ticket promedio: 
primero definimos el contador con dos variables que son total y contador , total guarda el dinero acumulado y el contador guarde cuantas ventas validas encontramos comienzan en 0 por que aun no iniciamos a buscar luego sige el const venta of ventas que en mis palabras creamos una varibale de ventas que se llama venta lo que hace es representar una venta luego sige el if(venta.cantidad > 0)
que significa si la cantidad de productos de esta venta es mayor que cero ejecuta lo sigiente despues tenemos el total += valorVenta(venta) que significa calcula el dinero que te dio esta venta y sumalo al dinero que ya tengo acumulado pero un dato importante es que valorVenta es la primera funcion que declaramos luego sige el contador++ que le sume en uno la cantidad de vueltas que da si encuentra un dato y despues le damos un limite con if (contador===0) { y que nos retorne 0;}
y despues que nos retorne el total/ y el contador pero algo clave esque esto "/" signica que divida el total y el contador 

Ventas totales de una ciudad:


