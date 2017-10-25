import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxPromiseMiddleware from 'redux-promise'
import { Switch, Route } from 'react-router-dom'
import { injectGlobal, ThemeProvider } from 'styled-components'
import Helmet from 'react-helmet'

import reducers from '../reducers'
import SearchPage from '../pages/SearchPage'
import theme from './theme'
import FilmPage from '../pages/FilmPage'
import NotFound from './NotFound'

injectGlobal`
  html {
    font: 16px/20px helvetica, arial, sans-serif ;
    font-size: calc(16px + (20 - 16) * (100vw - 320px)/(1920 - 320));
  }

  body {
    margin: 0;
    background-color: #f5f5f1;
  }
  * {
    box-sizing: border-box;
  }
  
  main {
    min-height: 100vh;
    position: relative;
    padding-bottom: 40px;
  }
`

const createStoreWithMiddleware = applyMiddleware(reduxPromiseMiddleware)(
  createStore
)

class App extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <div>
          <Helmet
            title="Netflix roulette"
            meta={[
              {
                name: 'description',
                content: 'Netflix search application',
              },
              {
                name: 'theme-color',
                content: theme.black,
              },
            ]}
            link={[
              {
                rel: 'icon',
                href:
                  'https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.ico',
              },
            ]}
          />
          <ThemeProvider theme={theme}>
            <Switch>
              <Route exact path="/" component={SearchPage} />
              <Route exact path="/search/:query" component={SearchPage} />
              <Route exact path="/:type/:id" component={FilmPage} />
              <Route path="*" component={NotFound} />
            </Switch>
          </ThemeProvider>
        </div>
      </Provider>
    )
  }
}

export default App
