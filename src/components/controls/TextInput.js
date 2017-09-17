import React from 'react'
import styled from 'styled-components'

const TextInput = styled.input.attrs({
  type: 'text',
  placeholder: props => props.placeholder || '',
})`{
  padding: 10px 15px;
  border: 0;
  ${props => props.black ?
  `
  color: ${props.themewhite};
  background-color: ${props.theme.black};  
  ` : `
  color: ${props.theme.black};
  background-color: ${props.theme.white};
  `
  }
}`

export default TextInput
