import React, {Component} from 'react'
import styled from 'styled-components'
import {Container, Row} from './layout'
import Switcher from './Switcher'
// import SwitcherFrom ''

const Bar = (props) => (
  <Container className={props.className}>
    <Row marginBottom="0">
      <span className="controls">
        {props.children}
      </span>
      <span className="result">{props.text}</span>
    </Row>
  </Container>
)

const StyledBar = styled(Bar)`
  font-weight: bold;
  padding: 10px 0;
  background-color:#ddd;
  .controls {
    float: right;
  }
`

const StyledSwitcher = styled(Switcher)`${({theme}) => `
  input {
    display: none;
  }
  > span:first-child {
    text-transform:capitalize;
  }
  @media screen and (max-width: 400px){
    > span:first-child {
      display: none;
    }
  }
  label {
    color: ${theme.black};
    margin-left: 10px;
    cursor: pointer;
  }
  input:checked + label {
    color: ${theme.red};
  }
`}`



const SORT_TYPE = {
  RELEASE_DATE: 'release date',
  RATING: 'rating',
}

class ResultsBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sortType: Object.keys(SORT_TYPE)[0],
    }

    this.handleTypeChange = this.handleTypeChange.bind(this)
  }

  handleTypeChange(sortType) {
    this.setState({sortType})
  }

  render() {
    const resultLength = 7
    const resultText = `${resultLength} movies found`

    return (
      <StyledBar text={resultText}>
        <span className="sort-group">
            <StyledSwitcher
              key={0}
              label="Sort by"
              opts={SORT_TYPE}
              id="sort-type"
              name="sortType"
              onChange={this.handleTypeChange}
              value={this.state.sortType}
            />
          </span>
      </StyledBar>
    )
  }
}

export default ResultsBar
