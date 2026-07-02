import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Lightbulb, TrendingUp } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface AnalysisPanelProps {
  kpis: {
    total_operaciones: number;
    monto_total: number;
    ticket_promedio: number;
    porcentaje_aprobacion: number;
    mora_media: number;
  };
  distributionData: {
    topProducts: Array<{ name: string; amount: number }>;
    topChannels: Array<{ name: string; amount: number }>;
    topSegments: Array<{ name: string; amount: number }>;
  };
}

export function AnalysisPanel({ kpis, distributionData }: AnalysisPanelProps) {
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeMutation = trpc.gemini.analyze.useMutation({
    onSuccess: (data) => {
      setAnalysis(data);
      setError(null);
    },
    onError: (err) => {
      setError(err.message || "Error al analizar los datos");
      console.error(err);
    },
  });

  const handleAnalyze = async () => {
    try {
      setError(null);
      await analyzeMutation.mutateAsync({
        kpis,
        distributionData,
      });
    } catch (err) {
      // Error ya manejado en onError
    }
  };

  return (
    <Card className="p-6 bg-white dark:bg-slate-800">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Análisis Inteligente
        </h3>
        <Button
          onClick={handleAnalyze}
          disabled={analyzeMutation.isPending}
          className="bg-blue-900 hover:bg-blue-800 text-white"
        >
          {analyzeMutation.isPending ? (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              Analizando...
            </>
          ) : (
            <>
              <Lightbulb className="mr-2 h-4 w-4" />
              Analizar
            </>
          )}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {analysis && (
        <div className="space-y-6">
          {/* Resumen Ejecutivo */}
          <div className="bg-gradient-to-r from-blue-50 to-amber-50 dark:from-blue-900/20 dark:to-amber-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
              Resumen Ejecutivo
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              {analysis.summary}
            </p>
          </div>

          {/* Insights */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center">
              <TrendingUp className="mr-2 h-4 w-4 text-blue-900" />
              Hallazgos Clave (Insights)
            </h4>
            <div className="space-y-2">
              {analysis.insights?.map((insight: string, index: number) => (
                <div
                  key={index}
                  className="flex gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-900 text-white flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {insight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recomendaciones */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
              Recomendaciones Estratégicas
            </h4>
            <div className="space-y-2">
              {analysis.recommendations?.map((rec: string, index: number) => (
                <div
                  key={index}
                  className="flex gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800"
                >
                  <div className="flex-shrink-0 w-1 bg-amber-500 rounded-full"></div>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {rec}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!analysis && !analyzeMutation.isPending && (
        <div className="text-center py-8">
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Haz clic en "Analizar" para generar hallazgos inteligentes sobre el
            sistema financiero
          </p>
        </div>
      )}
    </Card>
  );
}
