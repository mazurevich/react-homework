import React, { Component } from 'react';
import path from './1.png';
import Helmet from 'react-helmet';
import styled, { injectGlobal } from 'styled-components';

injectGlobal`
  body {
    margin: 0;
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
              content:
                'React starter kit based on Atomic Design with React Router v4, Webpack, Redux, Server Side Rendering and more.',
            },
            { property: 'og:site_name', content: 'ARc' },
            {
              property: 'og:image',
              content: 'https://diegohaz.github.io/arc/thumbnail.png',
            },
            { property: 'og:image:type', content: 'image/png' },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '630' },
          ]}
          link={[
            { rel: 'icon', href: 'https://diegohaz.github.io/arc/icon.png' },
          ]}
        />
        some text here
        {path}
      </div>
    );
  }
}

export default App;
