import React from 'react'
import styled from 'styled-components'

const CardItem = styled.li`
  display: inline-block;
  margin: 0;
  width: 100%;
  padding: 10px;
  ${[1, 2, 3, 4, 5, 6]
    .reverse()
    .map(
      i => `
  @media screen and (max-width: ${120 + 350 * i}px) {
    width: ${100 / i}%;
  }
  `
    )
    .join('')};
`

export default CardItem
