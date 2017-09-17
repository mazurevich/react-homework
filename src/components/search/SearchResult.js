import React, {Component} from 'react'
import {Container, Row, CardsList, CardItem} from '../layout'
import MovieCard from './MovieCard'

class SearchResult extends Component {
  constructor(props) {
    super(props)

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

    return (
      <Container>
        <Row>
          <CardsList>
            {movies.map(movie => (
              <CardItem key={movie.id}>
                <MovieCard  {...movie}/>
              </CardItem>
            ))}
          </CardsList>
        </Row>
      </Container>
    )
  }
}

export default SearchResult
