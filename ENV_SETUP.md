# Configuración de Variables de Entorno

## Variables Requeridas

### Supabase
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Cómo obtenerlas:**
1. Ve a [Supabase Dashboard](https://app.supabase.com/)
2. Selecciona tu proyecto
3. Ve a Settings → API
4. Copia la URL del proyecto y la Anon Key

### Google Gemini
```
VITE_GEMINI_API_KEY=your-gemini-api-key-here
```

**Cómo obtenerla:**
1. Ve a [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Haz clic en "Create API key"
3. Copia la clave generada

## Variables Auto-Configuradas

Las siguientes variables son configuradas automáticamente por Manus:
- `VITE_APP_ID`
- `VITE_OAUTH_PORTAL_URL`
- `VITE_ANALYTICS_ENDPOINT`
- `VITE_ANALYTICS_WEBSITE_ID`
- `JWT_SECRET`
- `OAUTH_SERVER_URL`
- `OWNER_NAME`
- `OWNER_OPEN_ID`
- `BUILT_IN_FORGE_API_URL`
- `BUILT_IN_FORGE_API_KEY`
- `VITE_FRONTEND_FORGE_API_KEY`
- `VITE_FRONTEND_FORGE_API_URL`

## Desarrollo Local

En desarrollo, las variables se cargan desde el archivo `.env` en la raíz del proyecto.

## Despliegue en Vercel

En Vercel, configura las variables en:
1. Project Settings → Environment Variables
2. Agrega las variables requeridas (Supabase y Gemini)
3. Vercel las inyectará automáticamente en el build

## Despliegue en Manus

En Manus, usa el panel de Secrets en el Management UI para configurar:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_GEMINI_API_KEY`

Las demás variables se configuran automáticamente.
