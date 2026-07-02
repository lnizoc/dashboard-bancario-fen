# Dashboard Bancario FEN - Análisis del Sistema Financiero Chileno

Un dashboard inteligente para analizar datos reales del sistema financiero chileno con 25,000 operaciones de 20 instituciones financieras, integración con IA (Gemini) para análisis automático y visualizaciones interactivas.

## 🎯 Características Principales

### 📊 KPIs y Métricas
- **Monto Total**: Volumen total de operaciones en el sistema
- **Ticket Promedio**: Monto promedio por operación
- **Porcentaje de Aprobación**: Tasa de aprobación de operaciones
- **Mora Media**: Promedio de días en mora

### 📈 Gráficos Interactivos
- **Serie Temporal Mensual**: Evolución de montos en el tiempo (gráfico de área)
- **Distribución por Producto**: Análisis de productos financieros (barras)
- **Distribución por Canal**: Canales de distribución (pie chart)
- **Distribución por Segmento**: Segmentación de clientes (barras apiladas)

### 🔍 Filtros Globales
- Filtro por fecha (inicio y fin)
- Filtro por segmento (Personas, Pymes, Corporativo, Institucional)
- Filtro por producto (Créditos hipotecarios, de consumo, comerciales, depósitos)
- Filtro por región
- Filtro por canal (Digital, Sucursal, Call Center, ATM, Corresponsal)

### 🤖 Análisis Inteligente con Gemini
- Botón "Analizar" que genera hallazgos automáticos
- Mínimo 5 insights accionables en español
- Recomendaciones estratégicas basadas en datos
- Resumen ejecutivo de los hallazgos

### 📋 Tabla de Operaciones
- Visualización de 25,000 operaciones
- Paginación (50 registros por página)
- Información: fecha, institución, producto, segmento, canal, monto, estado, mora

## 🏗️ Arquitectura Técnica

### Stack Tecnológico
- **Frontend**: React 19 + TypeScript + Tailwind CSS 4
- **Backend**: Express 4 + tRPC 11
- **Base de Datos**: PostgreSQL (Supabase)
- **Visualización**: Recharts
- **IA**: Google Gemini 1.5 Flash
- **Autenticación**: Manus OAuth

### Estructura de Datos
- **Tabla `operaciones`**: 25,000 registros con información de transacciones
- **Tabla `instituciones`**: 20 instituciones financieras chilenas
- **Vistas Agregadas**: 6 vistas para análisis (KPIs, serie mensual, distribuciones, top instituciones)

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js 22+
- pnpm 10+
- Cuenta en Supabase
- API Key de Google Gemini

### Variables de Entorno
Crea un archivo `.env` con las siguientes variables:

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Gemini
VITE_GEMINI_API_KEY=your-gemini-api-key-here

# OAuth (Manus)
VITE_APP_ID=<tu-app-id>
VITE_OAUTH_PORTAL_URL=<tu-oauth-portal>
```

### Instalación
```bash
# Instalar dependencias
pnpm install

# Ejecutar en desarrollo
pnpm dev

# Build para producción
pnpm build

# Iniciar en producción
pnpm start
```

## 📊 Base de Datos

### Configuración de Supabase
La base de datos fue creada con el script SQL que incluye:
- Tabla `operaciones` con 25,000 registros generados automáticamente
- Tabla `instituciones` con 20 bancos chilenos
- 6 vistas agregadas para análisis
- Índices para optimizar performance
- Políticas de RLS para seguridad

### Vistas Disponibles
- `v_kpis`: Métricas globales del sistema
- `v_serie_mensual`: Evolución temporal de 24 meses
- `v_por_producto`: Distribución por tipo de producto
- `v_por_segmento`: Distribución por segmento de cliente
- `v_por_canal`: Distribución por canal de distribución
- `v_top_instituciones`: Ranking de instituciones por volumen

## 🤖 Integración con Gemini

### Funcionamiento del Análisis
1. Usuario hace clic en botón "Analizar"
2. Se envía resumen agregado de datos a Gemini 1.5 Flash
3. Gemini genera 5+ insights accionables en español
4. Se muestran hallazgos, recomendaciones y resumen ejecutivo

### Prompt del Análisis
El sistema envía datos de KPIs, productos top, canales y segmentos a Gemini con instrucciones específicas para generar análisis accionables sobre el sistema financiero chileno.

## 📱 Diseño y UX

### Estética
- **Paleta Principal**: Azul oscuro (#1e3a8a) con acentos dorados (#fbbf24)
- **Tema**: Modo claro/oscuro soportado
- **Responsive**: Diseño mobile-first, optimizado para todos los tamaños

### Componentes
- KPIs con bordes de color para diferenciación
- Gráficos interactivos con tooltips
- Filtros intuitivos con select dropdowns
- Tabla con información clara y badges de estado
- Panel de análisis con layout limpio

## 🧪 Testing

### Tests Disponibles
```bash
# Ejecutar todos los tests
pnpm test

# Tests de secretos (validación de credenciales)
pnpm test -- server/secrets.test.ts

# Tests de autenticación
pnpm test -- server/auth.logout.test.ts
```

## 📦 Despliegue

### Opción 1: Vercel (Recomendado)
1. Sube el código a GitHub
2. Conecta tu repositorio en Vercel
3. Configura las variables de entorno
4. Vercel deployará automáticamente

### Opción 2: Manus Hosting
El proyecto está optimizado para despliegue en Manus con:
- Autoscaling automático
- Soporte para dominios personalizados
- HTTPS incluido

## 📝 Documentación Adicional

### Archivos Importantes
- `client/src/lib/supabase.ts`: Funciones para conectar con Supabase
- `client/src/lib/gemini.ts`: Integración con Gemini API
- `client/src/pages/Dashboard.tsx`: Página principal del dashboard
- `client/src/components/AnalysisPanel.tsx`: Panel de análisis con IA

### Referencias
- [Documentación de Recharts](https://recharts.org/)
- [Documentación de Supabase](https://supabase.com/docs)
- [Documentación de Google Gemini](https://ai.google.dev/)

## 🛠️ Troubleshooting

### Error: "Cannot find module '@supabase/supabase-js'"
```bash
pnpm add @supabase/supabase-js
pnpm run dev
```

### Error: "Gemini API error"
- Verifica que tu API Key sea válida
- Asegúrate de que Gemini está habilitado en tu proyecto de Google Cloud

### Error: "Connection refused" a Supabase
- Verifica que la URL de Supabase sea correcta
- Confirma que tu Anon Key sea válida
- Asegúrate de que las tablas existan en tu proyecto

## 📄 Licencia

Este proyecto es parte de la Tarea Final del Dashboard Bancario FEN.

## 👨‍💻 Autor

Desarrollado como solución integral para análisis del sistema financiero chileno con datos reales y análisis inteligente.

---

**Última actualización**: Julio 2026
