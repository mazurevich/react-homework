import React, {Component} from 'react'
import styled from 'styled-components'
import {Container, Row} from '../layout/index'

class MovieDetails extends Component {
  render() {
    const {
      className,
      show_title,
      release_year,
      rating,
      category,
      show_cast,
      director,
      summary,
      poster,
      runtime,
    } = this.props

    return (
      <Container>
        <Row className={className}>
          <div className="movie-poster">
            <img src={poster} alt="" className="poster"/>
          </div>
          <div className="movie-info">
            <h2 className="title">{show_title}</h2>
            <div className="rating">{rating}</div>
            <p className="category">{category}</p>
            <span className="numbers">
              <span className="year">{release_year}</span>{' '}
              <span className="duration">{runtime}</span>
            </span>
            <p className="description">{summary}</p>
            <p className="director">Director: {director}</p>
            <p className="cast">{show_cast}</p>
          </div>
        </Row>
      </Container>
    )
  }
}

const StyledMovieDetails = styled(MovieDetails)`
  ${props => `
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  color: #ccc;
  > div {
    flex-basis: 300px;
  }
  
  .movie-poster {
    margin-right: 40px;
    @media screen and (max-width: 420px){
      flex-grow: 1;
      margin-right: 0px;
    }
    > img {
      width: 100%;
      height: auto;
      border-bottom: 3px solid red;
    }
  }
  
  .movie-info {
    flex-grow: 1;
    padding: 20px 0 0;
    @media screen and (max-width: 420px){
      padding: 0;
      margin-top: 20px;
    }
  }
  
  .title {
    font-size: 1.4rem;
    margin: 0;
    display:inline-block;
    color: ${props.theme.red}; 
  }
  
  .rating {
    display: inline-block;
    height: 2.5rem;
    width: 2.5rem;
    text-align:center;
    border-radius: 50%;
    border: 2px solid ${props.theme.red};
    color: ${props.theme.white};
    line-height: 2.3rem;
    font-size: 1.1rem;
    margin-top: -10px;
    margin-left: 40px;
  }
  
  .category {
    font-size: 1.1rem;
    margin: -5px 0 20px;
  }
  
  .numbers {
    color: ${props.theme.white};
    font-weight:bold;
    font-size: 1.2rem;
  }
  
  .description {
    margin: 30px 0;
  }
  
  .duration {
    margin-left: 30px;
  }
  .director {
    font-size: .7rem;
  }
  .cast {
    font-size:.8rem;
  }
`};
`

export default StyledMovieDetails
