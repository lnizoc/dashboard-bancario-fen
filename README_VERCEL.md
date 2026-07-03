# Dashboard Bancario FEN - Guía de Despliegue en Vercel

## Requisitos Previos

1. Cuenta en Vercel (https://vercel.com)
2. Repositorio GitHub con el código del proyecto
3. Credenciales de Supabase (URL y API Key)
4. Clave API de Google Gemini

## Pasos para Desplegar

### 1. Conectar Repositorio a Vercel

1. Accede a https://vercel.com/dashboard
2. Haz clic en "Add New" → "Project"
3. Selecciona "Import Git Repository"
4. Busca y selecciona `lnizoc/dashboard-bancario-fen`
5. Haz clic en "Import"

### 2. Configurar Variables de Entorno

En la pantalla de configuración del proyecto, agrega las siguientes variables de entorno:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
VITE_GEMINI_API_KEY=your-gemini-api-key-here
```

**Cómo obtener estas credenciales:**

- **Supabase URL y API Key**: 
  - Ve a https://app.supabase.com
  - Selecciona tu proyecto
  - Ve a Settings → API
  - Copia la URL del proyecto y la anon key

- **Gemini API Key**:
  - Ve a https://console.cloud.google.com
  - Crea una nueva clave API
  - Cópiala en la variable de entorno

### 3. Desplegar

1. Vercel automáticamente detectará que es un proyecto Node.js
2. Configurará el build command como: `pnpm run build`
3. Haz clic en "Deploy"
4. Espera a que se complete el despliegue (generalmente 2-3 minutos)

### 4. Acceder a la Aplicación

Una vez completado el despliegue, Vercel te proporcionará una URL pública (ej: `https://dashboard-bancario-fen.vercel.app`)

## Estructura del Proyecto

```
dashboard-bancario-fen/
├── client/                    # Frontend React + Vite
│   ├── src/
│   │   ├── pages/            # Componentes de páginas
│   │   ├── components/       # Componentes reutilizables
│   │   └── lib/              # Utilidades (Supabase, tRPC)
│   └── index.html
├── server/                    # Backend Express + tRPC
│   ├── routers.ts            # Procedimientos tRPC
│   ├── db.ts                 # Consultas a base de datos
│   └── _core/                # Configuración de servidor
├── drizzle/                   # Esquema de base de datos
├── dist/                      # Build de producción
└── vercel.json               # Configuración de Vercel
```

## Características Principales

- **Dashboard Interactivo**: 4 KPIs principales con diseño profesional
- **Gráficos Dinámicos**: 4 gráficos interactivos con Recharts
- **Filtros Globales**: Segmento, Producto, Canal, Región
- **Análisis con IA**: Integración con Google Gemini para insights automáticos
- **Datos Realistas**: 25,000 operaciones de 20 instituciones bancarias chilenas
- **Tema Claro/Oscuro**: Toggle para cambiar tema
- **Diseño Responsivo**: Mobile-first design

## Troubleshooting

### Error: "Cannot find module 'supabase'"
- Asegúrate de que las variables de entorno están configuradas correctamente
- Verifica que `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` estén presentes

### Error: "Gemini API Key is invalid"
- Verifica que `VITE_GEMINI_API_KEY` sea correcta
- Asegúrate de que la clave API está habilitada en Google Cloud Console

### La aplicación carga pero no muestra datos
- Verifica la conexión a Supabase
- Asegúrate de que la base de datos tiene datos (25,000 registros)
- Revisa la consola del navegador para errores

## Soporte

Para más información, consulta:
- [Documentación de Vercel](https://vercel.com/docs)
- [Documentación de Supabase](https://supabase.com/docs)
- [Documentación de Google Gemini](https://ai.google.dev/docs)
