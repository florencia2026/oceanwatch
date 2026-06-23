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


# Explicación general del avance

Se ha construido la base de la interfaz con React, incluyendo el manejo de estado principal y la organización de componentes para renderizar tarjetas de especies. Además, se ha diseñado la estructura necesaria para que OceanWatch pueda evolucionar hacia el consumo de datos externos y soporte de investigación científica marina.
