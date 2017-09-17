import React, {Component} from 'react'
import Helmet from 'react-helmet'
import {injectGlobal, ThemeProvider} from 'styled-components'
import {Switch, Route} from 'react-router-dom'
import Home from './search/Search'
import theme from './theme'
import Details from './details/Details'

injectGlobal`
  html {
    font: 16px/20px helvetica, arial, sans-serif ;
    @media screen and (max-width: 420px) {
      font-size: 18px;
      line-height: 24px
    }
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
          titleTemplate="ARc - %s"
          meta={[
            {
              name: 'description',
              content: 'Netflix search application',
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
            <Route exact path="/" component={Home}/>
            <Route exact path="/details" component={Details}/>
          </Switch>
        </ThemeProvider>
      </div>
    )
  }
}

export default App
