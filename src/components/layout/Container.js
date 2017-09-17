import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 15px 0;
  background: ${props => props.bgColor || 'none'};
`

export default Container
