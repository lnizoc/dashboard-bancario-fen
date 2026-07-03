import { createServer } from 'http';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../dist/public')));

// Rutas API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Servir index.html para todas las rutas no encontradas (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

export default app;
