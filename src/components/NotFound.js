import React from 'react'
import styled from 'styled-components'
import { Container, Row } from './layout/index'

const NotFound = ({ className }) => {
  return (
    <Container className={className}>
      <Row marginBottom="40">
        <div className="code">404</div>
      </Row>
      <Row>Page was not found</Row>
    </Container>
  )
}

const StyledNotFound = styled(NotFound)`
  margin-top: 10vh;
  text-align: center;
  color: #555;

  .code {
    font-size: 5rem;
  }
`

export default StyledNotFound
