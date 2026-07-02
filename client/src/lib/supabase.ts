import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para las vistas
export interface KPI {
  total_operaciones: number;
  monto_total: number;
  ticket_promedio: number;
  porcentaje_aprobacion: number;
  mora_media: number;
  riesgo_promedio: number;
  total_instituciones: number;
  meses_cubiertos: number;
}

export interface SerieMensual {
  mes: string;
  operaciones: number;
  monto_total: number;
  ticket_promedio: number;
  porcentaje_aprobacion: number;
  mora_media: number;
}

export interface DistribucionProducto {
  producto: string;
  operaciones: number;
  monto_total: number;
  ticket_promedio: number;
  porcentaje_aprobacion: number;
  mora_media: number;
}

export interface DistribucionSegmento {
  segmento: string;
  operaciones: number;
  monto_total: number;
  ticket_promedio: number;
  porcentaje_aprobacion: number;
  mora_media: number;
}

export interface DistribucionCanal {
  canal: string;
  operaciones: number;
  monto_total: number;
  ticket_promedio: number;
  porcentaje_aprobacion: number;
  mora_media: number;
  porcentaje_digital: number;
}

export interface TopInstitucion {
  nombre_institucion: string;
  codigo_cmf: string;
  operaciones: number;
  monto_total: number;
  ticket_promedio: number;
  porcentaje_aprobacion: number;
  mora_media: number;
}

export interface Operacion {
  id: number;
  fecha: string;
  nombre_institucion: string;
  segmento: string;
  region: string;
  canal: string;
  producto: string;
  estado: string;
  monto: number;
  mora_dias: number;
  score_riesgo: number;
}

// Funciones para obtener datos
export async function getKPIs() {
  const { data, error } = await supabase.from("v_kpis").select("*").single();
  if (error) throw error;
  return data as KPI;
}

export async function getSerieMensual() {
  const { data, error } = await supabase
    .from("v_serie_mensual")
    .select("*")
    .order("mes", { ascending: false });
  if (error) throw error;
  return data as SerieMensual[];
}

export async function getDistribucionProducto() {
  const { data, error } = await supabase
    .from("v_por_producto")
    .select("*")
    .order("monto_total", { ascending: false });
  if (error) throw error;
  return data as DistribucionProducto[];
}

export async function getDistribucionSegmento() {
  const { data, error } = await supabase
    .from("v_por_segmento")
    .select("*")
    .order("monto_total", { ascending: false });
  if (error) throw error;
  return data as DistribucionSegmento[];
}

export async function getDistribucionCanal() {
  const { data, error } = await supabase
    .from("v_por_canal")
    .select("*")
    .order("monto_total", { ascending: false });
  if (error) throw error;
  return data as DistribucionCanal[];
}

export async function getTopInstituciones() {
  const { data, error } = await supabase
    .from("v_top_instituciones")
    .select("*");
  if (error) throw error;
  return data as TopInstitucion[];
}

// Función para obtener operaciones con filtros
export async function getOperaciones(
  filters?: {
    fechaInicio?: string;
    fechaFin?: string;
    segmento?: string;
    producto?: string;
    region?: string;
    canal?: string;
  },
  page = 1,
  pageSize = 50
) {
  let query = supabase.from("operaciones").select("*", { count: "exact" });

  if (filters?.fechaInicio) {
    query = query.gte("fecha", filters.fechaInicio);
  }
  if (filters?.fechaFin) {
    query = query.lte("fecha", filters.fechaFin);
  }
  if (filters?.segmento) {
    query = query.eq("segmento", filters.segmento);
  }
  if (filters?.producto) {
    query = query.eq("producto", filters.producto);
  }
  if (filters?.region) {
    query = query.eq("region", filters.region);
  }
  if (filters?.canal) {
    query = query.eq("canal", filters.canal);
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await query
    .order("fecha", { ascending: false })
    .range(from, to);

  if (error) throw error;

  return {
    data: data as Operacion[],
    total: count || 0,
    page,
    pageSize,
  };
}

// Función para obtener valores únicos para filtros
export async function getUniqueValues(column: string) {
  const { data, error } = await supabase
    .from("operaciones")
    .select(column)
    .neq(column, null);

  if (error) throw error;

  const uniqueSet = new Set(data?.map((row: any) => row[column]));
  const unique = Array.from(uniqueSet).sort();
  return unique;
}
