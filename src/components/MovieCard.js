import React from 'react'
import styled from 'styled-components'


const MovieCard = ({imgSrc, year, title, jenra, id, className}) => {
  return (
    <a className={className} href="#">
      <img className="poster" src={imgSrc} alt={`${title} poster`}/>
      <div className="card-footer">
        <span className="year">{year}</span>
        <h2 className="title">{title}</h2>
        <p className="jenra">{jenra}</p>
      </div>
    </a>
  )
}

const StyledMovieCard = styled(MovieCard)`
${({theme}) => `
  text-decoration: none;
  background-color: ${theme.black};
  height: 100%;
  width: 100%;
  display: block;
  color: ${theme.white};
  box-shadow: 0 3px 0 0 ${theme.red};
  
  .poster {
    width: 100%;
    height: auto;
  }
  .card-footer{
    padding: 5px 8px;
  }
  .title {
    text-transform: uppercase;
    font-size: 1.2em;
    display: inline;
   }
  .year {
    font-size: .8em;
    font-weight: bold;
    float: right;
    border: 1px solid #666;
    border-radius: 4px;
    padding: 0px 10px;
  }
  .jenra {
    font-size: .9em;
    color: #666;
    margin: 10px 0 0 0 ;     
  }`}
`

export default StyledMovieCard
