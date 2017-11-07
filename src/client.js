import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxPromiseMiddleware from 'redux-promise'

import routes from './routes'
import reducers from './reducers'

// eslint-disable-next-line no-underscore-dangle
const root = document.getElementById('app')

const initialState = window.__INITIAL_STATE__ || {}

// Allow the passed state to be garbage-collected
delete window.__INITIAL_STATE__

const createStoreWithMiddleware = applyMiddleware(reduxPromiseMiddleware)(
  createStore
)

const renderApp = () => (
  <AppContainer>
    <Provider store={createStoreWithMiddleware(reducers, initialState)}>
      <Router>{renderRoutes(routes)}</Router>
    </Provider>
  </AppContainer>
)

render(renderApp(), root)

if (module.hot) {
  // render(renderApp(), root)
  module.hot.accept()
  render(renderApp(), root)
}
