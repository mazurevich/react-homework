import React from 'react'
import styled from 'styled-components'
import { Container, Row } from '../layout/index'

const NoResultsStyles = styled.div`
  text-transform: capitalize;
  font-size: 2rem;
  height: 20vh;
  line-height: 20vh;
  vertical-align: middle;
  color: #777;
`

const NoResult = ({ message }) => {
  return (
    <Container>
      <Row>
        <NoResultsStyles>{message}</NoResultsStyles>
      </Row>
    </Container>
  )
}

export default NoResult
