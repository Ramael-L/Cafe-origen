# Café Origen — Informe de rendimiento v0.2

## 1. Objetivo

Este informe analiza el rendimiento del motor de analítica de ventas Café Origen.

El propósito es identificar cuánto trabajo realizan las funciones, cuánta memoria adicional necesitan y cuáles pueden presentar problemas cuando aumente la cantidad de ventas.

Utilizamos los resultados de los MiniRetos 5, 6 y 7.

## 2. Clasificación de las funciones

Para el análisis utilizamos las siguientes variables:

- **n:** número de ventas.
- **c:** número de ciudades diferentes.
- **p:** número de productos diferentes.
- **L:** longitud de los textos.

| Función | Qué hace | Tiempo | Espacio | Justificación |
|---|---|---|---|---|
| valorVenta | Calcula el valor de una venta | O(1) | O(1) | Multiplica cantidad por precio |
| totalVendido | Suma el dinero vendido | O(n) | O(1) | Recorre las ventas y acumula el total |
| unidadesVendidas | Suma las unidades | O(n) | O(1) | Recorre las ventas una vez |
| ventaMayor | Encuentra la venta de mayor valor | O(n) | O(1) | Compara cada venta con la mayor encontrada |
| ticketPromedio | Calcula el promedio de las ventas válidas | O(n) | O(1) | Recorre las ventas y mantiene dos acumuladores |
| normalizarCiudad | Normaliza el nombre de una ciudad | O(L) | O(L) | Transforma el texto y genera nuevas cadenas |
| ventasPorCiudad | Calcula el total de una ciudad | O(nL) | O(L) | Recorre las ventas y normaliza las ciudades |
| totalVendidoM | Calcula el total con reduce | O(n) | O(1) | Reduce recorre el arreglo una vez |
| unidadesVendidasM | Suma unidades con map y reduce | O(n) | O(n) | Map crea un arreglo intermedio |
| ventasPorCiudadM | Filtra y suma ventas de una ciudad | O(nL) | O(n) | Filter crea un arreglo con las coincidencias |
| totalPorCiudad | Agrupa dinero por ciudad | O(nL + c) | O(c) | Recorre las ventas y guarda los totales por ciudad |
| unidadesPorProducto | Agrupa las unidades por producto | O(n) | O(p) | Guarda un acumulador por producto diferente |
| topProductosPorValor | Ordena productos por dinero vendido | O(n + p log p) | O(p) | Agrupa las ventas y ordena una copia del ranking |
| clientesRecurrentes | Encuentra clientes con varias compras | O(n²), hasta O(n³) en el peor caso | O(n) | Utiliza ciclos anidados e includes |
| totalCiudadCadena | Calcula ventas por ciudad con métodos | O(nL) | O(n) | Utiliza map, filter, map y reduce |
| totalCiudadUnaPasada | Calcula ventas por ciudad con un ciclo | O(nL) | O(L) | Recorre las ventas una vez sin arreglos intermedios |

Las clasificaciones consideran operaciones sobre objetos y textos. Cuando suponemos nombres de longitud fija, O(nL) se simplifica a O(n), y O(L) se considera O(1).

Las funciones instrumentadas mantienen las mismas complejidades principales que sus versiones originales. El generador utiliza O(n) en tiempo y espacio porque construye n registros.

## 3. Evidencia de operaciones

Para 10.000 ventas, los contadores implementados en el MiniReto 5 producen estos valores esperados:

| Función | Operaciones |
|---|---:|
| totalVendidoContado | 10.000 |
| ventaMayorContada | 19.999 |
| totalPorCiudadContado | 20.004 |
| primeraVentaContada | 1 |

El conteo de totalPorCiudadContado supone que aparecen las cuatro ciudades del catálogo.

Estos valores corresponden a las acciones que decidimos contar en el código, no a todas las instrucciones ejecutadas por JavaScript.

## 4. Mediciones de clientes recurrentes

Los tiempos registrados en las pruebas del MiniReto 6 fueron:

| Ventas | Tiempo |
|---:|---:|
| 1.000 | 6,23 ms |
| 2.000 | 17,118 ms |
| 4.000 | 68,089 ms |
| 8.000 | 279,744 ms |
| 16.000 | 1.049,571 ms |
| 100.000 | 73.408 ms |

Los resultados muestran que el tiempo aumenta rápidamente al incrementar la cantidad de ventas.

## 5. Proyección

A partir de una de las mediciones con 16.000 ventas, estimamos que procesar 1.000.000 de ventas podría tardar aproximadamente **70,88 minutos**, utilizando un modelo de crecimiento cuadrático.

La prueba posterior con 100.000 ventas tardó 73,408 segundos. Si extrapolamos este último resultado mediante el mismo modelo, la estimación aumenta a aproximadamente **122,35 minutos**.

Estas diferencias muestran que las proyecciones no son garantías de ejecución y que necesitamos considerar el costo adicional de includes.

**Pendiente:** incorporar los tiempos medidos con 10.000 ventas para las otras funciones del motor y calcular sus proyecciones hasta 1.000.000 de ventas.

## 6. Riesgos

Ordenamos los riesgos según el crecimiento del trabajo y de la memoria:

1. **Riesgo alto — clientesRecurrentes:** utiliza comparaciones entre pares y búsquedas adicionales, por lo que puede volverse extremadamente lenta.
2. **Riesgo medio — totalCiudadCadena y funciones con map o filter:** mantienen tiempo lineal, pero crean arreglos intermedios que consumen más memoria.
3. **Riesgo medio condicionado — topProductosPorValor:** además de recorrer ventas, ordena los productos; el costo de ordenar aumenta si crece el catálogo.
4. **Riesgo menor — funciones de recorrido único:** totalVendido, ventaMayor y totalCiudadUnaPasada necesitan recorrer las ventas, pero evitan ciclos anidados sobre todo el historial.
5. **Riesgo bajo — operaciones constantes:** valorVenta y primeraVentaContada no necesitan recorrer todas las ventas.

## 7. Plan de optimización

La primera función que deberíamos mejorar es clientesRecurrentes.

Actualmente compara cada venta con muchas otras y utiliza includes para comprobar si un cliente ya fue agregado.

Una mejora futura sería guardar los clientes que ya encontramos y utilizar una estructura como Map o Set para consultarlos sin repetir tantas búsquedas.

Todavía no implementaremos esta mejora porque primero estamos documentando y diagnosticando el rendimiento.

## 8. Revisión de un compañero

**Pendiente de revisión.**

Aquí registraremos una observación real de otro compañero y explicaremos qué modificación realizamos en el informe a partir de sus comentarios.