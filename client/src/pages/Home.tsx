import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { TrendingUp, BarChart3, Zap } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-amber-500" />
            <h1 className="text-2xl font-bold">Dashboard Bancario FEN</h1>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <div className="text-sm text-slate-400">
                Bienvenido, {user?.name}
              </div>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h2 className="text-5xl font-bold">
              Análisis Inteligente del Sistema Financiero Chileno
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Visualiza datos reales de 20 instituciones financieras chilenas
              con análisis impulsado por IA. Toma decisiones informadas basadas
              en hallazgos accionables.
            </p>
            <Button
              onClick={() => navigate("/dashboard")}
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-8 py-3 text-lg"
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              Ir al Dashboard
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <Card className="p-6 bg-slate-800/50 border-slate-700 hover:border-amber-500/50 transition">
              <BarChart3 className="h-8 w-8 text-amber-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">4 KPIs Principales</h3>
              <p className="text-slate-400">
                Monto total, ticket promedio, porcentaje de aprobación y mora
                media del sistema
              </p>
            </Card>

            <Card className="p-6 bg-slate-800/50 border-slate-700 hover:border-amber-500/50 transition">
              <Zap className="h-8 w-8 text-amber-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Gráficos Interactivos</h3>
              <p className="text-slate-400">
                Series temporales, distribuciones por producto, canal, segmento
                y más
              </p>
            </Card>

            <Card className="p-6 bg-slate-800/50 border-slate-700 hover:border-amber-500/50 transition">
              <TrendingUp className="h-8 w-8 text-amber-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">IA Generativa</h3>
              <p className="text-slate-400">
                Análisis automático con Gemini: 5+ insights accionables en
                español
              </p>
            </Card>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-16">
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 text-center">
              <div className="text-3xl font-bold text-amber-500">25,000</div>
              <div className="text-sm text-slate-400 mt-2">Operaciones</div>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 text-center">
              <div className="text-3xl font-bold text-amber-500">20</div>
              <div className="text-sm text-slate-400 mt-2">Instituciones</div>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 text-center">
              <div className="text-3xl font-bold text-amber-500">24</div>
              <div className="text-sm text-slate-400 mt-2">Meses de datos</div>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 text-center">
              <div className="text-3xl font-bold text-amber-500">6</div>
              <div className="text-sm text-slate-400 mt-2">Vistas agregadas</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400">
          <p>
            Dashboard Bancario FEN © 2026 - Análisis del Sistema Financiero
            Chileno
          </p>
        </div>
      </footer>
    </div>
  );
}
