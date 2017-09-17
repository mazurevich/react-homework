import React from 'react'
import styled from 'styled-components'

const Row = styled.div`
  margin: 0 auto;
  margin-bottom: ${props => props.marginBottom || 15}px;
  padding: 0 15px;
  max-width: ${props => props.theme.rowWidth}px;
  position: relative;
  min-width: 320px;
  ${props =>
    [100, 300, 500]
      .map(
        widthDiv => `
    @media screen and (min-width: ${+props.theme.rowWidth + widthDiv + 200}px) {
      max-width: ${+props.theme.rowWidth + widthDiv}px;
    } 
  `
      )
      .join('\n')};
`

export default Row
