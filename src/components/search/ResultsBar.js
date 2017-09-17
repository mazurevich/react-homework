import React, { Component } from 'react'
import styled from 'styled-components'
import { Container, Row } from '../layout'

const Bar = props => (
  <Container className={props.className}>
    <Row marginBottom="0">
      <span className="controls">{props.children}</span>
      <span className="result">{props.text}</span>
    </Row>
  </Container>
)

const StyledBar = styled(Bar)`
  font-weight: bold;
  padding: 10px 0;
  background-color: #d2d2d2;
  .controls {
    float: right;
  }
`
const ResultsBar = ({ children, resultText }) => {
  return (
    <StyledBar text={resultText}>
      <span className="sort-group">{children}</span>
    </StyledBar>
  )
}

export default ResultsBar
