# Nombre del proyecto

OceanWatch

# Cliente y problemática

OceanWatch está dirigido a equipos de investigación marina y conservación que necesitan un panel centralizado para catalogar especies, monitorear datos de biodiversidad y apoyar decisiones basadas en información científica local.

La problemática es que los proyectos de conservación suelen trabajar con datos estáticos o desactualizados, lo que dificulta el seguimiento del estado de conservación y de las zonas de investigación prioritarias.

# Descripción de la solución

OceanWatch es una SPA construida con React y Vite que ofrece un directorio de especies marinas con información de investigación local. En el futuro integrará APIs externas de biodiversidad para obtener datos actualizados sobre el estado de conservación, distribución y recomendaciones de estudio.

# Funcionalidades propuestas

- Directorio de especies marinas con datos básicos y de investigación.
- Filtrado por nombre de especie.
- Rendering modular de tarjetas de especie (`SpeciesCard`) dentro de un directorio (`SpeciesDirectory`).
- Integración futura con API pública de biodiversidad para actualizaciones en tiempo real.
- Información de profundidad recomendada y zona de investigación para buceo científico.

# Estructura del proyecto

- `src/`
  - `components/` — componentes funcionales (`SpeciesCard`, `SpeciesDirectory`).
  - `App.jsx` — componente principal con estado y lógica de filtrado.
  - `main.jsx` — entry point de la aplicación.
  - `assets/`, `styles/`, `services/` — organización propuesta para escalar.
- `package.json` — dependencias del proyecto.
- `README.md` — documentación del proyecto.

# Evidencia del uso de IA

# Bitácora de Prompts - OceanWatch

---
### Fase 1: Diseño y Estructura CSS Grid
- **Contexto:** Que la interfaz principal de OceanWatch organizara las tarjetas de especies de forma ordenada y responsiva, utilizando colores coherentes con una temática oceánica.
- **Prompt:** "Crea un archivo `App.css` con una paleta de colores inspirada en el océano (azules, turquesas y arena). Aplica CSS Grid al contenedor principal en `App.jsx` para que las tarjetas de especies se organicen en una cuadrícula responsiva que se adapte automáticamente al tamaño de la pantalla."
- **Resultado:** Se estableció el diseño visual base y la cuadrícula funcional para las tarjetas de especies.
---

---
### Fase 2: Funcionalidad de Búsqueda
- **Contexto:** Que el usuario pudiera filtrar el catálogo de especies marinas de forma rápida mediante un campo de texto, buscando por nombre común o científico.
- **Prompt:** "En `App.jsx`, implementa un input de búsqueda. Crea un estado `searchTerm` usando `useState`. Conecta este estado al input de texto. Luego, filtra el arreglo de especies marinas original para que la interfaz solo renderice las tarjetas cuyo `name` o `scientificName` incluyan el texto que el usuario escribe."
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
- **Prompt:** "Necesito crear un componente de formulario llamado `AddSpeciesForm.jsx` para que el usuario pueda registrar una nueva especie marina. El formulario debe pedir: Nombre, Nombre Científico, Profundidad y URL de la Imagen. Implementa validaciones para que, si el usuario intenta enviar el formulario con algún campo vacío, se muestre un mensaje de error y no se envíe. Cuando los datos sean válidos, debe pasar la nueva especie al componente principal mediante una función prop."
- **Resultado:** Creación del componente `AddSpeciesForm.jsx` con validación de campos obligatorios y comunicación de datos al componente padre (`App.jsx`).
---


---
### Fase 6: Servicio de Almacenamiento (LocalStorage)
- **Contexto:** Que los datos de la bitácora persistieran después de refrescar la página, evitando que el usuario perdiera su información al recargar el navegador.
- **Prompt:** "Quiero implementar persistencia de datos para OceanWatch usando localStorage. Crea un archivo llamado `storageService.js` en la carpeta `src/services/`. Dentro, escribe funciones para: `saveSpecies(species)`, `getSavedSpecies()` y `removeSpecies(id)`. Luego, en `App.jsx`, modifica el estado `savedSpecies` para que al iniciar la app cargue los datos usando `getSavedSpecies` y, cada vez que agregue o elimine una, se actualice en el localStorage."
- **Resultado:** Creación de `src/services/storageService.js` y configuración del estado en `App.jsx` para garantizar la persistencia de la información.
---

---
### Fase 7: Integración de API externa
- **Contexto:** Que la aplicación fuera dinámica y obtuviera información real de especies marinas desde una fuente externa, manejando correctamente los estados de carga y posibles errores de conexión.
- **Prompt:** "Necesito implementar la integración con una API externa para obtener datos dinámicos de especies marinas. 1. Crea un archivo llamado `apiService.js` en la carpeta `src/services/`. Dentro, programa una función asíncrona llamada `fetchSpecies()` que realice una petición `fetch` a una API pública. 2. En `App.jsx`, utiliza el hook `useEffect` para invocar esta función cuando la aplicación se cargue por primera vez. 3. Implementa estados `loading` y `error` robustos para manejar la carga y fallos de la API. 4. Integra los datos obtenidos de la API en el estado principal del catálogo de `App.jsx`."
- **Resultado:** Creación de `src/services/apiService.js` e implementación de la lógica de consumo de API en `App.jsx` con manejo de estados de carga y errores.
---

---
### Fase: Resolución de conflictos Git
- **Contexto:** Al fusionar la rama `feature-estructura` con `main`, Git detectó discrepancias en los archivos.
- **Acción:** Resolví los conflictos manualmente usando la interfaz de VS Code, seleccionando "Accept Both Changes" para mantener el trabajo de ambas ramas.
- **Resultado:** Fusión exitosa y repositorio `main` actualizado con toda la información.
---

---
### Fase 8: Interacción y Animaciones UI/UX
- **Contexto:** Necesitábamos que la experiencia de usuario fuera más fluida y profesional, dándole un estilo de "Pokedex" interactiva a través de animaciones en las tarjetas de especies.
- **Prompt:** "Quiero darle un estilo más dinámico a mis tarjetas `SpeciesCard`. 1. Agrega efectos de transición (CSS `transition` o `transform`) al pasar el cursor sobre las tarjetas (efecto hover). 2. Implementa una animación suave de aparición (`fade-in` usando `@keyframes`) cuando el catálogo carga. 3. Asegúrate de que las sombras y márgenes de las tarjetas sean consistentes para mejorar la legibilidad del contenido oceánico."
- **Resultado:** Implementación de efectos visuales y animaciones CSS que mejoran la experiencia de usuario y dan un acabado profesional al catálogo.
---

# Explicación general del avance

Se ha construido la base de la interfaz con React, incluyendo el manejo de estado principal y la organización de componentes para renderizar tarjetas de especies. Además, se ha diseñado la estructura necesaria para que OceanWatch pueda evolucionar hacia el consumo de datos externos y soporte de investigación científica marina.
