import React from 'react'
import styled from 'styled-components'

const TextLine = styled.span`
  line-height: ${props => props.lh || '1.2rem'};
  font-size: ${props => props.fs || '1rem'};
  text-transform: ${props => props.tt || 'inherit'};
  color: ${props => props.c || '#000'};
  vertical-align: middle;
`

export default TextLine
