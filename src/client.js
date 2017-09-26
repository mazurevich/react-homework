import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App'

// eslint-disable-next-line no-underscore-dangle
const root = document.getElementById('app')

const renderApp = () => (
  <AppContainer>
    <Router>
      <App />
    </Router>
  </AppContainer>
)

render(renderApp(), root)

if (module.hot) {
  // render(renderApp(), root)
  module.hot.accept()
  render(renderApp(), root)
}
