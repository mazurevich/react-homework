import React, {Component} from 'react'
import Helmet from 'react-helmet'
import styled, {injectGlobal, ThemeProvider} from 'styled-components'
import {Switch, Route} from 'react-router-dom'
import Home from './Home/Home'

injectGlobal`
  body {
    margin: 0;
    background-color: #f5f5f1;
    font: 14px/18px helvetica, arial, sans-serif ;
  }
  * {
    box-sizing: border-box;
  }
`

const theme = {
  red: '#e50914',
  white: '#fff',
  black: '#221f1f',
  rowWidth: '800px',
}



class App extends Component {
  render() {
    return (
      <div>
        <Helmet
          title="Atomic React"
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
          </Switch>
        </ThemeProvider>
      </div>
    )
  }
}

export default App
