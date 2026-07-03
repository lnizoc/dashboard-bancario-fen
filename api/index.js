const express = require('express');
const path = require('path');

const app = express();

// Servir archivos estáticos desde dist/public
const publicPath = path.join(__dirname, '../dist/public');
app.use(express.static(publicPath));

// Para todas las otras rutas, servir index.html (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

module.exports = app;
