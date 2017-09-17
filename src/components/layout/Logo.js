import React from 'react'
import styled from 'styled-components'

const LogoText = styled.span`
  color: ${props => props.theme.red};
  font-weight: bold;
`

const Logo = () => <LogoText>netflixroulette</LogoText>

export default Logo
