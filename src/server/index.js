import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../shared/App';

const app = express();

app.use(express.static('public'));

const isDev = process.env.NODE_ENV === 'development';

const cssPath = isDev
  ? 'http://localhost:8080/public/css/main.css'
  : '/public/css/main.css';
const jsPath = isDev ? 'http://localhost:8080/bundle.js' : '/bundle.js';

app.get('*', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>First React app</title>
      <link rel="stylesheet" href="${cssPath}">
    </head>
    <body>
      <div id="app">${renderToString(<App />)}</div>
      <script src="${jsPath}" defer></script>
    </body>
    </html>
  `);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
