import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import { fetchMovies, setLoading } from '../actions/index'

import SearchHeader from '../components/search/SearchHeader'
import SearchResult from '../components/search/SearchResult'
import ResultsBar from '../components/search/ResultsBar'
import NoResult from '../components/search/NoResults'
import { Switcher } from '../components/controls/index'
import { Footer, Spinner } from '../components/layout/index'
import { urlToSearchParams, paramsToUrl } from '../services/searchService'

const propTypes = {
  movies: PropTypes.array,
  loading: PropTypes.bool,
}

const defaultProps = {
  movies: [],
  loading: false,
}

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

function createSortingFunc(field) {
  return (m1, m2) => {
    const value1 = m1[field]
    const value2 = m2[field]
    if (value1 < value2) return -1
    if (value2 < value1) return 1
    return 0
  }
}

const SORT = {
  RATING: createSortingFunc('rating'),
  RELEASE_DATE: createSortingFunc('release_year'),
}

class SearchPage extends Component {
  constructor() {
    super()

    this.state = {
      sortType: Object.keys(SORT_TYPE)[0],
    }
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.performSearch = this.performSearch.bind(this)
  }

  componentDidMount() {
    const query = this.props.match.params.query
    const { searchType, searchText } = urlToSearchParams(query)
    this.performSearch(searchType, searchText, true)
  }

  componentDidUpdate(prevProps) {
    const { query } = this.props.match.params
    if (prevProps.match.params.query !== query) {
      const { searchType, searchText } = urlToSearchParams(query)
      this.performSearch(searchType, searchText, true)
    }
  }

  handleTypeChange(sortType) {
    this.setState({ sortType })
  }

  performSearch(type, text, doNotTouchHistory) {
    if (text.trim().length === 0) return

    const searchUrl = `/search/${paramsToUrl(type, text)}`
    this.props.setLoading('search', 'loading')
    this.props.fetchMovies(type, text)
    !doNotTouchHistory && this.props.history.push(searchUrl)
  }

  sort(movies) {
    return [...movies].sort(SORT[this.state.sortType])
  }

  render() {
    const query = this.props.match.params.query
    const { searchType, searchText } = urlToSearchParams(query)
    const { errorMsg, success, movies, loading } = this.props

    const sortedMovies = this.sort(movies)
    return (
      <div>
        <SearchHeader
          onSearch={this.performSearch}
          searchType={searchType}
          searchText={searchText}
        />
        <ResultsBar resultText={`${this.props.movies.length} was found`}>
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
          success && <SearchResult movies={sortedMovies} loading={loading} />}
        {errorMsg && <NoResult message={errorMsg} />}
        <Footer />
      </div>
    )
  }
}

SearchPage.propTypes = propTypes
SearchPage.defaultProps = defaultProps

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchMovies, setLoading }, dispatch)

const mapStateToProps = ({
  search: { movies, errorMsg, success, loading },
}) => ({ movies, errorMsg, success, loading })

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
