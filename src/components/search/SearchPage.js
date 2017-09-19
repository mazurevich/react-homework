import React, {Component} from 'react'
import styled from 'styled-components'
import SearchHeader from './SearchHeader'
import {Footer, Spinner} from '../layout/index'
import SearchResult from './SearchResult'
import ResultsBar from './ResultsBar'
import {Switcher} from '../controls'
import {urlToSearchParams, search} from '../../services/searchService'


const SORT_TYPE = {
  RELEASE_DATE: 'release date',
  RATING: 'rating',
}

const StyledSwitcher = styled(Switcher)`
  ${({theme}) => `
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
  constructor(props) {
    super(props)

    this.state = {
      sortType: Object.keys(SORT_TYPE)[0],
      searchType: '',
      searchText: '',
    }
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.preformSearch = this.preformSearch.bind(this)
  }

  handleTypeChange(sortType) {
    this.setState({sortType})
  }

  componentWillMount() {
    const query = this.props.match.params.query
    const {searchType, searchText} = urlToSearchParams(query)
    this.preformSearch(searchType, searchText)
  }

  componentDidMount() {
    if (this.state.searchType) console.log('perform search')
  }

  preformSearch(type, text) {
    if (text.trim().length === 0)
      return

    this.setState({loading: true})
    search(type, text)
      .then(results => {
        this.setState({
          loading:false
        })
      })
  }

  render() {

    const query = this.props.match.params.query
    const {searchType, searchText} = urlToSearchParams(query)

    return (
      <div>
        <SearchHeader
          onSearch={this.preformSearch}
          searchType={searchType.toUpperCase()}
          searchText={searchText}
        />
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
        <SearchResult/>
        <Footer/>
      </div>
    )
  }
}

export default SearchPage
