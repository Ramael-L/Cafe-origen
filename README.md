# Café Origen — Analítica de ventas

Proyecto desarrollado en JavaScript con Node.js para analizar registros de ventas de Café Origen y estudiar el rendimiento de distintos algoritmos.

## Objetivo

Practicar arreglos, objetos, funciones, métodos de JavaScript, generación de datos, medición de operaciones y complejidades de tiempo y memoria (Big O).

## Requisitos

- Node.js instalado.
- Una terminal ubicada en la carpeta raíz del repositorio.

## Cómo ejecutar

Desde la carpeta principal de Café Origen:

    node src/explorar.js
    node src/verificar.js
    node src/reporte.js

### MiniRetos 5 a 8

Generar ventas de prueba:

    node src/generador.js

Contar las operaciones de las funciones:

    node src/medir.js

Medir el reporte de clientes recurrentes:

    node src/medir-recurrentes.js

Comparar las dos versiones del total por ciudad:

    node src/probar-ciudades.js

Medir las funciones del motor y obtener proyecciones:

    node src/medir-informe.js

**Nota:** la medición de clientes recurrentes puede ejecutar una prueba de 100.000 ventas y tardar más de un minuto. Sus tiempos dependen del equipo y de los datos aleatorios.

## Archivos principales

- **src/datos.js:** conjunto original de 12 ventas.
- **src/analitica.js:** funciones principales de analítica.
- **src/reporte.js:** reporte de ventas.
- **src/generador.js:** generación de ventas ficticias.
- **src/instrumentadas.js y src/medir.js:** conteo de operaciones.
- **src/recurrentes.js y src/medir-recurrentes.js:** búsqueda y medición de clientes recurrentes.
- **src/ciudades.js y src/probar-ciudades.js:** comparación de dos estrategias de cálculo por ciudad.
- **src/medir-informe.js:** mediciones para el informe técnico.
- **bitacora.md:** registro de las actividades y aprendizajes.
- **RENDIMIENTO.md:** análisis técnico de complejidad temporal, memoria, mediciones, proyecciones y riesgos.

## Documentación

Consulta **RENDIMIENTO.md** para el informe técnico de la versión v0.2. Las mediciones son experimentales y las proyecciones son estimaciones, no garantías de ejecución.
