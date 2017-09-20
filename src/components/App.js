import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { injectGlobal, ThemeProvider } from 'styled-components'
import { Switch, Route } from 'react-router-dom'
import SearchPage from '../pages/SearchPage'
import theme from './theme'
import FilmPage from '../pages/FilmPage'
import NotFound from './NotFound'

injectGlobal`
  html {
    font: 16px/20px helvetica, arial, sans-serif ;
    font-size: calc(16px + (24 - 16) * (100vw - 320px)/(1920 - 320));
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

class App extends Component {
  render() {
    return (
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
            <Route exact path="/film/:title" component={FilmPage} />
            <Route path="*" component={NotFound} />
          </Switch>
        </ThemeProvider>
      </div>
    )
  }
}

export default App
