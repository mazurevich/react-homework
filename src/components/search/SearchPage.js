import React, { Component } from 'react'
import styled from 'styled-components'
import SearchHeader from './SearchHeader'
import { Footer, Spinner } from '../layout/index'
import SearchResult from './SearchResult'
import ResultsBar from './ResultsBar'
import { Switcher } from '../controls'
import {
  urlToSearchParams,
  search,
  paramsToUrl,
} from '../../services/searchService'
import NoResult from './NoResults'

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
  @media screen and (max-width: 420px){
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

class SearchPage extends Component {
  constructor() {
    super()

    this.state = {
      sortType: Object.keys(SORT_TYPE)[0],
      searchType: '',
      searchText: '',
      movies: [],
      error: '',
    }
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.preformSearch = this.preformSearch.bind(this)
  }

  handleTypeChange(sortType) {
    this.setState({ sortType })
  }

  componentDidMount() {
    const query = this.props.match.params.query
    const { searchType, searchText } = urlToSearchParams(query)
    this.preformSearch(searchType, searchText)
  }

  preformSearch(type, text) {
    const searchUrl = `/search/${paramsToUrl(type, text)}`
    this.props.history.push(searchUrl)

    if (text.trim().length === 0) return

    this.setState({ loading: true })
    search(type, text).then(
      movies => {
        this.setState({
          movies,
          error: '',
          loading: false,
        })
      },
      error => {
        this.setState({
          error: error.message,
          movies: [],
          loading: false,
        })
      }
    )
  }

  render() {
    const query = this.props.match.params.query
    const { searchType, searchText } = urlToSearchParams(query)
    const { loading, error } = this.state
    return (
      <div>
        <SearchHeader
          onSearch={this.preformSearch}
          searchType={searchType}
          searchText={searchText}
        />
        <ResultsBar resultText={`${this.state.movies.length} was found`}>
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
        {loading && <Spinner />}
        {!loading &&
          !error && (
            <SearchResult
              movies={this.state.movies}
              loading={this.state.loading}
            />
          )}
        {error && <NoResult message={error} />}
        <Footer />
      </div>
    )
  }
}

export default SearchPage
