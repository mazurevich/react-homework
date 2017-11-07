import path from 'path'
import express from 'express'
import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reduxPromiseMiddleware from 'redux-promise'
import App from './components/App'
import { ServerStyleSheet } from 'styled-components'
import { renderToString } from 'react-dom/server'
import { renderRoutes, matchRoutes } from 'react-router-config'
import { env, port, ip, basename } from './config'
import Html from './components/Html'
import { StaticRouter } from 'react-router-dom'
import routes from './routes'
import reducers from './reducers/index'
import serialize from 'serialize-javascript'

const createStoreWithMiddleware = applyMiddleware(reduxPromiseMiddleware)(
  createStore
)

const isDev = process.env.NODE_ENV === 'development'

const app = express()
app.use('/public', express.static(path.join(__dirname, '../public')))

app.get('*', (req, res) => {
  const branch = matchRoutes(routes, req.url)

  if (isDev) {
    global.webpackIsomorphicTools.refresh()
  }

  const store = createStoreWithMiddleware(reducers)

  const assets = global.webpackIsomorphicTools.assets()

  const promises = branch.map(({ route, match }) => {
    const fetchData = route.component.fetchData
    return fetchData !== undefined
      ? fetchData(store, match)
      : Promise.resolve('')
  })

  Promise.all(promises).then(() => {
    const stateStr = `window.__INITIAL_STATE__ = ${serialize(store.getState())}`

    const sheet = new ServerStyleSheet()
    const styles = sheet.getStyleTags()
    const doctype = '<!doctype html>\n'

    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.params[0] || '/'} context={{}}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    )
    const markup = <Html {...{ styles, assets, content, state: stateStr }} />
    const html = renderToString(markup)
    res.send(`${doctype}${html}`)
  })
})

app.listen(port, error => {
  if (error) {
    console.error(error)
  } else {
    console.info(`local: http://${ip}:${port}`)
  }
})
