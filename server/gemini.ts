import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export interface AnalysisResult {
  insights: string[];
  summary: string;
  recommendations: string[];
}

const AnalysisInputSchema = z.object({
  kpis: z.object({
    total_operaciones: z.number(),
    monto_total: z.number(),
    ticket_promedio: z.number(),
    porcentaje_aprobacion: z.number(),
    mora_media: z.number(),
  }),
  distributionData: z.object({
    topProducts: z.array(
      z.object({
        name: z.string(),
        amount: z.number(),
      })
    ),
    topChannels: z.array(
      z.object({
        name: z.string(),
        amount: z.number(),
      })
    ),
    topSegments: z.array(
      z.object({
        name: z.string(),
        amount: z.number(),
      })
    ),
  }),
});

export const geminiRouter = router({
  analyze: publicProcedure
    .input(AnalysisInputSchema)
    .mutation(async ({ input }): Promise<AnalysisResult> => {
      const apiKey = process.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        throw new Error("Gemini API key not configured");
      }

      const prompt = `Eres un analista financiero experto en el sistema bancario chileno. Analiza los siguientes datos del sistema financiero y proporciona hallazgos accionables en español.

DATOS DEL SISTEMA BANCARIO:
- Total de operaciones: ${input.kpis.total_operaciones.toLocaleString()}
- Monto total: CLP $${input.kpis.monto_total.toLocaleString()}
- Ticket promedio: CLP $${input.kpis.ticket_promedio.toLocaleString()}
- Porcentaje de aprobación: ${input.kpis.porcentaje_aprobacion.toFixed(2)}%
- Mora media: ${input.kpis.mora_media.toFixed(2)} días

PRODUCTOS MÁS RELEVANTES:
${input.distributionData.topProducts.map((p) => `- ${p.name}: CLP $${p.amount.toLocaleString()}`).join("\n")}

CANALES MÁS UTILIZADOS:
${input.distributionData.topChannels.map((c) => `- ${c.name}: CLP $${c.amount.toLocaleString()}`).join("\n")}

SEGMENTOS PRINCIPALES:
${input.distributionData.topSegments.map((s) => `- ${s.name}: CLP $${s.amount.toLocaleString()}`).join("\n")}

Por favor, proporciona:
1. MÍNIMO 5 INSIGHTS ACCIONABLES sobre el estado del sistema financiero chileno basado en estos datos
2. Un RESUMEN EJECUTIVO de máximo 3 líneas
3. RECOMENDACIONES ESTRATÉGICAS para mejorar el desempeño

Formatea tu respuesta como JSON con la siguiente estructura:
{
  "insights": ["insight1", "insight2", "insight3", "insight4", "insight5"],
  "summary": "resumen ejecutivo",
  "recommendations": ["recomendación1", "recomendación2", "recomendación3"]
}

IMPORTANTE: 
- Todos los insights deben ser accionables y específicos
- Usa datos concretos en tus análisis
- Enfócate en oportunidades de mejora y riesgos identificados
- Responde ÚNICAMENTE en español
- Responde SOLO con el JSON, sin texto adicional`;

      try {
        const response = await fetch(GEMINI_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 2048,
            },
            apiKey: apiKey,
          }),
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error("Gemini API error:", errorData);
          throw new Error(`Gemini API error: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.candidates || !data.candidates[0]) {
          throw new Error("No response from Gemini API");
        }

        const content = data.candidates[0].content.parts[0].text;

        // Parsear JSON de la respuesta
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error("Could not parse JSON from Gemini response");
        }

        const result = JSON.parse(jsonMatch[0]) as AnalysisResult;

        // Validar que tenga al menos 5 insights
        if (!result.insights || result.insights.length < 5) {
          const currentCount = result.insights?.length || 0;
          const needed = 5 - currentCount;
          const additionalInsights = Array(needed)
            .fill(null)
            .map(
              (_, i) =>
                `Análisis adicional ${i + 1}: Se requieren más datos para análisis completo`
            );
          result.insights = [...((result.insights as string[]) || []), ...additionalInsights];
        }

        return result;
      } catch (error) {
        console.error("Error analyzing data with Gemini:", error);
        throw error;
      }
    }),
});
