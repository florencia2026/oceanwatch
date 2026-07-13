# Bitácora de Prompts - OceanWatch

---
### Fase 1: Diseño y Estructura CSS Grid
- **Contexto:** Que la interfaz principal de OceanWatch organizara las tarjetas de especies de forma ordenada y responsiva, utilizando colores coherentes con una temática oceánica.
- **Prompt:** "Actúa como desarrollador frontend. Crea un archivo `App.css` con una paleta de colores inspirada en el océano (azules, turquesas y arena). Aplica CSS Grid al contenedor principal en `App.jsx` para que las tarjetas de especies se organicen en una cuadrícula responsiva que se adapte automáticamente al tamaño de la pantalla."
- **Resultado:** Se estableció el diseño visual base y la cuadrícula funcional para las tarjetas de especies.
---

---
### Fase 2: Funcionalidad de Búsqueda
- **Contexto:** Que el usuario pudiera filtrar el catálogo de especies marinas de forma rápida mediante un campo de texto, buscando por nombre común o científico.
- **Prompt:** "Actúa como desarrollador frontend. En `App.jsx`, implementa un input de búsqueda. Crea un estado `searchTerm` usando `useState`. Conecta este estado al input de texto. Luego, filtra el arreglo de especies marinas original para que la interfaz solo renderice las tarjetas cuyo `name` o `scientificName` incluyan el texto que el usuario escribe."
- **Resultado:** Implementación de un buscador en tiempo real que filtra dinámicamente las tarjetas de especies según la entrada del usuario.
---

---
### Fase 3: Expansión del Catálogo de Datos
- **Contexto:** Ampliar la información disponible de cada especie marina, agregando propiedades técnicas (estado de conservación, hábitat y dieta) para enriquecer el detalle de cada tarjeta.
- **Prompt:** "Modifica el estado inicial en `App.jsx` para expandir el catálogo a 8 especies marinas, enfocándote en fauna del sur de Chile. Además de `id`, `name`, `scientificName` y `depth`, agrega tres nuevas propiedades: `conservationStatus`, `habitat` y `diet`."
- **Resultado:** Se actualizó el estado inicial del catálogo con información detallada y estructurada para cada especie marina.
---

---
### Fase 4: Navegación de la Bitácora
- **Contexto:** Que el usuario pudiera alternar entre la vista general del catálogo y su propia bitácora de especies guardadas sin recargar la página.
- **Prompt:** "Modifica `App.jsx` para incluir un menú de navegación superior con dos botones: 'Catálogo' y 'Mi Bitácora'. Crea un estado `currentView` usando `useState`. Si `currentView` es 'catalog', muestra la cuadrícula general de todas las especies. Si `currentView` es 'bitacora', muestra únicamente las tarjetas guardadas en el estado `savedSpecies`."
- **Resultado:** Implementación de navegación mediante renderizado condicional, permitiendo al usuario cambiar entre las vistas de catálogo y bitácora.
---

---
### Fase 5: Formulario de Registro y Validaciones
- **Contexto:** Que el usuario pudiera agregar nuevas especies marinas a OceanWatch, asegurando que los datos ingresados fueran correctos mediante validaciones.
- **Prompt:** "Actúa como desarrollador senior en React. Necesito crear un componente de formulario llamado `AddSpeciesForm.jsx` para que el usuario pueda registrar una nueva especie marina. El formulario debe pedir: Nombre, Nombre Científico, Profundidad y URL de la Imagen. Implementa validaciones para que, si el usuario intenta enviar el formulario con algún campo vacío, se muestre un mensaje de error y no se envíe. Cuando los datos sean válidos, debe pasar la nueva especie al componente principal mediante una función prop."
- **Resultado:** Creación del componente `AddSpeciesForm.jsx` con validación de campos obligatorios y comunicación de datos al componente padre (`App.jsx`).
---

---
### Fase 6: Servicio de Almacenamiento (LocalStorage)
- **Contexto:** Que los datos de la bitácora persistieran después de refrescar la página, evitando que el usuario perdiera su información al recargar el navegador.
- **Prompt:** "Actúa como desarrollador senior en React. Quiero implementar persistencia de datos para OceanWatch usando localStorage. Crea un archivo llamado `storageService.js` en la carpeta `src/services/`. Dentro, escribe funciones para: `saveSpecies(species)`, `getSavedSpecies()` y `removeSpecies(id)`. Luego, en `App.jsx`, modifica el estado `savedSpecies` para que al iniciar la app cargue los datos usando `getSavedSpecies` y, cada vez que agregue o elimine una, se actualice en el localStorage."
- **Resultado:** Creación de `src/services/storageService.js` y configuración del estado en `App.jsx` para garantizar la persistencia de la información.
---

---
### Fase 7: Integración de API externa
- **Contexto:** Que la aplicación fuera dinámica y obtuviera información real de especies marinas desde una fuente externa, manejando correctamente los estados de carga y posibles errores de conexión.
- **Prompt:** "Actúa como desarrollador senior de React. Necesito implementar la integración con una API externa para obtener datos dinámicos de especies marinas. 1. Crea un archivo llamado `apiService.js` en la carpeta `src/services/`. Dentro, programa una función asíncrona llamada `fetchSpecies()` que realice una petición `fetch` a una API pública. 2. En `App.jsx`, utiliza el hook `useEffect` para invocar esta función cuando la aplicación se cargue por primera vez. 3. Implementa estados `loading` y `error` robustos para manejar la carga y fallos de la API. 4. Integra los datos obtenidos de la API en el estado principal del catálogo de `App.jsx`."
- **Resultado:** Creación de `src/services/apiService.js` e implementación de la lógica de consumo de API en `App.jsx` con manejo de estados de carga y errores.
---
