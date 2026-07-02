# Dashboard Bancario FEN - TODO

## Paso 1: Base de Datos ✅
- [x] Crear tabla `operaciones` con 25,000 registros
- [x] Crear tabla `instituciones` con 20 bancos chilenos
- [x] Crear 6 vistas agregadas (KPIs, serie mensual, por producto, segmento, canal, top instituciones)
- [x] Crear índices para performance
- [x] Configurar RLS y permisos
- [x] Validar credenciales de Supabase y Gemini

## Paso 2: Desarrollo del Dashboard
- [x] Crear servicio de conexión a Supabase
- [x] Implementar componentes de KPIs (4 métricas)
- [x] Implementar gráfico de serie temporal (área)
- [x] Implementar gráfico de distribución por producto (barras)
- [x] Implementar gráfico de distribución por canal (pie/torta)
- [x] Implementar gráfico de distribución por segmento (barras apiladas)
- [x] Crear tabla de operaciones con ordenamiento, búsqueda y paginación
- [x] Implementar filtros globales (fecha, segmento, producto, región, canal)
- [x] Conectar filtros con todos los componentes
- [x] Crear layout con sidebar de navegación
- [x] Implementar tema claro/oscuro
- [x] Aplicar estética financiera (azul oscuro + acentos dorados)

## Paso 3: Integración con IA (Gemini)
- [x] Crear servicio de conexión a Gemini
- [x] Implementar botón "Analizar"
- [x] Crear prompt para generar hallazgos en español
- [x] Generar mínimo 5 insights accionables
- [x] Mostrar hallazgos en interfaz
- [x] Validar que los insights sean accionables

## Paso 4: Finalización y Despliegue
- [x] Crear archivo .env.example (ENV_SETUP.md)
- [x] Crear archivo README.md con instrucciones
- [x] Crear archivo AGENTS.md con información de IA
- [x] Gemini integrado en servidor (tRPC) - API key segura
- [x] Tema claro/oscuro switchable habilitado
- [ ] Hacer push a GitHub
- [ ] Conectar con Vercel
- [ ] Obtener URL pública final

## Notas
- Estética: Azul oscuro (#1e3a8a) con acentos dorados (#fbbf24)
- Responsive: Mobile-first design
- Datos: 25,000 operaciones de 20 instituciones chilenas
- IA: Gemini para análisis automático en español
- Seguridad: Gemini API key en servidor (tRPC), no expuesta en cliente
- Tema: Modo claro/oscuro switchable
- Estado: Listo para GitHub y Vercel
