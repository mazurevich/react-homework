import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  ${props => `
    text-transform: uppercase;
    font-size: .8rem;
    line-height: 1rem;
    padding: 8px 15px;
    border: 0px;
    border-radius: 3px;
    font-weight: bold;
    background-color: ${props.theme.white || 'white'};
    cursor: pointer;
    color: ${props.theme.red || 'black'}
`};
`

export default Button
