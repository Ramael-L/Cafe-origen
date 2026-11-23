# Café Origen — Informe técnico de rendimiento v0.2

## 1. Objetivo y alcance

Este informe presenta el análisis de rendimiento del motor de analítica de ventas Café Origen, con fundamento en el código de **src/analitica.js**, **src/recurrentes.js**, **src/ciudades.js**, **src/generador.js** y las funciones instrumentadas, además de las mediciones de los MiniRetos 5 a 8.

El objetivo es clasificar la complejidad temporal y espacial de las funciones, comparar mediciones con predicciones, identificar riesgos para grandes volúmenes de ventas y proponer una mejora que aún no se implementa.

**Convenciones:** n = número de ventas; c = número de ciudades distintas; p = número de productos distintos; L = longitud de un nombre de ciudad. Para los datos de prueba, el catálogo tiene cuatro ciudades y cinco productos y los textos son de longitud limitada. Bajo estos supuestos, O(nL) se simplifica a O(n), O(L) se considera constante y los costos que dependen solo de c o p son acotados. No se incluye el arreglo de entrada en la memoria adicional.

## 2. Clasificación de tiempo y memoria

| Función | Qué hace | Tiempo | Espacio adicional | Justificación según el código | Medición / conteo |
|---|---|---|---|---|---|
| valorVenta | Multiplica cantidad por precio | O(1) | O(1) | Una operación aritmética sobre una venta | 0.000400 ms (1 venta) |
| totalVendido | Calcula el dinero total | O(n) | O(1) | Un ciclo acumula el valor de cada venta | 0.168000 ms |
| unidadesVendidas | Suma cantidades | O(n) | O(1) | Un recorrido y un acumulador | 0.109000 ms |
| ventaMayor | Encuentra la venta de mayor valor | O(n) | O(1) | Compara cada venta con la mayor encontrada | 0.140700 ms |
| ticketPromedio | Calcula el promedio de ventas válidas | O(n) | O(1) | Un recorrido; conserva total y contador | 0.182500 ms |
| normalizarCiudad | Unifica escritura de nombres | O(L) | O(L) | Trim, minúsculas, normalización y reemplazo crean cadenas | 0.001800 ms (1 texto) |
| ventasPorCiudad | Suma ventas de una ciudad | O(nL) | O(L) | Normaliza y compara el nombre en cada registro | 2.684700 ms |
| totalVendidoM | Suma mediante reduce | O(n) | O(1) | Reduce recorre una vez y conserva acumulador | 0.089000 ms |
| unidadesVendidasM | Suma con map y reduce | O(n) | O(n) | Map crea un arreglo de cantidades y reduce lo recorre | 0.177400 ms |
| ventasPorCiudadM | Filtra y suma ventas | O(nL) | O(n) | Filter compara ciudades y crea un arreglo intermedio | 2.735900 ms |
| totalPorCiudad | Agrupa montos por ciudad | O(nL + c) | O(c) | Un ciclo agrupa y luego recorre las c ciudades obtenidas | 4.360200 ms |
| unidadesPorProducto | Agrupa unidades por producto | O(n) | O(p) | Guarda un acumulador por producto distinto | 0.726800 ms |
| topProductosPorValor | Ordena productos por monto vendido | O(n + p log p) | O(p) | Acumula por producto; map, copia, sort y slice generan ranking | 0.722200 ms |
| clientesRecurrentes | Detecta clientes con compras repetidas | O(n²); hasta O(n³) | O(n) | Dos ciclos comparan pares; includes puede recorrer recurrentes | 431.947600 ms |
| totalCiudadCadena | Calcula ventas por ciudad con métodos | O(nL) | O(n) | Map, filter, map y reduce recorren arreglos y crean tres intermedios | 3.281900 ms |
| totalCiudadUnaPasada | Calcula ventas por ciudad con un ciclo | O(nL) | O(L) | Un for...of normaliza ciudades y acumula sin arreglos nuevos | 3.256300 ms |
| generarVentas | Genera n ventas ficticias | O(n) | O(n) | Un for crea y guarda n objetos | 1.489200 ms |
| totalVendidoContado | Total con contador de visitas | O(n) | O(1) | Un incremento del contador por venta | 10.000 operaciones |
| ventaMayorContada | Mayor venta con contador | O(n) | O(1) | Una visita inicial y dos marcas por cada venta siguiente | 19.999 operaciones |
| totalPorCiudadContado | Agrupación con contador | O(nL + c) | O(c) | Dos marcas por venta y una por ciudad distinta | 20.004 operaciones* |
| primeraVentaContada | Obtiene la primera venta | O(1) | O(1) | Acceso directo por índice cero | 1 operación |

*En el conteo de totalPorCiudadContado se supone que las cuatro ciudades aparecen en la muestra. Para valorVenta y normalizarCiudad el tiempo corresponde a **una llamada individual**, no a procesar 10.000 ventas. Para las funciones instrumentadas se muestran operaciones contadas, no milisegundos.*

El reporte agrupa tanto las funciones del motor como las funciones de apoyo empleadas para medir y comparar. La clasificación **O(n²)** describe las comparaciones entre pares de clientesRecurrentes; la búsqueda con includes añade un costo que, en entradas desfavorables, puede elevar el tiempo total hasta **O(n³)**.

## 3. Conteo de operaciones — MiniReto 5

El programa **src/medir.js** ejecuta las funciones con n = 100, 1.000, 10.000 y 100.000. Estos son los conteos esperados según los incrementos implementados y la presencia de las cuatro ciudades:

| n | totalVendidoContado | ventaMayorContada | totalPorCiudadContado | primeraVentaContada |
|---:|---:|---:|---:|---:|
| 100 | 100 | 199 | 204 | 1 |
| 1.000 | 1.000 | 1.999 | 2.004 | 1 |
| 10.000 | 10.000 | 19.999 | 20.004 | 1 |
| 100.000 | 100.000 | 199.999 | 200.004 | 1 |

Se cuenta cada visita o comparación seleccionada explícitamente en el código, no todas las operaciones internas de JavaScript. Las primeras tres funciones crecen proporcionalmente a n; el acceso a la primera venta se mantiene constante.

## 4. Mediciones de clientes recurrentes — MiniReto 6

La bitácora registra esta ejecución con los siguientes tiempos reales:

| Cantidad de ventas | Tiempo medido |
|---:|---:|
| 1.000 | 6,230 ms |
| 2.000 | 17,118 ms |
| 4.000 | 68,089 ms |
| 8.000 | 279,744 ms |
| 16.000 | 1.049,571 ms |
| 100.000 | **73,408 s** (73.408 ms) |

La función compara cada venta con las posteriores: hace n(n−1)/2 comparaciones de pares. Al duplicarse n, el número de pares se aproxima a cuatro veces el anterior. El método includes también recorre el arreglo de recurrentes en cada coincidencia, de modo que los tiempos pueden superar la proyección puramente cuadrática.

**La ejecución de 100.000 ventas tardó 73,408 segundos, no 73,408 milisegundos.**

## 5. Proyecciones a 1.000.000 de ventas — MiniReto 8

El archivo **src/medir-informe.js** generó 10.000 ventas y midió cada función tres veces, tomando el tiempo central. Para funciones lineales se multiplica el tiempo por 100; para clientesRecurrentes se presenta una extrapolación cuadrática multiplicando por 10.000. No son pruebas ejecutadas con un millón de ventas.

| Función | Tiempo medido con 10.000 (ms) | Modelo | Proyección a 1.000.000 |
|---|---:|---|---:|
| totalVendido | 0.168000 | ×100 (lineal) | 0.0168 s |
| unidadesVendidas | 0.109000 | ×100 (lineal) | 0.0109 s |
| ventaMayor | 0.140700 | ×100 (lineal) | 0.0141 s |
| ticketPromedio | 0.182500 | ×100 (lineal) | 0.0182 s |
| ventasPorCiudad | 2.684700 | ×100 (lineal) | 0.2685 s |
| totalVendidoM | 0.089000 | ×100 (lineal) | 0.0089 s |
| unidadesVendidasM | 0.177400 | ×100 (lineal) | 0.0177 s |
| ventasPorCiudadM | 2.735900 | ×100 (lineal) | 0.2736 s |
| totalPorCiudad | 4.360200 | ×100 (lineal) | 0.4360 s |
| unidadesPorProducto | 0.726800 | ×100 (lineal) | 0.0727 s |
| topProductosPorValor | 0.722200 | ×100 (lineal) | 0.0722 s |
| clientesRecurrentes | 431.947600 | ×10.000 (cuadrático aproximado) | 71.99 min |
| totalCiudadCadena | 3.281900 | ×100 (lineal) | 0.3282 s |
| totalCiudadUnaPasada | 3.256300 | ×100 (lineal) | 0.3256 s |
| generarVentas | 1.489200 | ×100 (lineal) | 0.1489 s |

Para **valorVenta** (0,000400 ms por venta) y **normalizarCiudad** (0,001800 ms por texto), las mediciones corresponden a una única llamada y no a un reporte sobre 10.000 registros; no se extrapolan como un reporte de un millón de ventas.

Como evidencia adicional, una ejecución del MiniReto 6 estimó **42,53 s para 100.000 ventas** y **70,88 min para 1.000.000**, partiendo de una medición anterior con 16.000 ventas. Sin embargo, los 100.000 registros terminaron tardando **73,408 s**. Al extrapolar esta medición real con el modelo cuadrático, la proyección para un millón aumenta a **122,35 min**. Por otro lado, la medición de 10.000 ventas del MiniReto 8 produce **71,99 min**.

La diferencia entre estas proyecciones es parte del resultado: los tiempos dependen del equipo, de los datos aleatorios, del costo adicional de includes y de otros factores de ejecución. Las mediciones muy pequeñas de otras funciones también tienen un margen de error importante; sus proyecciones son orientativas y no garantías de rendimiento.

## 6. Riesgos de escalabilidad (de mayor a menor)

1. **Crítico — clientesRecurrentes.** Los ciclos anidados comparan pares y includes repite búsquedas en una lista creciente. Es el principal riesgo de tiempo al aumentar las ventas.
2. **Medio — totalCiudadCadena, unidadesVendidasM y ventasPorCiudadM.** Mantienen crecimiento lineal, pero map y filter pueden crear arreglos grandes y elevar el consumo de memoria.
3. **Medio condicionado — topProductosPorValor.** Agrupa todas las ventas y ordena p productos con sort, con costo O(p log p). El riesgo adicional aparece si el catálogo crece significativamente.
4. **Menor — totalPorCiudad y unidadesPorProducto.** Hacen un recorrido de las ventas, pero almacenan un total por ciudad o producto distinto; su uso de memoria depende de c o p.
5. **Menor — totalVendido, unidadesVendidas, ventaMayor, ticketPromedio y totalCiudadUnaPasada.** Mantienen acumuladores y recorridos únicos, sin comparar todas las ventas entre sí.
6. **Bajo — valorVenta y el acceso directo primeraVentaContada.** Son operaciones constantes para entradas de tamaño fijo.

## 7. Plan de optimización (propuesta, todavía sin implementar)

La primera prioridad es **clientesRecurrentes**. Actualmente repite dos tipos de trabajo: compara una venta con muchas otras y busca en recurrentes mediante includes para evitar duplicados.

Como mejora futura se podría recorrer el historial una sola vez, guardar cuáles clientes ya aparecieron en una estructura Set o Map y registrar como recurrente al cliente que vuelva a aparecer. Esto evitaría recorrer todos los pares y facilitaría comprobaciones rápidas de pertenencia.

**No se implementa esta optimización en la v0.2**, porque el ejercicio solicita diagnosticar y proponer una mejora antes de modificar la función.

## 8. Revisión de un compañero

**Pendiente de revisión por otro estudiante.** El informe puede compartirse para que compruebe especialmente la clasificación de clientesRecurrentes, el costo de sort en topProductosPorValor y la validez de las proyecciones. La observación real y la respuesta correspondiente deben registrarse en **bitacora.md**. No se ha inventado una revisión externa.

## 9. Ejecución y fuentes del proyecto

Las pruebas y mediciones se pueden reproducir desde la raíz del repositorio:

    node src/verificar.js
    node src/medir.js
    node src/medir-recurrentes.js
    node src/probar-ciudades.js
    node src/medir-informe.js

**Fuentes:** archivos JavaScript del propio repositorio y los resultados de ejecución registrados en **bitacora.md**. Las cifras descritas como medidas proceden de esas pruebas; los tiempos para un millón de ventas son proyecciones.
