import React from 'react'
import styled from 'styled-components'

const NoResultsStyles = styled.div`
  text-transform: capitalize;
  font-size: 2rem;
  height: 20vh;
  line-height: 20vh;
  vertical-align: middle;
  color: #777;
`

const NoResult = () => {
  return <NoResultsStyles>No films found</NoResultsStyles>
}

export default NoResult
