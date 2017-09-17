import React from 'react'
import styled from 'styled-components'

const CardItem = styled.li`
  display: block;
  min-height: 300px;
  max-width: 280px;
  background-color: #444;
  margin: 0 10px 10px;
  @media screen and (max-width: 420px) {
    flex-grow: 1;
    max-width: initial;
    margin: 0 0 10px
  }
`

export default CardItem
