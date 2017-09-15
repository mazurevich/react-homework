import React, {Component} from 'react'
import styled from 'styled-components'
import {Container, Row, Logo} from './layout'
import Switcher from './Switcher'

const HeaderWrapper = styled.header`{
  background: url(/public/img/background.jpg) center center;
  color: #fff;
}`

const Darken = styled.div`{
  background-color: rgba(0, 0, 0, .7);
}`

const H2 = styled.h2`{
  text-transform: uppercase;
  margin: 0;
  font-size: 1rem;
  color: ${props => props.color || '#000'};
}`

const TextInput = styled.input.attrs({
  type: 'text',
  placeholder: props => props.placeholder || '',
})`{
  padding: 10px 15px;
  border: 0;
  ${props => props.black ?
  `
  color: ${props.theme.white};
  background-color: ${props.theme.black};  
  ` : `
  color: ${props.theme.black};
  background-color: ${props.theme.white};
  `
  }
}`

const SearchInput = TextInput.extend` 
  width: 100%;
  padding-right: 70px;
  box-shadow: 0 2px 0 0 ${props => props.theme.red}
`

const SearchIcon = styled.span`{
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
}`

const TextLine = styled.span`{
  line-height: ${props => props.lh || '1.2rem'};
  font-size: ${props => props.fs || '1rem'};
  text-transform: ${props => props.tt || 'inherit'};
  color: ${props => props.c || '#000'};
  vertical-align: middle;
}`


const StyledSwitcher = styled(Switcher)`{
  input {
    display: none;
  }
  > span:first-child {
    margin-right: 20px;
  }
  @media screen and (max-width: 400px){
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
}`

const Button = styled.button`
  text-transform: uppercase;
  font-size: 1rem;
  padding: 8px 15px;
	border: 0px;
	border-radius: 3px;
	background-color: #eee;
	cursor: pointer;
`

const SearchButton = Button.extend`
  background-color: ${props => props.theme.red};
  color: ${props => props.theme.white};
  padding-left: 40px;
  padding-right: 40px;
  float: right;
  font-size: .8rem;
  @media screen and (max-width: 460px) {
    padding-left: 8px;
    padding-right: 8px;
  }
`

const SEARCH_TYPE = {
  TITLE: 'TITLE',
  AUTHOR: 'AUTHOR',
}

class Header extends Component {

  constructor() {
    super()

    this.state = {
      searchText: '',
      searchType: Object.keys(SEARCH_TYPE)[0],
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.submitSearch = this.submitSearch.bind(this)
  }

  handleInputChange(e) {
    this.setState({searchText: e.currentTarget.value})
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.submitSearch()
    }
  }

  submitSearch() {
    console.log('search for: ' + this.state.searchText + ' with type ' + this.state.searchType)
    this.setState({searchText: ''})
  }

  handleTypeChange(searchType) {
    this.setState({searchType})
  }

  render() {
    return (
      <HeaderWrapper>
        <Darken>
          <Container>
            <Row marginBottom={40}>
              <Logo/>
            </Row>
            <Row>
              <H2 color="#fff">
                Find your movie
              </H2>
            </Row>
            <Row>
              <SearchInput
                black
                placeholder="Input your search query here"
                value={this.state.searchText}
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
              />
              <SearchIcon><i className="fa fa-search" aria-hidden="true"/></SearchIcon>
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
                <SearchButton onClick={this.submitSearch}>search</SearchButton>

            </Row>
          </Container>
        </Darken>
      </HeaderWrapper>
    )
  }
}

export default Header



