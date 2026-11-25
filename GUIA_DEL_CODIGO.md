# Guía de estudio del código — Café Origen

Esta guía explica **para qué sirve cada archivo JavaScript del repositorio y cómo funcionan sus partes importantes**. Está redactada para alguien que está aprendiendo JavaScript desde cero. Describe **el código que actualmente existe** en los MiniRetos 1 a 8 (versión v0.2); no inventa funciones de los MiniRetos 9 a 12 que todavía no están implementadas.

> **Cómo estudiar:** abre en VS Code el archivo indicado; lee la explicación de esta guía y busca cada línea en el código. Después ejecuta su comando desde la carpeta raíz de `Cafe-origen`.

## 1. Mapa general del proyecto

| Archivo | ¿Para qué existe? | ¿Se ejecuta directamente? |
|---|---|---|
| `src/datos.js` | Guarda las 12 ventas originales. | No es necesario: se importa. |
| `src/explorar.js` | Enseña cómo leer los registros y mostrarlos. | Sí. |
| `src/analitica.js` | Reúne las funciones para sumar, filtrar, agrupar y ordenar ventas. | Normalmente se importa. |
| `src/verificar.js` | Comprueba que los cálculos devuelvan lo esperado. | Sí. |
| `src/reporte.js` | Presenta los resultados del negocio en consola. | Sí. |
| `src/generador.js` | Fabrica ventas ficticias para probar con muchos datos. | Sí, o se importa. |
| `src/instrumentadas.js` | Versiones de las funciones que cuentan operaciones. | Se importa desde `medir.js`. |
| `src/medir.js` | Compara cuántas operaciones se necesitan para varios tamaños de entrada. | Sí. |
| `src/recurrentes.js` | Encuentra clientes que compraron más de una vez (versión original lenta). | Se importa. |
| `src/medir-recurrentes.js` | Mide el tiempo de la función de clientes recurrentes. | Sí, puede tardar. |
| `src/ciudades.js` | Dos formas de obtener el dinero vendido en una ciudad. | Se importa. |
| `src/probar-ciudades.js` | Comprueba que ambas formas de calcular por ciudad coincidan. | Sí. |
| `src/medir-informe.js` | Mide el tiempo de distintas funciones para el informe v0.2. | Sí. |

**Flujo de datos:** `datos.js` → `analitica.js` → `verificar.js` / `reporte.js`. Para rendimiento: `generador.js` → `instrumentadas.js` / `recurrentes.js` / `ciudades.js` → archivos de medición.

## 2. Conceptos que aparecen en muchos archivos

- **Arreglo (`[]`):** colección de elementos ordenados; sus posiciones empiezan en **0**.
- **Objeto (`{}`):** contiene propiedades con nombre, por ejemplo `venta.cantidad`.
- **Parámetro:** nombre de un dato que recibe una función; `ventas` representa el arreglo recibido.
- **`return`:** devuelve el resultado de una función; **`console.log`** únicamente lo muestra.
- **`const`:** no permite reasignar la variable; **`let`** sí permite reasignarla.
- **`for...of`:** recorre directamente los valores de un arreglo, uno por uno.
- **`require("./archivo.js")`:** importa lo que otro archivo exporta; **`module.exports`** permite compartirlo.
- **`+=`:** suma un valor al acumulado, por ejemplo `total += 5` es igual a `total = total + 5`.
- **`++`:** aumenta una variable en 1.
- **`===`:** comprueba igualdad estricta (sin convertir tipos).
- **`?.` y `??`:** en este proyecto aparece `??` para usar un valor alternativo si el resultado es `null` o `undefined`.
- **`map`:** transforma cada elemento y devuelve un arreglo nuevo.
- **`filter`:** conserva los elementos que cumplen una condición y devuelve un arreglo nuevo.
- **`reduce`:** combina los elementos para producir un acumulador o resultado.
- **`sort`:** ordena un arreglo **modificando ese mismo arreglo**.
- **`slice`:** selecciona una parte y crea un arreglo nuevo.
- **`Object.entries(objeto)`:** devuelve pares `[clave, valor]`.
- **`Object.keys(objeto)`:** devuelve las claves; **`Object.values(objeto)`**, los valores.
- **`...` (spread):** copia los elementos de un arreglo o las propiedades de un objeto, según el contexto.

## 3. Día 1 — Archivos y funciones

### 3.1. `src/datos.js` — Las ventas originales

Este archivo crea un arreglo llamado `ventas` con **12 objetos**. Cada objeto tiene:

| Propiedad | Significado | Ejemplo |
|---|---|---|
| `id` | Identificador del registro. | `1` |
| `fecha` | Día de la compra. | `"2026-09-01"` |
| `cliente` | Código del cliente. | `"C01"` |
| `producto` | Nombre del producto vendido. | `"Origen Huila 500 g"` |
| `ciudad` | Ciudad de la venta. | `"Medellín"` |
| `cantidad` | Unidades registradas. | `2` |
| `precio` | Precio de una unidad, en pesos. | `42000` |

**Cómo funciona:** `const ventas = [...]` define los registros y `module.exports = ventas` permite que otros archivos reciban directamente ese arreglo al usar `require("./datos.js")`.

**Casos especiales importantes:** el registro 8 tiene `cantidad: 0`; la ciudad aparece en distintas grafías (por ejemplo `"Medellín"` y `"medellín"`); varios registros son del mismo cliente. Esas diferencias están en la muestra original y no deben cambiarse accidentalmente.

### 3.2. `src/explorar.js` — Ver los datos

Este es un **script**, es decir, ejecuta instrucciones en orden sin definir funciones propias:

1. `require("./datos.js")` carga las 12 ventas.
2. `ventas.length` indica cuántos registros existen.
3. `ventas[0]` obtiene el primer registro.
4. `ventas[3].producto` muestra el producto del **cuarto registro** (índice 3).
5. `console.table(ventas)` imprime las ventas como tabla.

**Detalle pendiente del enunciado:** el archivo actual **no muestra la última venta** y utiliza el índice `3` donde se solicitó el producto en la **posición 4** (índice `4` si hablamos de posiciones de arreglo). Esta guía describe lo que hace el código actual, no lo presenta como ya corregido.

**Ejecutar:** `node src/explorar.js`.

### 3.3. `src/analitica.js` — El motor de cálculos

Contiene las funciones que utiliza el resto del proyecto.

#### `valorVenta(venta)`
- **Entrada:** un objeto `venta`.
- **Cómo funciona:** multiplica `venta.cantidad * venta.precio`.
- **Salida:** dinero generado por esa venta. Ejemplo: 2 unidades de $42.000 → **$84.000**.
- Es una función auxiliar: muchas otras la reutilizan para no repetir la multiplicación.

#### `totalVendido(ventas)`
- **Entrada:** el arreglo completo.
- **Cómo funciona:** crea `let total = 0`; recorre cada venta mediante `for...of` y suma `valorVenta(venta)` con `+=`.
- **Salida:** un número con la suma del dinero. Para la muestra original: **985000**.
- **Arreglo vacío:** devuelve 0. **Tiempo:** O(n), porque recorre n ventas.

#### `unidadesVendidas(ventas)`
- Crea `let unidades = 0`, recorre las ventas y suma `venta.cantidad`.
- Devuelve el total de unidades; la muestra tiene **21**.
- Con un arreglo vacío devuelve 0. **Tiempo:** O(n).

#### `ventaMayor(ventas)`
- Primero comprueba si el arreglo está vacío; en ese caso devuelve `null`.
- Toma `ventas[0]` como la mayor venta provisional.
- Recorre las ventas y, cuando `valorVenta(venta) > valorVenta(mayor)`, reemplaza `mayor`.
- **Devuelve el objeto completo de la venta más alta**, no solo el dinero. En la muestra es la venta con `id: 10`, por $168.000.
- **Tiempo:** O(n).

#### `ticketPromedio(ventas)`
- Inicializa `total = 0` y `contador = 0`.
- Recorre las ventas; solo si `venta.cantidad > 0` suma dinero y aumenta el contador.
- Al finalizar calcula `total / contador`; si no hay ventas válidas devuelve **0** y evita dividir entre cero.
- **Ojo:** cuenta **ventas válidas**, no clientes distintos. **Tiempo:** O(n).

#### `normalizarCiudad(ciudad)`
- Toma una cadena de texto como `" MedellÍn "`.
- Aplica `trim()` (quita espacios externos), `toLowerCase()` (minúsculas), `normalize("NFD")` (separa letras y tildes) y `replace(...)` (elimina marcas de acentuación).
- El resultado permite comparar nombres escritos de manera distinta: `"medellin"`.
- **Entrada:** texto. **Salida:** texto normalizado.

#### `ventasPorCiudad(ventas, ciudad)`
- Primero normaliza la ciudad que estamos buscando.
- Recorre las ventas, normaliza cada `venta.ciudad` y compara con `===`.
- Cuando coincide, acumula su `valorVenta`.
- **Devuelve un número**. Para `"Medellín"` con la muestra: **356000**. Si no hay coincidencias devuelve 0.

#### `totalVendidoM(ventas)`
- Es otra versión de `totalVendido`.
- Utiliza `reduce((total, venta) => total + valorVenta(venta), 0)` en lugar de un `for...of`.
- El **0 del final** es el valor inicial del acumulador.
- Debe dar exactamente el mismo total que la versión con ciclo.

#### `unidadesVendidasM(ventas)`
- `map(venta => venta.cantidad)` crea un arreglo nuevo con solo las cantidades.
- Después `reduce` suma esas cantidades desde 0.
- Ejemplo mental: `[{cantidad: 2}, {cantidad: 3}]` → `[2, 3]` → **5**.
- Crea un arreglo intermedio: su memoria adicional puede crecer con n.

#### `ventasPorCiudadM(ventas, ciudad)`
- Normaliza la ciudad buscada.
- Usa `filter` para crear un arreglo con las ventas de esa ciudad.
- Usa `reduce` para sumar su valor.
- Devuelve el mismo resultado que `ventasPorCiudad`, pero usa métodos de arreglo.

#### `totalPorCiudad(ventas)`
- Crea dos objetos vacíos: `totales` (guarda sumas) y `nombres` (guarda una grafía legible).
- Recorre las ventas, transforma cada ciudad en una **clave normalizada**.
- Si la clave es nueva, inicia el acumulador en cero; luego añade `valorVenta(venta)`.
- Por último, `Object.entries(totales)` recorre cada grupo y construye el objeto `resultado`.
- **Salida:** un objeto con una propiedad por ciudad, por ejemplo `{"Medellín": 356000, "Bogotá": 276000, ...}`.
- Esta normalización evita grupos duplicados por diferencias de escritura.

#### `unidadesPorProducto(ventas)`
- Utiliza un objeto `productos` como **diccionario de acumuladores**.
- Por cada venta toma `venta.producto`, inicia el total de ese producto si aún no existe y suma `venta.cantidad`.
- **Salida:** objeto con el total de unidades por producto.
- Es similar a `totalPorCiudad`, pero agrupa por **producto** y suma **unidades**, no dinero.

#### `topProductosPorValor(ventas, k)`
- Recorre las ventas y guarda en `totales` cuánto dinero generó cada producto.
- `Object.entries(totales).map(...)` convierte ese diccionario en objetos `{producto, total}`.
- `const copia = [...ranking]` crea una copia superficial.
- `copia.sort((a, b) => b.total - a.total)` ordena de mayor a menor **por dinero generado**.
- `copia.slice(0, k)` toma los primeros `k` productos; con `k = 3` devuelve el **top 3**.
- No cambia el orden del arreglo `ventas` original. El costo incluye recorrer n ventas y ordenar p productos distintos.

**Al final:** `module.exports = {...}` exporta las funciones anteriores para que otros archivos las utilicen con `require`.

### 3.4. `src/verificar.js` — Comprobar resultados

Este archivo **sí se ejecuta directamente** y contiene una función auxiliar:

#### `comparar(nombre, original, nuevo)`
- Recibe el nombre de la prueba y dos resultados.
- Si `original === nuevo` imprime **OK**; en caso contrario, **DIFERENTE**.
- Es una comparación estricta útil aquí para números y textos; no compara el contenido profundo de dos objetos distintos.

**Qué verifica el resto del script:**
1. `totalVendido` frente a `totalVendidoM`.
2. `unidadesVendidas` frente a `unidadesVendidasM`.
3. `ventasPorCiudad` frente a `ventasPorCiudadM`.
4. Las cuatro ciudades y sus totales esperados.
5. Que el total de unidades agrupadas sea 21.
6. Que el top 3 tenga el orden y dinero esperados.
7. Que el orden del arreglo original no cambie: guarda los IDs antes y después de los cálculos.

**Ejecutar:** `node src/verificar.js`. Las comparaciones deben imprimir `OK`.

### 3.5. `src/reporte.js` — Mostrar un informe entendible

Este script importa las ventas originales y las funciones de `analitica.js`.

#### `pesos(valor)`
- Recibe un número.
- `valor.toLocaleString("es-CO", {maximumFractionDigits: 2})` le da formato colombiano.
- Agrega `"$"` al principio, por ejemplo convierte `985000` en `"$985.000"`.

**Secciones que muestra actualmente:** resumen general (total, unidades, promedio, mayor venta), ventas por ciudad, unidades por producto y top 3 por valor. Usa `console.table` para que algunas secciones sean más legibles.

**Importante para la entrega:** la versión publicada **todavía no incluye** la función `ventasDelDia` ni el reporte de un día con ventas y uno sin ventas que se pidieron en el MiniReto 4. No se debe confundir la explicación de lo existente con una prueba de cumplimiento total.

**Ejecutar:** `node src/reporte.js`.

## 4. Día 2 — Generación y medición de rendimiento

### 4.1. `src/generador.js` — Crear datos de prueba

Define listas fijas de productos con sus precios y de ciudades.

#### `generarVentas(n)`
- **Entrada:** número entero `n` de ventas por generar.
- Comprueba que `n` sea entero y no sea negativo; de lo contrario lanza un error.
- Crea `ventas = []` y calcula un número máximo de clientes con `Math.max(1, Math.floor(n / 3))`.
- En un `for` que se repite n veces escoge producto, ciudad, cliente, cantidad (entre 1 y 5) y día (entre 1 y 30) utilizando `Math.random()` y `Math.floor()`.
- Construye `nuevaVenta` con los mismos campos de `datos.js` y la agrega con `ventas.push(nuevaVenta)`.
- Devuelve un **arreglo de exactamente n registros**; `generarVentas(0)` devuelve `[]`.
- `String(...).padStart(2, "0")` completa con ceros el día y el número de cliente cuando corresponde.

**`require.main === module`:** la tabla de ejemplo con 100 ventas se imprime **solo si ejecutas este archivo directamente**, no cuando otra función lo importa.

**Ejecutar:** `node src/generador.js`.

### 4.2. `src/instrumentadas.js` — Contar operaciones

Estas funciones hacen cálculos similares a los de `analitica.js`, pero reciben un **segundo argumento** llamado `contador`.

Ejemplo del objeto compartido: `const contador = {operaciones: 0}`. Cuando se escribe `contador.operaciones++`, también cambia el objeto del código que llamó la función.

#### `totalVendidoContado(ventas, contador)`
Recorre las ventas y suma el valor de cada una. Aumenta el contador **una vez por venta visitada**, así que el conteo es n.

#### `ventaMayorContada(ventas, contador)`
Empieza con la primera venta si existe y la cuenta una vez. Desde la segunda cuenta una visita y una comparación por registro. Para n > 0, su conteo es **2n−1**; con un arreglo vacío devuelve `null`.

#### `totalPorCiudadContado(ventas, contador)`
Agrupa por ciudad normalizada. Cuenta dos marcas por venta (visita y comprobación) más una marca por cada grupo de ciudad al construir el resultado. Con c ciudades diferentes, se cuentan **2n+c** operaciones.

#### `primeraVentaContada(ventas, contador)`
Aumenta una vez el contador y devuelve `ventas[0] ?? null`. Es un acceso directo: **O(1)**.

**Nota de lectura:** hay un `module.exports` intermedio para una sola función y otro al final que exporta las cuatro. El segundo es el que queda vigente; el primero es redundante, pero no impide usar las funciones.

### 4.3. `src/medir.js` — Comparar operaciones por tamaño

Es un script, no define funciones nuevas. Recorre los tamaños **100, 1.000, 10.000 y 100.000**.

Para cada tamaño:
1. Llama a `generarVentas(n)`.
2. Crea cuatro objetos contadores independientes, todos iniciados en 0.
3. Ejecuta las funciones instrumentadas.
4. Guarda en `resultados` el tamaño y las operaciones contadas.

Al final usa `console.table(resultados)`. Nos permite ver que las funciones lineales crecen aproximadamente en proporción a n y que `primeraVentaContada` se mantiene constante.

**Ejecutar:** `node src/medir.js`.

### 4.4. `src/recurrentes.js` — Detectar clientes repetidos

#### `clientesRecurrentes(ventas)`
- Empieza con el arreglo vacío `recurrentes = []`.
- Un `for` exterior toma una venta; un segundo `for` compara su cliente con las **ventas posteriores**.
- Si los IDs coinciden, usa `recurrentes.includes(...)` para comprobar que el cliente no esté registrado.
- Si todavía no está, lo añade con `push`.
- Devuelve un arreglo con cada cliente que aparece al menos dos veces. En la muestra original: `["C01", "C02", "C03"]` (el orden puede depender del recorrido).

**Problema de rendimiento:** los dos ciclos hacen alrededor de n(n−1)/2 comparaciones. Además, `includes` puede recorrer el arreglo acumulado: el peor caso global puede llegar a O(n³), aunque las comparaciones por pares son O(n²).

**Esta es la versión original que conservamos para comparar con futuras optimizaciones mediante Set y Map**. Esas versiones no aparecen aún en el código publicado.

### 4.5. `src/medir-recurrentes.js` — Cronometrar una función lenta

Es un script que:
1. Genera arreglos de **1.000, 2.000, 4.000, 8.000 y 16.000** ventas.
2. Ejecuta `clientesRecurrentes` y mide su duración con `console.time()` / `console.timeEnd()` y `process.hrtime.bigint()`.
3. Convierte la diferencia de nanosegundos a **milisegundos** y guarda una tabla.
4. Usa el tiempo con 16.000 registros y un modelo cuadrático para **estimar**, no medir, el tiempo con 100.000 y 1.000.000.
5. Si la estimación para 100.000 es menor de 120.000 ms (2 minutos), intenta también esa prueba real.

**Atención:** `node src/medir-recurrentes.js` puede tardar bastante cuando ejecuta 100.000 ventas. Una estimación inferior a dos minutos **no garantiza** que esa ejecución termine antes.

### 4.6. `src/ciudades.js` — Dos maneras de hacer el mismo cálculo

#### `totalCiudadCadena(ventas, ciudad)`
Encadena cuatro métodos:
1. Primer `map`: crea nuevos objetos con el nombre de ciudad normalizado usando `...venta`.
2. `filter`: conserva únicamente las ventas cuya ciudad coincide.
3. Segundo `map`: convierte cada venta seleccionada en su valor monetario.
4. `reduce`: suma desde cero.

**Devuelve:** dinero vendido en una ciudad. Crea **tres arreglos intermedios** y puede utilizar O(n) de memoria adicional.

#### `totalCiudadUnaPasada(ventas, ciudad)`
- Normaliza el nombre buscado y crea `total = 0`.
- Recorre las ventas **una sola vez** con `for...of`.
- Si la ciudad coincide, suma `valorVenta(venta)`.
- Devuelve el acumulador, sin crear arreglos intermedios: con nombres de longitud acotada, su memoria adicional es O(1).

**Ambas:** tienen tiempo O(n) suponiendo nombres de ciudad de longitud limitada. La segunda ahorra memoria.

**`module.exports`:** exporta ambas funciones y además el alias `totalCiudad: totalCiudadUnaPasada`. Cuando importas `totalCiudad`, obtienes la versión de un recorrido.

### 4.7. `src/probar-ciudades.js` — Comprobar equivalencia

Este archivo:
1. Genera **10.000 ventas** con `generarVentas(10000)`.
2. Usa la ciudad `"Medellín"`.
3. Llama a `totalCiudadCadena` y `totalCiudadUnaPasada` **con el mismo arreglo**.
4. Muestra ambos totales y comprueba la igualdad con `===`.

**Resultado esperado:** `¿Los resultados son iguales? true`. Los importes cambian en cada ejecución porque las ventas son aleatorias.

**Ejecutar:** `node src/probar-ciudades.js`.

### 4.8. `src/medir-informe.js` — Mediciones para v0.2

Este script importa el generador, las funciones de analítica, las versiones por ciudad y `clientesRecurrentes`.

**Cómo funciona el arreglo `pruebas`:** cada fila guarda el nombre de una función, una función flecha que la ejecuta, su modelo de crecimiento y, cuando corresponde, la descripción de la entrada medida.

Para cada prueba:
1. Ejecuta la función una vez como preparación.
2. Mide **tres ejecuciones** con `process.hrtime.bigint()`.
3. Ordena los tiempos y usa el valor central (mediana de tres).
4. Calcula una proyección de **10.000 a 1.000.000**: factor 100 para las funciones lineales y 10.000 para la aproximación cuadrática de clientes recurrentes.
5. Muestra `console.table(resultados)` y después imprime una tabla Markdown para el informe.

**Importante:** esos tiempos son **mediciones de ese equipo y esa ejecución**. Las proyecciones no son garantías de duración. `valorVenta` y `normalizarCiudad` se miden con una llamada individual, no con 10.000 llamadas. El modelo cuadrático puede infravalorar el peor caso de `clientesRecurrentes` por el `includes`.

**Ejecutar:** `node src/medir-informe.js`. Este script también puede tardar por la función original de clientes recurrentes.

## 5. ¿En qué orden conviene leer el proyecto?

1. `datos.js` y `explorar.js`: comprender arreglos, objetos e índices.
2. `analitica.js`: estudiar `for...of`, acumuladores y comparaciones; luego `map`, `filter` y `reduce`.
3. `verificar.js` y `reporte.js`: aprender a comprobar y presentar resultados.
4. `generador.js`, `instrumentadas.js` y `medir.js`: entender datos aleatorios y operaciones.
5. `recurrentes.js` y `medir-recurrentes.js`: observar el problema de los ciclos anidados.
6. `ciudades.js`, `probar-ciudades.js` y `medir-informe.js`: analizar tiempo y memoria.

## 6. Relación con Big O

- **O(1):** una operación que no recorre las ventas, por ejemplo `primeraVentaContada`.
- **O(n):** un recorrido de n ventas, como `totalVendido`.
- **O(n²):** comparar pares de ventas con ciclos anidados.
- **O(n log n):** aparece en ordenamientos eficientes por comparación; en `topProductosPorValor` se ordena un ranking de p productos, no necesariamente todas las ventas.
- **Espacio O(1):** pocos acumuladores como `let total = 0`.
- **Espacio O(n):** un arreglo nuevo que podría contener n elementos, como el resultado de `map`.

Una función puede tener tiempo O(n) y espacio O(1), o tiempo O(n) y espacio O(n). **Tiempo** es cuánto trabajo realiza; **espacio** es cuánta memoria adicional utiliza.

Para la clasificación completa con mediciones y proyecciones consulta [RENDIMIENTO.md](RENDIMIENTO.md).

## 7. Estado de implementación y pendientes

La guía corresponde a los archivos actualmente presentes. Como tareas separadas del trabajo de documentación:

- **MiniReto 1:** revisar índice solicitado y salida de última venta de `explorar.js`.
- **MiniReto 4:** agregar `ventasDelDia` y pruebas de días con y sin ventas, además de documentar la depuración.
- **MiniReto 8:** conseguir la revisión real de otro estudiante.
- **MiniRetos 9–12:** implementar las versiones con Set y Map, combos, frecuencias, ventana deslizante, dos punteros y el reporte final v1.0.

Estas tareas **no se modifican en este cambio**: aquí solo documentamos el funcionamiento actual.

---

**Consejo:** cuando termines una nueva función, actualiza esta guía con su entrada, qué pasos hace, qué devuelve, qué pasa con un arreglo vacío y cómo probarla. Así aprenderás a explicar tu propio código.
