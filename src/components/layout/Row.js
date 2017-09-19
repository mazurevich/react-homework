import React from 'react'
import styled from 'styled-components'

const Row = styled.div`
  margin: 0 auto;
  margin-bottom: ${props => props.marginBottom || 15}px;
  padding: 0 15px;
  max-width: 90%;
  position: relative;
  min-width: 320px;
  @media screen and (max-width: 800px) {
    max-width: 100%;
  }
`

export default Row
