import React, { Component } from 'react'
import { Container, Row, CardsList, CardItem } from '../layout'
import MovieCard from './MovieCard'
import NoResulst from './NoResults'
import { Spinner } from '../layout/index'

class SearchResult extends Component {
  constructor() {
    super()
  }

  render() {
    const { movies } = this.props

    return (
      <Container>
        <Row>
          <CardsList>
            {movies.map(movie => (
              <CardItem key={movie.show_id}>
                <MovieCard {...movie} />
              </CardItem>
            ))}
          </CardsList>
        </Row>
      </Container>
    )
  }
}

export default SearchResult
