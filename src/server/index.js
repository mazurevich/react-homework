import express from 'express';
import React from 'react';
import App from '../shared/App';
import { ServerStyleSheet } from 'styled-components'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { env, port, ip, basename } from '../config'
import Html from '../shared/Html'

const isDev = process.env.NODE_ENV === 'development';

const app = express()
app.use(express.static('public'));

app.get('/public', (req, res) => {
  res
    .status(404) // HTTP status 404: NotFound
    .send('Not found');
});

app.get('*', (req, res) => {
  if (isDev) {
    global.webpackIsomorphicTools.refresh()
  }

  const content = renderToString(<App/>)
  const sheet = new ServerStyleSheet()
  const styles = sheet.getStyleTags() // or sheet.getStyleElement()

  const assets = global.webpackIsomorphicTools.assets()
  const markup = <Html {...{ styles, assets, content }} />
  const html = renderToStaticMarkup(markup)
  const doctype = '<!doctype html>\n'

  res.send(doctype + html);
});




app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`local: http://${ip}:${port}`)
  }
});
