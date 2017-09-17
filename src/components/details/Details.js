import React, { Component } from 'react'
import { Container, Darken, Footer, Header, Logo, Row } from '../layout/index'
import { Button } from '../controls/index'
import MovieDetails from './MovieDetails'
import ResultsBar from '../search/ResultsBar'
import SearchResult from '../search/SearchResult'

const NavLink = Button.withComponent('a').extend`
    float: right;
    margin-top: -8px;
    text-decoration: none;
`

class Details extends Component {
  render() {
    return (
      <div>
        <Header>
          <Darken>
            <Container>
              <Row>
                <Logo />
                <NavLink href="/">search</NavLink>
              </Row>
            </Container>
            <MovieDetails />
          </Darken>
        </Header>
        <ResultsBar resultText="Other bear movies" />
        <SearchResult />
        <Footer />
      </div>
    )
  }
}

export default Details
