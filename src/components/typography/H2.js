import React from 'react'
import styled from 'styled-components'

const H2 = styled.h2`
  text-transform: uppercase;
  margin: 0;
  font-size: 1rem;
  color: ${props => props.color || '#000'};
`

export default H2
