import React from 'react'
import styled from 'styled-components'

const TextInput = styled.input.attrs({
  type: 'text',
  placeholder: props => props.placeholder || '',
})`
  ${props => `
   {
    padding: 10px 15px;
    border: 0;
    ${props.black
      ? `
  color: ${props.theme.white};
  background-color: ${props.theme.black};  
  `
      : `
  color: ${props.theme.black};
  background-color: ${props.theme.white};
  `};
  }
`};
`

export default TextInput
