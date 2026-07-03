# Project TODO

- [ ] **Revisar y corregir el despliegue en Vercel:**
  - [ ] Identificar la causa raíz del error de despliegue (página en blanco/código JS).
  - [ ] Implementar una configuración de Vercel que sirva correctamente la SPA (Vite + Express).
  - [ ] Asegurar que la URL pública funcione y cargue el dashboard.

- [ ] **Verificar y alinear datos y filtros con la pauta:**
  - [ ] Confirmar que los 25,000 registros de operaciones bancarias están siendo utilizados.
  - [ ] Validar que los 4 KPIs principales se calculan y muestran correctamente.
  - [ ] Asegurar que los 4 gráficos interactivos funcionan con los datos correctos.
  - [ ] Verificar que los filtros globales (Segmento, Producto, Canal, Región) están implementados y funcionan.
  - [ ] Confirmar que la integración con Gemini para análisis automático en español funciona.

- [ ] **Revisar la arquitectura según la pauta:**
  - [ ] Asegurar que Supabase se usa para la base de datos.
  - [ ] Confirmar que Gemini/Google AI Studio se usa para el análisis con IA.
  - [ ] Verificar que GitHub se usa para el repositorio.
  - [ ] Asegurar que Vercel se usa para la publicación.
  - [ ] Confirmar que la clave de IA no toca el navegador (se usa desde el servidor).

- [ ] **Validación final:**
  - [ ] Verificar visualmente el dashboard en la URL pública.
  - [ ] Confirmar que carga datos y los gráficos responden.
  - [ ] Asegurar que no hay errores en la consola del navegador.
