import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const propTypes = {
  genres: PropTypes.array,
}

const defaultProps = {
  genres: [],
}

const MovieCard = ({ className, year, title, genres, id, type }) => {
  return (
    <Link className={className} to={`/${type}/${id}`}>
      <div className="resizable">
        <div className="poster" />
        <div className="card-footer">
          <span className="year">{year}</span>
          <h2 className="title">{title}</h2>
          <p className="category">{genres.join(', ')}</p>
        </div>
      </div>
    </Link>
  )
}
MovieCard.propTypes = propTypes
MovieCard.defaultProps = defaultProps

const StyledMovieCard = styled(MovieCard)`
  ${({ theme, poster }) => `
  text-decoration: none;
  height: 100%;
  width: 100%;
  display: block;
  color: ${theme.white};
  box-shadow: 0 3px 0 0 ${theme.red};
  
  .resizable {
    position: relative;
    padding-top: 170%;
    background: #444;
  }
  .poster {
    background: url(${poster}) 50% 50% no-repeat;
    background-size: cover;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
  .card-footer{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    padding: 5px 8px;
    background-color: ${theme.black};
    opacity: .96;
  }
  .title {
    text-transform: uppercase;
    font-size: 1rem;
    display: inline;
   }
  .year {
    font-size: .7em;
    font-weight: bold;
    float: right;
    border: 1px solid #666;
    border-radius: 4px;
    padding: 0px 10px;
  }
  .category {
    font-size: .9em;
    color: #666;
    margin: 10px 0 0 0 ;     
  }`};
`

export default StyledMovieCard
