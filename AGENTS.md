# AGENTS.md - Integración con Inteligencia Artificial

## 🤖 Gemini 1.5 Flash Integration

### Descripción General
El Dashboard Bancario FEN integra **Google Gemini 1.5 Flash** para generar análisis inteligentes y accionables del sistema financiero chileno. El modelo procesa datos agregados de 25,000 operaciones y genera hallazgos en español.

### Endpoint Utilizado
```
https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
```

### Funcionalidad Principal: Botón "Analizar"

#### Ubicación
Panel de Análisis Inteligente en la página del Dashboard (`/dashboard`)

#### Flujo de Ejecución
1. Usuario hace clic en botón "Analizar"
2. Se recopilan datos agregados:
   - KPIs globales (monto total, ticket promedio, % aprobación, mora media)
   - Top 3 productos por volumen
   - Top 3 canales por volumen
   - Top 3 segmentos por volumen
3. Se construye prompt en español con contexto financiero
4. Se envía a Gemini 1.5 Flash
5. Gemini retorna JSON con:
   - Mínimo 5 insights accionables
   - Resumen ejecutivo (3 líneas máximo)
   - 3 recomendaciones estratégicas
6. Resultados se muestran en interfaz con formato visual

#### Prompt Utilizado
```
Eres un analista financiero experto en el sistema bancario chileno. Analiza los siguientes datos del sistema financiero y proporciona hallazgos accionables en español.

[DATOS DEL SISTEMA BANCARIO]
- Total de operaciones: {total_operaciones}
- Monto total: CLP ${monto_total}
- Ticket promedio: CLP ${ticket_promedio}
- Porcentaje de aprobación: {porcentaje_aprobacion}%
- Mora media: {mora_media} días

[PRODUCTOS MÁS RELEVANTES]
{top_products}

[CANALES MÁS UTILIZADOS]
{top_channels}

[SEGMENTOS PRINCIPALES]
{top_segments}

Por favor, proporciona:
1. MÍNIMO 5 INSIGHTS ACCIONABLES
2. Un RESUMEN EJECUTIVO de máximo 3 líneas
3. RECOMENDACIONES ESTRATÉGICAS para mejorar el desempeño

Responde ÚNICAMENTE con JSON válido.
```

### Configuración Técnica

#### Archivo: `client/src/lib/gemini.ts`
```typescript
export async function analyzeFinancialData(
  kpis: KPIData,
  distributionData: DistributionData
): Promise<AnalysisResult>
```

**Parámetros:**
- `kpis`: Objeto con métricas principales
- `distributionData`: Objeto con distribuciones por producto, canal y segmento

**Retorna:**
```typescript
interface AnalysisResult {
  insights: string[];        // Mínimo 5 insights
  summary: string;           // Resumen ejecutivo
  recommendations: string[]; // Recomendaciones estratégicas
}
```

#### Archivo: `client/src/components/AnalysisPanel.tsx`
Componente React que:
- Renderiza botón "Analizar"
- Maneja estado de carga
- Muestra errores
- Presenta resultados en formato visual

### Configuración de API

#### Variables de Entorno Requeridas
```env
VITE_GEMINI_API_KEY=your-gemini-api-key-here
```

#### Parámetros de Generación
```json
{
  "generationConfig": {
    "temperature": 0.7,
    "topK": 40,
    "topP": 0.95,
    "maxOutputTokens": 2048
  }
}
```

### Validación de Respuestas

El sistema valida que:
1. ✅ La respuesta sea JSON válido
2. ✅ Contenga al menos 5 insights
3. ✅ Tenga un resumen ejecutivo
4. ✅ Incluya recomendaciones
5. ✅ Todo esté en español

Si falta algún insight, se agrega automáticamente: "Se requieren más datos para análisis completo"

### Manejo de Errores

| Error | Causa | Solución |
|-------|-------|----------|
| `Gemini API error` | API Key inválida o expirada | Verificar VITE_GEMINI_API_KEY |
| `No response from Gemini` | Respuesta vacía | Reintentar análisis |
| `Could not parse JSON` | Formato incorrecto | Verificar conexión a internet |
| Timeout | Solicitud muy lenta | Reintentar con menos datos |

### Ejemplos de Insights Generados

**Ejemplo 1:**
> "El canal Digital representa el 45% del volumen total, indicando una fuerte adopción de banca digital. Recomendación: invertir en mejora de experiencia digital para capturar más transacciones."

**Ejemplo 2:**
> "La mora media de 8.5 días sugiere problemas en cobranza. Recomendación: implementar sistema de alertas tempranas para intervenir antes de que la mora aumente."

**Ejemplo 3:**
> "El segmento Personas concentra el 60% de operaciones pero solo el 35% del monto. Oportunidad: ofrecer productos de mayor valor a este segmento."

### Limitaciones y Consideraciones

1. **Rate Limiting**: Gemini tiene límites de solicitudes por minuto
2. **Contexto**: El modelo recibe solo datos agregados, no detalles de operaciones individuales
3. **Idioma**: Respuestas siempre en español
4. **Tokens**: Máximo 2048 tokens de salida
5. **Latencia**: Típicamente 2-5 segundos por análisis

### Futuras Mejoras

- [ ] Análisis histórico (comparar períodos)
- [ ] Análisis por institución específica
- [ ] Predicciones de tendencias
- [ ] Alertas automáticas basadas en anomalías
- [ ] Exportar análisis a PDF
- [ ] Análisis comparativo entre canales/productos

### Testing

Para probar la integración:

```bash
# Ejecutar tests
pnpm test

# Test específico de Gemini (si existe)
pnpm test -- gemini.test.ts
```

### Documentación de Referencia

- [Google Gemini API Docs](https://ai.google.dev/docs)
- [Gemini 1.5 Flash Model](https://ai.google.dev/models/gemini-1-5-flash)
- [REST API Reference](https://ai.google.dev/api/rest/v1beta/models/generateContent)

---

**Última actualización**: Julio 2026
