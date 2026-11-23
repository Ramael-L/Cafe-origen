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
primer prototipo 
//esto esta mal por que solo toma las ciudades que tienen los mismos caracteres entonces no es efeciente para lo que nos esta pidiendo 
//function ventasPorCiudad(ventas, ciudad) 
  //const ciudadBuscada = ciudad.trim().toLowerCase();

    //for (const venta of ventas) {
        //const ciudadVenta = venta.ciudad.trim().toLowerCase();

        //if (ciudadVenta === ciudadBuscada) {
         //   total += valorVenta(venta);
        //}
    //}

    //return total;


    //creamos la funcion que normaliza el nombre de todas las ciudades para que se pueda leer bien el proceso

como este no funciono aplicamos este creamos dos funciones la primera ponemos el nombre de la funcion luego el valor que queremos aplicar la funcion despues en el return lo que queremos que nos retorne  despues abajo especifamos lo que queremos que tenga en cuenta en el retorno que en este caso es:

trim : elimina espacios sobrantes al principio y al final del texto 
toLowercase(): convierte las letras a minusculas 
normalize("NDF"): separa las letras de sus tildes
replace(/[\u0300-\u036f]/g, ""):busca las marcas de acentuacion para eliminarlas 

luego creamos la funcion ventasporciudad(que toma dos parametros ventas , ciudad)
despues iniciamos el contador en 0 con let y creamos una variable total 
luego creamos un const ciudadBuscada = normalizarCiudad(ciudad); 
que traducido seria reutilizar las variables ciudadventa y normalizarciudad luego entre parentesis tenemos la variable venta y el . ciudad que nos permite acceder a la propiedad ciudad luego el if osea si cumple esta propiedad ciudadventa === ciudadbuscada que traducido seria si son exactamente iguales sume el valor acual y lo guarde al nuevo resultado hasta que termine los datos del array


mini reto 3 

Debemos utilizar 
map(), Tr
filter(), 
reduce(), sort()
slice(), 
Object.entries() 

Al finalizar, el programa debe mostrar las mismas cantidades que obtuvimos en el MiniReto 2 y conservar intacto el arreglo original. 


 MiniReto 3 — Explicación de las funciones de JavaScript
Conceptos nuevos

En este MiniReto aprendí que no siempre necesito utilizar `for...of` para recorrer los arreglos. JavaScript tiene métodos que me ayudan a realizar diferentes operaciones.
`map()` sirve para transformar los elementos de un arreglo y crear uno nuevo.
`filter()` sirve para seleccionar los elementos que cumplen una condición.
`reduce()` sirve para recorrer un arreglo y acumular un resultado. El `0` que ponemos al final representa el valor inicial del acumulador.

También aprendí que `=>` se utiliza para crear funciones flecha, que son otra manera de escribir funciones en JavaScript.

 totalVendidoM(ventas)

Esta función calcula cuánto dinero se vendió en total utilizando `reduce()`.
Primero recibe el arreglo de ventas y después lo recorre. Dentro de `reduce()` aparecen dos parámetros: `total`, que guarda el dinero acumulado, y `venta`, que representa el registro que estamos revisando.
Luego utilizamos `valorVenta(venta)`, una función que ya habíamos creado para multiplicar la cantidad por el precio. El resultado se suma al acumulador mediante `return total + valorVenta(venta)`.
Al final colocamos `0` porque queremos que la suma comience desde cero.
Lo que entendí es que `reduce()` hace algo parecido a nuestro ciclo `for...of`, pero se encarga de manejar el acumulador y de devolver el resultado final.
Con los datos originales, el total esperado es **985000 pesos**.


unidadesVendidasM(ventas)

Esta función calcula cuántas unidades se vendieron utilizando `map()` y `reduce()`.
Primero utilizamos `map(venta => venta.cantidad)`. Esto recorre las ventas y obtiene solamente la cantidad de cada una, creando un arreglo nuevo con esos números.
Después utilizamos `reduce()` para sumar las cantidades que obtuvimos.
En `reduce((total, cantidad) => ...)`, `total` representa las unidades acumuladas y `cantidad` representa el número que estamos sumando en esa vuelta.
Con esta función aprendí que puedo encadenar métodos: primero transformo los datos con `map()` y después los acumulo con `reduce()`.
El resultado esperado con las 12 ventas es **21 unidades**.


ventasPorCiudadM(ventas, ciudad)
Esta función calcula el dinero vendido en una ciudad específica utilizando `filter()` y `reduce()`.
Recibe dos parámetros: `ventas`, que contiene los registros, y `ciudad`, que indica cuál queremos buscar.
Primero utilizamos `normalizarCiudad(ciudad)` para evitar problemas con las mayúsculas, los espacios y las tildes.
Después `filter()` recorre las ventas y selecciona solamente los registros cuya ciudad coincida con la ciudad buscada. Para comparar utilizamos `===`, que comprueba si dos valores son estrictamente iguales.
Cuando ya tenemos las ventas de esa ciudad, `reduce()` suma sus valores monetarios utilizando `valorVenta()`.
Con esta función aprendí que `filter()` selecciona los datos y `reduce()` los acumula.
El resultado esperado para Medellín es **356000 pesos**


totalPorCiudad(ventas)

Esta función calcula cuánto dinero se vendió en cada ciudad automáticamente, sin tener que buscar una ciudad por separado.
Primero creamos dos objetos vacíos: `totales` y `nombres`. El primero guarda el dinero acumulado y el segundo conserva los nombres que queremos mostrar.
Después recorremos las ventas con `for...of` y utilizamos `normalizarCiudad()` para crear una clave que identifique cada ciudad.
La condición `totales[clave] === undefined` comprueba si todavía no existe un acumulador para esa ciudad. Si no existe, lo creamos comenzando en cero.
Luego utilizamos `totales[clave] += valorVenta(venta)` para sumar el dinero de cada registro a su ciudad correspondiente.
Después creamos otro objeto llamado `resultado` y utilizamos `Object.entries(totales)` para convertir las propiedades del objeto en parejas de clave y valor.
Con `entrada[0]` obtenemos la clave y con `entrada[1]` obtenemos el dinero acumulado. Finalmente utilizamos los nombres guardados para construir el resultado que vamos a devolver.
Lo que aprendí es que un objeto puede funcionar como un diccionario, donde cada ciudad tiene su propio acumulador.
El resultado esperado son cuatro ciudades: Medellín, Bogotá, Cali y Pereira.



unidadesPorProducto(ventas)

Esta función agrupa las ventas por producto y calcula cuántas unidades se vendieron de cada uno.
Primero creamos un objeto vacío llamado `productos`.
Después recorremos todas las ventas con `for...of` y guardamos el nombre del producto de cada registro en una variable.
La condición `productos[producto] === undefined` comprueba si todavía no hemos registrado ese producto. Si es la primera vez que aparece, creamos su acumulador en cero.
Luego utilizamos `productos[producto] += venta.cantidad` para sumar las unidades de la venta actual al total que llevamos de ese producto.
Al finalizar devolvemos el objeto completo con las cantidades.
Aprendí que puedo utilizar las propiedades de un objeto como acumuladores diferentes. En esta función agrupamos por producto y sumamos unidades, mientras que en `totalPorCiudad()` agrupamos por ciudad y sumamos dinero.
Con nuestros datos, la suma de todas las unidades debe ser **21**.


topProductosPorValor(ventas, k)

Esta función obtiene los productos que más dinero generaron y los ordena de mayor a menor.
Recibe dos parámetros: `ventas`, que contiene los registros, y `k`, que indica cuántos productos queremos mostrar. Por ejemplo, si `k` vale `3`, queremos obtener los tres primeros.
Primero creamos un objeto llamado `totales`. Después recorremos las ventas y acumulamos el dinero generado por cada producto utilizando `valorVenta()`.
Cuando terminamos de agrupar, utilizamos `Object.entries(totales)` para convertir el objeto en un arreglo. Luego usamos `map()` para transformar cada pareja en un objeto con dos propiedades: `producto` y `total`.
Después aparece `const copia = [...ranking]`. Los tres puntos son el operador de propagación y permiten crear una copia superficial del arreglo.
Utilizamos esta copia porque `sort()` modifica el orden del arreglo donde se ejecuta.
La instrucción `sort((a, b) => b.total - a.total)` ordena los productos de mayor a menor según el dinero generado.
Finalmente utilizamos `slice(0, k)` para obtener los primeros productos del arreglo ordenado.
Lo que más me costó entender fue cómo trabajaban juntos `Object.entries()`, `map()`, `sort()` y `slice()`. Ahora comprendo que primero agrupamos los datos, después los transformamos, luego los ordenamos y finalmente seleccionamos los resultados que necesitamos.
Con nuestros datos, los tres productos que más dinero generaron deben ser Origen Huila 500 g, Origen Sierra 500 g y Prensa francesa.



 module.exports

Al final de `analitica.js` utilizamos `module.exports` para compartir nuestras funciones con otros archivos del proyecto.
Esto no ejecuta las funciones. Solamente permite que archivos como `verificar.js` o `reporte.js` puedan importarlas utilizando `require()`.
Aprendí que separar las funciones de las pruebas ayuda a mantener el proyecto más organizado, porque podemos reutilizar el mismo código desde diferentes archivos.

 MiniReto 3  Métodos de arreglos y agrupaciones

En este reto aprendí a utilizar nuevos métodos de JavaScript para trabajar con arreglos sin depender siempre de los ciclos `for...of`.

1. totalVendidoM

- Recorro todas las ventas.
- No necesito filtrar.
- Transformo cada venta en su valor monetario.
- Acumulo el dinero usando `reduce()`.
- No necesito agrupar.

 2. unidadesVendidasM

- Recorro todas las ventas.
- No necesito filtrar.
- Utilizo `map()` para obtener las cantidades.
- Utilizo `reduce()` para sumar las unidades.
- No necesito agrupar.

 3. ventasPorCiudadM

- Recorro las ventas.
- Utilizo `filter()` para seleccionar una ciudad.
- Normalizo los nombres y calculo el valor de las ventas.
- Utilizo `reduce()` para sumar el dinero.
- No necesito crear grupos porque busco una ciudad específica.

 4. totalPorCiudad

- Recorro todas las ventas.
- No filtro ninguna ciudad.
- Normalizo los nombres.
- Acumulo el dinero vendido.
- Agrupo los resultados por ciudad.

 5. unidadesPorProducto

- Recorro todas las ventas.
- No necesito filtrar.
- Obtengo el nombre de cada producto.
- Acumulo las cantidades.
- Agrupo las unidades por producto.

 6. topProductosPorValor

- Recorro todas las ventas.
- Selecciono los primeros productos después de ordenarlos.
- Convierto los totales en un arreglo utilizando `Object.entries()` y `map()`.
- Acumulo el dinero por producto.
- Agrupo los valores por producto y los ordeno usando `sort()`.



 MiniReto 3 — Verificación de resultados
 ¿Para qué sirve verificar.js?
En este archivo utilizamos las funciones que creamos en analitica.js para comprobar que las nuevas versiones funcionan correctamente.
Primero importamos las ventas con require y después las funciones que queremos comparar.
Creamos una función llamada comparar que recibe tres parámetros: nombre, original y nuevo.
Utilizamos if y el operador === para comprobar si los resultados son iguales. Si coinciden mostramos OK y si no coinciden mostramos DIFERENTE.
Comprobación de las funciones

Total vendido: comparamos la función original con la versión que utiliza reduce. Ambas deben devolver 985000 pesos.
**Unidades vendidas: comparamos la función original con la versión que utiliza map y reduce. Ambas deben devolver 21 unidades.
Ventas por ciudad: comparamos las dos versiones utilizando Medellín. Ambas deben devolver 356000 pesos.
Agrupaciones por ciudad
Utilizamos totalPorCiudad para obtener el dinero generado en cada ciudad.
El resultado esperado es:

| Ciudad | Total vendido |
|---|---:|
| Medellín | 356000 |
| Bogotá | 276000 |
| Cali | 185000 |
| Pereira | 168000 |

Utilizamos Object.keys().length para comprobar que solamente existen cuatro ciudades y que no se generan grupos duplicados.

Unidades por producto
Utilizamos unidadesPorProducto para agrupar las cantidades de cada producto.
El total esperado es de 21 unidades distribuidas entre cinco productos.
Aprendí que Object.values() permite obtener los valores de las propiedades de un objeto y que podemos utilizar reduce para sumar esas cantidades.

Ranking de productos
Utilizamos topProductosPorValor para encontrar los tres productos que más dinero generaron.
El resultado esperado es:

| Producto | Total |
|---|---:|
| Origen Huila 500 g | 294000 |
| Origen Sierra 500 g | 225000 |
| Prensa francesa | 190000 |

También debemos comprobar que el arreglo original conserva su orden después de ejecutar las funciones.

Conclusión
 este MiniReto aprendí que no basta con escribir una función. También debemos comprobar que devuelve los resultados esperados.
Comprendí que los métodos map, filter y reduce permiten realizar operaciones similares a las que hacíamos con for...of.
La parte que más me costó fue entender cómo se utilizan los objetos para agrupar datos y cómo se combinan Object.entries, map, sort y slice.

arreglos y selección aleatoria

En este ejercicio comenzamos a crear un generador de ventas que nos permitirá trabajar con más registros sin tener que escribirlos manualmente.
Primero creamos un arreglo llamado productos donde guardamos cinco productos de Café Origen. Cada producto es un objeto que tiene dos propiedades: nombre y precio.
También creamos un arreglo llamado ciudades que contiene Medellín, Bogotá, Cali y Pereira.
Después aprendimos a utilizar Math.random(), que genera un número decimal aleatorio entre 0 y 1, sin incluir el 1.
Como necesitamos seleccionar una posición del arreglo, multiplicamos ese número por productos.length, que nos devuelve la cantidad de productos.
Luego utilizamos Math.floor() para redondear hacia abajo y obtener un número entero.
Con ese número creamos la variable posicionAleatoria y después la utilizamos para seleccionar un producto del arreglo.
Finalmente mostramos el producto seleccionado utilizando console.log().

Aprendí que los arreglos comienzan en la posición 0, que Math.random() genera números aleatorios y que Math.floor() permite convertir el resultado en un número entero redondeando hacia abajo.
También comprendí que podemos utilizar una variable como posición de un arreglo para obtener un elemento diferente en cada ejecución.
Todavía falta crear la función generarVentas(n), que utilizará estos conceptos para generar varios registros automáticamente.

Después de crear las listas de productos y ciudades, construimos la función generarVentas que recibe un número n y genera esa cantidad de registros.
Utilizamos un ciclo for para repetir el proceso y Math.random junto con Math.floor para elegir productos, ciudades, clientes y cantidades aleatoria.
También utilizamos Math.max para asegurar que exista al menos un cliente y padStart para completar con ceros los números de las fechas y los identificadores de clientes.
En cada vuelta creamos un objeto llamado nuevaVenta con la misma estructura que utilizamos en datos.js.
Después usamos push para agregar ese objeto al arreglo y finalmente return para devolver todas las ventas generadas.
La diferencia con nuestro primer intento es que antes solamente mostrábamos mensajes en consola y ahora realmente guardamos los registros en un arreglo.
Aprendí que un ciclo for nos permite repetir instrucciones sin tener que escribirlas varias veces. Todavía falta agregar los objetos al arreglo utilizando push.

En este punto comenzamos a crear versiones de nuestras funciones que cuentan las operaciones que realizan.
Primero creamos totalVendidoContado, que funciona de manera parecida a totalVendido, pero recibe un segundo parámetro llamado contador.
Este contador es un objeto que tiene una propiedad llamada operaciones, que comienza en cero.
Dentro del ciclo for utilizamos contador.operaciones++ para aumentar el contador cada vez que visitamos una venta.
La función sigue calculando el dinero total utilizando valorVenta, pero ahora también podemos saber cuántas ventas recorrió.
Aprendí que podemos pasar un objeto a una función y modificar sus propiedades desde ella
Predicción antes de medir: si multiplicamos por diez la cantidad de ventas, las operaciones de esta función también deberían multiplicarse por diez, porque recorre cada venta una vez.

Creacion de la ventaMayorContada
En esta función reutilizamos la lógica de ventaMayor para encontrar la venta que generó más dinero, pero agregamos un contador de operaciones.
Primero comprobamos si el arreglo está vacío. Después tomamos la primera venta como la mayor y comenzamos a recorrer las demás desde el índice 1.
En cada vuelta aumentamos el contador dos veces: una por visitar la venta y otra por compararla con la venta mayor.
Si encontramos una venta que generó más dinero, actualizamos la variable mayor.
Con las 12 ventas originales esperamos encontrar la venta número 10 y contar 23 operaciones según las acciones que decidimos medir.
Aprendí que podemos contar el trabajo de una función sin cambiar el resultado que devuelve.

 Función totalPorCiudadContado

En esta función reutilizamos totalPorCiudad, que agrupa las ventas por ciudad y calcula el dinero vendido en cada una.
La diferencia es que ahora recibimos un objeto contador para medir las operaciones.
Primero recorremos las ventas con for...of y aumentamos el contador cuando visitamos cada registro.
Después normalizamos el nombre de la ciudad y contamos la comprobación que hacemos para saber si esa ciudad ya tiene un acumulador.
Cuando terminamos de agrupar, utilizamos Object.entries para recorrer los resultados y contamos cada grupo visitado.
Con los 12 registros originales esperamos obtener cuatro ciudades y 28 operaciones.
Aprendí que podemos agregar contadores a nuestras funciones para estudiar cuánto trabajo hacen sin cambiar sus resultados.


Predicción de operaciones

Antes de medir, considero que totalVendidoContado, ventaMayorContada y totalPorCiudadContado aumentarán sus operaciones aproximadamente diez veces cuando multipliquemos por diez la cantidad de ventas.
Esto sucede porque las tres funciones recorren los registros para calcular los resultados.
En cambio, primeraVentaContada debería realizar siempre una operación, porque solamente consulta la primera posición del arreglo.
Por eso espero que las primeras tres funciones tengan complejidad O(n) y que primeraVentaContada tenga complejidad O(1).


Resultados y clasificación Big O

Al ejecutar las pruebas observamos cómo aumenta el número de operaciones dependiendo de la cantidad de ventas.
totalVendidoContado tiene complejidad O(n), porque recorre cada venta una vez.
ventaMayorContada también tiene complejidad O(n), porque compara cada venta con la mayor encontrada hasta ese momento.
totalPorCiudadContado tiene complejidad O(n) cuando trabajamos con las cuatro ciudades definidas, porque recorre las ventas para agrupar sus valores.
primeraVentaContada tiene complejidad O(1), porque obtiene directamente el primer registro sin recorrer el arreglo.
La diferencia principal es que las funciones O(n) realizan más trabajo cuando aumentan las ventas, mientras que la función O(1) mantiene la misma cantidad de operaciones.
Esto confirma nuestra predicción inicial.

creamos recurrentes.js 

En este ejercicio analizamos una función que busca los clientes que han comprado más de una vez.
La función tiene dos ciclos for anidados. El primero selecciona una venta y el segundo la compara con las ventas siguientes.
También utiliza includes para comprobar que el cliente no esté guardado anteriormente y push para agregarlo al arreglo de clientes recurrentes.
Con los 12 registros originales esperamos encontrar los clientes C01, C02 y C03.
Traza manual
Para comprender cómo funciona, utilizamos cinco ventas con los clientes C01, C02, C01, C03 y C02.
La primera venta realiza cuatro comparaciones, la segunda tres, la tercera dos y la cuarta una. En total son diez comparaciones.
Aprendimos que la cantidad de comparaciones entre pares se puede calcular con la fórmula n(n - 1) / 2.
Por eso los ciclos anidados tienen complejidad O(n²), ya que el número de comparaciones crece mucho más rápido que la cantidad de ventas.
Todavía debemos medir el tiempo de ejecución para comprobar cómo afecta este crecimiento al rendimiento del programa.


Pruebas de tiempo 
PS C:\Users\Ramael\Cafe-origen\src> node medir-recurrentes.js
Prueba con 1000 ventas: 6.239ms
Prueba con 2000 ventas: 17.14ms
Prueba con 4000 ventas: 68.109ms
Prueba con 8000 ventas: 279.767ms
Prueba con 16000 ventas: 1.050s

TIEMPOS DE CLIENTES RECURRENTES
┌─────────┬────────┬──────────────┐
│ (index) │ ventas │ milisegundos │
├─────────┼────────┼──────────────┤
│ 0       │ 1000   │ 6.23         │
│ 1       │ 2000   │ 17.118       │
│ 2       │ 4000   │ 68.089       │
│ 3       │ 8000   │ 279.744      │
│ 4       │ 16000  │ 1049.571     │
└─────────┴────────┴──────────────┘
Estimación para 100.000 ventas: 41.00 segundos
Estimación para 1.000.000 de ventas: 68.33 minutos
¿Conviene probar 100.000 ventas? Sí, estimación menor a 2 minutos

En este punto utilizamos el generador del MiniReto 5 para crear conjuntos de ventas de distintos tamaños.
Después ejecutamos clientesRecurrentes con 1.000, 2.000, 4.000, 8.000 y 16.000 registros.
Utilizamos console.time y console.timeEnd para observar cuánto tarda cada ejecución. También guardamos las mediciones en un arreglo y las mostramos utilizando console.table.
La función utiliza dos ciclos for anidados, por lo que esperamos que al duplicar las ventas aumente considerablemente el tiempo de ejecución.
aquí agregaremos la tabla con los tiempos reales obtenidos.
utilizamos el tiempo medido con 16.000 ventas para estimar cuánto podría tardar con 100.000 y 1.000.000 de registros.
Estas estimaciones nos ayudarán a decidir si es conveniente ejecutar una prueba más grande.


Análisis final de rendimiento

En este ejercicio analizamos por qué la función clientesRecurrentes se vuelve lenta cuando aumentamos la cantidad de ventas.
La función utiliza dos ciclos for anidados que comparan cada venta con las siguientes.
Con 1.000 ventas realiza 499.500 comparaciones entre pares y con 2.000 ventas realiza 1.999.000. Esto demuestra que al duplicar los registros, las comparaciones aumentan aproximadamente cuatro veces.
Los ciclos tienen complejidad O(n²).
También encontramos un costo adicional en includes, porque este método recorre el arreglo de clientes recurrentes para comprobar si un cliente ya fue agregado. En el peor caso, este trabajo puede aumentar la complejidad total hasta O(n³).

Mediciones reales

Debemos registrar los tiempos obtenidos con 1.000, 2.000, 4.000, 8.000 y 16.000 ventas.
También debemos registrar las estimaciones para 100.000 y 1.000.000 de ventas, calculadas con nuestros resultados.
Conclusión para la gerente
El reporte se vuelve lento porque compara muchas ventas entre sí y repite búsquedas para encontrar clientes que ya habían sido identificados.
Cuando aumenta la cantidad de ventas, aumenta mucho más la cantidad de trabajo que realiza el programa.
Para mejorar el rendimiento, en una futura versión podríamos guardar los clientes encontrados en una estructura que permita consultarlos más rápidamente y evitar comparaciones innecesarias.

Estimación para 100.000 ventas: 42.53 segundos
Estimación para 1.000.000 de ventas: 70.88 minutos
¿Conviene probar 100.000 ventas? Sí, estimación menor a 2 minutos
Probando con 100.000 ventas...
100.000 ventas: 1:13.408 (m:ss.mmm)


Tiempo y memoria

En este ejercicio creamos dos funciones que calculan el total vendido en una ciudad.
La primera se llama totalCiudadCadena y utiliza map, filter, map y reduce. Primero normaliza las ciudades, después filtra las ventas que necesitamos, calcula el valor de cada venta y finalmente suma los resultados.

La segunda función se llama totalCiudadUnaPasada y utiliza un solo ciclo for...of. Durante el recorrido comprueba la ciudad y suma el valor de las ventas correspondientes.
Las dos funciones tienen complejidad temporal O(n), pero la primera hace cuatro recorridos de arreglos y crea tres arreglos intermedios.
La primera utiliza memoria adicional O(n), mientras que la segunda utiliza O(1), suponiendo que los textos tienen un tamaño limitado.
Con este ejercicio aprendí que dos funciones pueden tener la misma complejidad temporal, pero utilizar cantidades diferentes de memoria.
La versión de un solo recorrido puede ser más conveniente cuando trabajamos con grandes cantidades de ventas.

Resultado con métodos: 485900000
Resultado con un ciclo: 485900000
¿Los resultados son iguales? true
