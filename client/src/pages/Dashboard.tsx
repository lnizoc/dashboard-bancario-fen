import { useEffect, useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AnalysisPanel } from "@/components/AnalysisPanel";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import {
  getKPIs,
  getSerieMensual,
  getDistribucionProducto,
  getDistribucionCanal,
  getDistribucionSegmento,
  getOperaciones,
  getUniqueValues,
  KPI,
  SerieMensual,
  DistribucionProducto,
  DistribucionCanal,
  DistribucionSegmento,
  Operacion,
} from "@/lib/supabase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const COLORS = [
  "#1e3a8a",
  "#3b82f6",
  "#60a5fa",
  "#93c5fd",
  "#dbeafe",
  "#fbbf24",
  "#f59e0b",
  "#d97706",
];

interface Filters {
  fechaInicio?: string;
  fechaFin?: string;
  segmento?: string;
  producto?: string;
  region?: string;
  canal?: string;
}

export default function Dashboard() {
  const [kpis, setKpis] = useState<KPI | null>(null);
  const [serieMensual, setSerieMensual] = useState<SerieMensual[]>([]);
  const [distribucionProducto, setDistribucionProducto] = useState<
    DistribucionProducto[]
  >([]);
  const [distribucionCanal, setDistribucionCanal] = useState<
    DistribucionCanal[]
  >([]);
  const [distribucionSegmento, setDistribucionSegmento] = useState<
    DistribucionSegmento[]
  >([]);
  const [operaciones, setOperaciones] = useState<Operacion[]>([]);
  const [totalOperaciones, setTotalOperaciones] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({});

  // Opciones para filtros
  const [segmentos, setSegmentos] = useState<string[]>([]);
  const [productos, setProductos] = useState<string[]>([]);
  const [regiones, setRegiones] = useState<string[]>([]);
  const [canales, setCanales] = useState<string[]>([]);

  // Cargar opciones de filtros
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const [segs, prods, regs, cans] = await Promise.all([
          getUniqueValues("segmento"),
          getUniqueValues("producto"),
          getUniqueValues("region"),
          getUniqueValues("canal"),
        ]);
        setSegmentos(segs as string[]);
        setProductos(prods as string[]);
        setRegiones(regs as string[]);
        setCanales(cans as string[]);
      } catch (error) {
        console.error("Error loading filter options:", error);
      }
    };
    loadFilterOptions();
  }, []);

  // Cargar datos principales
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [kpisData, mensualData, productoData, canalData, segmentoData] =
          await Promise.all([
            getKPIs(),
            getSerieMensual(),
            getDistribucionProducto(),
            getDistribucionCanal(),
            getDistribucionSegmento(),
          ]);

        setKpis(kpisData);
        setSerieMensual(mensualData);
        setDistribucionProducto(productoData);
        setDistribucionCanal(canalData);
        setDistribucionSegmento(segmentoData);

        // Cargar operaciones con filtros
        const operacionesData = await getOperaciones(filters, 1, 50);
        setOperaciones(operacionesData.data);
        setTotalOperaciones(operacionesData.total);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [filters]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              Dashboard Bancario
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Análisis del Sistema Financiero Chileno
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* KPIs */}
        {kpis && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-6 border-l-4 border-l-blue-900 bg-white dark:bg-slate-800">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Monto Total
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                {formatCurrency(kpis.monto_total || 0)}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                {kpis.total_operaciones?.toLocaleString()} operaciones
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-l-amber-500 bg-white dark:bg-slate-800">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Ticket Promedio
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                {formatCurrency(kpis.ticket_promedio || 0)}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                Por operación
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-l-green-600 bg-white dark:bg-slate-800">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                % Aprobación
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                {formatPercentage(kpis.porcentaje_aprobacion || 0)}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                Del total de operaciones
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-l-red-600 bg-white dark:bg-slate-800">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Mora Media
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                {kpis.mora_media?.toFixed(1) || 0} días
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                Promedio de atraso
              </p>
            </Card>
          </div>
        )}

        {/* Filtros */}
        <Card className="p-6 bg-white dark:bg-slate-800">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Filtros
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Select
              value={filters.segmento || "all"}
              onValueChange={(value) =>
                setFilters({ ...filters, segmento: value === "all" ? undefined : value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Segmento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {segmentos.map((seg) => (
                  <SelectItem key={seg} value={seg}>
                    {seg}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.producto || "all"}
              onValueChange={(value) =>
                setFilters({ ...filters, producto: value === "all" ? undefined : value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Producto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {productos.map((prod) => (
                  <SelectItem key={prod} value={prod}>
                    {prod}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.region || "all"}
              onValueChange={(value) =>
                setFilters({ ...filters, region: value === "all" ? undefined : value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Región" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {regiones.map((reg) => (
                  <SelectItem key={reg} value={reg}>
                    {reg}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.canal || "all"}
              onValueChange={(value) =>
                setFilters({ ...filters, canal: value === "all" ? undefined : value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Canal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {canales.map((can) => (
                  <SelectItem key={can} value={can}>
                    {can}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setFilters({})}
              className="w-full"
            >
              Limpiar Filtros
            </Button>
          </div>
        </Card>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Serie Temporal */}
          <Card className="p-6 bg-white dark:bg-slate-800">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Serie Temporal Mensual
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={serieMensual}>
                <defs>
                  <linearGradient id="colorMonto" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="mes"
                  tickFormatter={(value) =>
                    format(new Date(value), "MMM yy", { locale: es })
                  }
                />
                <YAxis />
                <Tooltip
                  formatter={(value: any) => formatCurrency(value)}
                  labelFormatter={(label) =>
                    format(new Date(label), "MMMM yyyy", { locale: es })
                  }
                />
                <Area
                  type="monotone"
                  dataKey="monto_total"
                  stroke="#1e3a8a"
                  fillOpacity={1}
                  fill="url(#colorMonto)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Distribución por Producto */}
          <Card className="p-6 bg-white dark:bg-slate-800">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Distribución por Producto
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={distribucionProducto}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="producto" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value: any) => formatCurrency(value)} />
                <Bar dataKey="monto_total" fill="#1e3a8a" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Distribución por Canal */}
          <Card className="p-6 bg-white dark:bg-slate-800">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Distribución por Canal
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distribucionCanal}
                  dataKey="monto_total"
                  nameKey="canal"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {distribucionCanal.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Distribución por Segmento (Barras Apiladas) */}
          <Card className="p-6 bg-white dark:bg-slate-800">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Distribución por Segmento
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={distribucionSegmento}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="segmento" />
                <YAxis />
                <Tooltip formatter={(value: any) => formatCurrency(value)} />
                <Bar dataKey="monto_total" fill="#fbbf24" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Panel de Análisis con IA */}
        {kpis && (
          <AnalysisPanel
            kpis={kpis}
            distributionData={{
              topProducts: distribucionProducto.slice(0, 3).map((p) => ({
                name: p.producto,
                amount: p.monto_total,
              })),
              topChannels: distribucionCanal.slice(0, 3).map((c) => ({
                name: c.canal,
                amount: c.monto_total,
              })),
              topSegments: distribucionSegmento.slice(0, 3).map((s) => ({
                name: s.segmento,
                amount: s.monto_total,
              })),
            }}
          />
        )}

        {/* Tabla de Operaciones */}
        <Card className="p-6 bg-white dark:bg-slate-800">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Operaciones Recientes
          </h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Institución</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead>Segmento</TableHead>
                  <TableHead>Canal</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Mora</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {operaciones.map((op) => (
                  <TableRow key={op.id}>
                    <TableCell>
                      {format(new Date(op.fecha), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell className="font-medium">
                      {op.nombre_institucion}
                    </TableCell>
                    <TableCell>{op.producto}</TableCell>
                    <TableCell>{op.segmento}</TableCell>
                    <TableCell>{op.canal}</TableCell>
                    <TableCell>{formatCurrency(op.monto)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          op.estado === "aprobado"
                            ? "default"
                            : op.estado === "rechazado"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {op.estado}
                      </Badge>
                    </TableCell>
                    <TableCell>{op.mora_dias} días</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Paginación */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Mostrando {operaciones.length} de {totalOperaciones} operaciones
            </p>
            <div className="space-x-2">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                disabled={currentPage * 50 >= totalOperaciones}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Siguiente
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
