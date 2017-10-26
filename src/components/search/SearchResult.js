import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, CardsList, CardItem } from '../layout'
import MovieCard from './MovieCard'

const propTypes = {
  movies: PropTypes.array,
}

const defaultProps = {
  movies: [],
}

class SearchResult extends Component {
  render() {
    const { movies } = this.props

    return (
      <Container>
        <Row>
          <CardsList>
            {movies.map(movie => (
              <CardItem key={movie.id}>
                <MovieCard {...movie} />
              </CardItem>
            ))}
          </CardsList>
        </Row>
      </Container>
    )
  }
}

SearchResult.propTypes = propTypes
SearchResult.defaultProps = defaultProps

export default SearchResult
