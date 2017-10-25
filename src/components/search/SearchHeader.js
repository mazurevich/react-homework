import React, { Component } from 'react'
import styled from 'styled-components'
import { Container, Row, Logo, Header, Darken } from '../layout'
import { Switcher, Button, TextInput } from '../controls'
import { H2, TextLine } from '../typography'
import {
  SEARCH_TYPE,
} from '../../services/searchService'

const SearchInput = TextInput.extend`
  width: 100%;
  padding-right: 70px;
  box-shadow: 0 2px 0 0 ${props => props.theme.red};
`

const SearchIcon = styled.span`
   {
    display: inline-block;
    text-align: center;
    position: absolute;
    line-height: 35px;
    top: 1px;
    bottom: 1px;
    width: 40px;
    color: #444;
    right: 16px;
    border: 0;
    background-color: ${props => props.theme.black};
  }
`

const StyledSwitcher = styled(Switcher)`
   {
    input {
      display: none;
    }
    > span:first-child {
      margin-right: 20px;
    }
    @media screen and (max-width: 420px) {
      > span:first-child {
        display: none;
      }
    }
    label {
      padding: 5px 15px;
      border-radius: 2px;
      background: #666;
      margin-right: 20px;
      cursor: pointer;
    }
    input:checked + label {
      background: ${props => props.theme.red || 'red'};
    }
  }
`

const SearchButton = Button.extend`
  text-decoration: none;
  background-color: ${props => props.theme.red};
  color: ${props => props.theme.white};
  padding-left: 40px;
  padding-right: 40px;
  float: right;
  @media screen and (max-width: 480px) {
    padding-left: 8px;
    padding-right: 8px;
  }
`

class SearchHeader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchType: props.searchType,
      searchText: props.searchText,
      loading: true,
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.submitSearch = this.submitSearch.bind(this)
  }

  handleInputChange(e) {
    this.setState({ searchText: e.currentTarget.value })
  }

  submitSearch(e) {
    e.preventDefault()
    this.props.onSearch(this.state.searchType, this.state.searchText)
  }

  handleTypeChange(searchType) {
    this.setState({ searchType })
  }

  render() {
    return (
      <Header>
        <Darken>
          <Container>
            <Row marginBottom={40}>
              <Logo />
            </Row>
            <Row>
              <H2 color="#fff">Find your movie</H2>
            </Row>
            <form onSubmit={this.submitSearch}>
              <Row>
                <SearchInput
                  black
                  placeholder="Input your search query here"
                  value={this.state.searchText}
                  onChange={this.handleInputChange}
                />
                <SearchIcon>
                  <i className="fa fa-search" aria-hidden="true" />
                </SearchIcon>
              </Row>
              <Row>
                <TextLine fs="12px" lh="18px" c="#fff" tt="uppercase">
                  <StyledSwitcher
                    key={0}
                    label="search by:"
                    opts={SEARCH_TYPE}
                    id="search-type"
                    name="type"
                    onChange={this.handleTypeChange}
                    value={this.state.searchType}
                  />
                </TextLine>
                <SearchButton type="submit">search</SearchButton>
              </Row>
            </form>
          </Container>
        </Darken>
      </Header>
    )
  }
}

export default SearchHeader
