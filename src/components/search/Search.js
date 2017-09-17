import React, { Component } from 'react'
import styled from 'styled-components'

import SearchHeader from './SearchHeader'
import { Footer } from '../layout/index'
import SearchResult from './SearchResult'
import ResultsBar from './ResultsBar'
import { Switcher } from '../controls'

const SORT_TYPE = {
  RELEASE_DATE: 'release date',
  RATING: 'rating',
}

const StyledSwitcher = styled(Switcher)`
  ${({ theme }) => `
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
`};
`

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sortType: Object.keys(SORT_TYPE)[0],
    }
    this.handleTypeChange = this.handleTypeChange.bind(this)
  }

  handleTypeChange(sortType) {
    this.setState({ sortType })
  }

  render() {
    return (
      <div>
        <SearchHeader />
        <ResultsBar resultText="24 movies found">
          <StyledSwitcher
            key={0}
            label="Sort by"
            opts={SORT_TYPE}
            id="sort-type"
            name="sortType"
            onChange={this.handleTypeChange}
            value={this.state.sortType}
          />
        </ResultsBar>
        <SearchResult />
        <Footer />
      </div>
    )
  }
}

export default Home
