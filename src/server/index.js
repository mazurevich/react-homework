import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../shared/App';

const app = express();

app.use(express.static('public'));

app.get('/public', (req, res) => {
  res
    .status(404) // HTTP status 404: NotFound
    .send('Not found');
});

const isDev = process.env.NODE_ENV === 'development';

let sriptPaths = [];
const cssPath = isDev
  ? 'http://localhost:8080/public/css/app.css'
  : '/public/css/app.css';
if (isDev) {
  sriptPaths = [
    'http://localhost:8080/vendor.js',
    'http://localhost:8080/common.js',
    'http://localhost:8080/app.js',
  ];
} else {
  sriptPaths = ['/vendor.js', '/common.js', '/app.js'];
}

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
      ${sriptPaths
        .map(path => `<script src="${path}" defer></script>`)
        .join('')}
    </body>
    </html>
  `);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
