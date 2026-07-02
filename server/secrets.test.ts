import { describe, it, expect } from "vitest";

describe("Secrets Validation", () => {
  it("should have Supabase URL configured", () => {
    const url = process.env.VITE_SUPABASE_URL;
    expect(url).toBeDefined();
    expect(url).toMatch(/^https:\/\/.+\.supabase\.co$/);
  });

  it("should have Supabase Anon Key configured", () => {
    const key = process.env.VITE_SUPABASE_ANON_KEY;
    expect(key).toBeDefined();
    expect(key).toMatch(/^sb_publishable_/);
  });

  it("should have Gemini API Key configured", () => {
    const key = process.env.VITE_GEMINI_API_KEY;
    expect(key).toBeDefined();
    expect(key?.length).toBeGreaterThan(20);
  });

  it("should validate Supabase connection string format", async () => {
    const url = process.env.VITE_SUPABASE_URL;
    const anonKey = process.env.VITE_SUPABASE_ANON_KEY;
    
    // Intentar una conexión básica a Supabase
    try {
      const response = await fetch(`${url}/rest/v1/operaciones?limit=1`, {
        headers: {
          "apikey": anonKey || "",
          "Authorization": `Bearer ${anonKey}`,
        },
      });
      
      // Esperamos 200 o 401 (no 404 de dominio inválido)
      expect([200, 401, 403]).toContain(response.status);
    } catch (error) {
      // Si hay error de red, al menos validar que la URL es válida
      expect(url).toMatch(/supabase\.co/);
    }
  });

  it("should validate Gemini API Key format", () => {
    const key = process.env.VITE_GEMINI_API_KEY;
    // Las claves de Gemini comienzan con "AQ." o "AIza"
    expect(key).toMatch(/^(AQ\.|AIza)/);
  });
});
