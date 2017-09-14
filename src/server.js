import path from 'path'
import express from 'express'
import React from 'react'
import App from './components/App'
import { ServerStyleSheet } from 'styled-components'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { env, port, ip, basename } from './config'
import Html from './components/Html'
import { StaticRouter } from 'react-router-dom'

const isDev = process.env.NODE_ENV === 'development'

const app = express()
app.use('/public', express.static(path.join(__dirname, '../public')))

app.get('*', (req, res) => {
  if (isDev) {
    global.webpackIsomorphicTools.refresh()
  }

  const content = renderToString(
    <StaticRouter context={{}}>
      <App />
    </StaticRouter>
  )
  const sheet = new ServerStyleSheet()
  const styles = sheet.getStyleTags() // or sheet.getStyleElement()

  const assets = global.webpackIsomorphicTools.assets()
  const markup = <Html {...{ styles, assets, content }} />
  const html = renderToStaticMarkup(markup)
  const doctype = '<!doctype html>\n'

  res.send(doctype + html)
})

app.listen(port, error => {
  if (error) {
    console.error(error)
  } else {
    console.info(`local: http://${ip}:${port}`)
  }
})
