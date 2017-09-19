import React, { Component } from 'react'
import { Container, Row, CardsList, CardItem } from '../layout'
import MovieCard from './MovieCard'
import NoResulst from './NoResults'
import { Spinner } from '../layout/index'

class SearchResult extends Component {
  constructor() {
    super()

    this.state = {
      movies: [
        {
          id: 'someId',
          title: 'Owesome title',
          category: 'Comedies',
          year: 2012,
          imgSrc: 'http://placebear.com/400/500',
        },
        {
          id: 'someId1',
          title: 'Owesome title',
          category: 'Comedies',
          year: 2012,
          imgSrc: 'http://placebear.com/400/500',
        },
        {
          id: 'someId2',
          title: 'Owesome title',
          category: 'Comedies',
          year: 2012,
          imgSrc: 'http://placebear.com/400/500',
        },
        {
          id: 'someId3',
          title: 'Owesome title',
          category: 'Comedies',
          year: 2012,
          imgSrc: 'http://placebear.com/400/500',
        },
      ],
    }
  }

  render() {
    const {movies} = this.state
    const { loading } = this.state

    return (
      <Container>
        <Row>
          {loading && <Spinner />}
          {!loading && (
            <CardsList>
              {movies.length > 0 &&
                movies.map(movie => (
                  <CardItem key={movie.id}>
                    <MovieCard {...movie} />
                  </CardItem>
                ))}
              {movies.length === 0 && <NoResulst />}
            </CardsList>
          )}
        </Row>
      </Container>
    )
  }
}

export default SearchResult
