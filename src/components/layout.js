import React from 'react'
import styled from 'styled-components'

const LogoText = styled.span`{
  color: ${props => props.theme.red};
  font-weight: bold;
}`

const Logo = props => (<LogoText>netflixroulette</LogoText>)

const Container = styled.div`{
  padding: 15px 0;
  background: ${props => props.bgColor || 'none'};
}`

const Row = styled.div`{
  margin: 0 auto;
  margin-bottom: ${props => props.marginBottom || 15}px;;
  padding: 0 15px;
  max-width: ${props => props.theme.rowWidth}px;
  position: relative;
  min-width: 320px;
  ${props => [100,300, 500].map(widthDiv => `
    @media screen and (min-width: ${+props.theme.rowWidth + widthDiv + 200}px) {
      max-width: ${+props.theme.rowWidth + widthDiv}px;
    } 
  `).join('\n')}
  
}`

const CardsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px 0 0 0;
  margin: 0;
`

const CardItem = styled.li`
  display: block;
  min-height: 300px;
  max-width: 220px;
  background-color: #444;
  margin: 0 10px 10px;
  @media screen and (max-width: 420px) {
    flex-grow: 1;
    max-width: initial;
    margin: 0 0 10px
  }
`

export {Row, Container, Logo, CardsList, CardItem}


