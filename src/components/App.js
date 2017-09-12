import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styled, { injectGlobal } from 'styled-components';
import {Switch, Route } from 'react-router-dom';
import Home from './Home/Home';

injectGlobal`
  body {
    margin: 0;
    background: url(/public/img/background.jpg);
  }
`;

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
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
