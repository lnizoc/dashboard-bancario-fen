import { createServer } from 'http';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Servir archivos estáticos desde dist/public
const publicPath = path.join(__dirname, '../dist/public');
app.use(express.static(publicPath));

// Para todas las otras rutas, servir index.html (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

export default app;
