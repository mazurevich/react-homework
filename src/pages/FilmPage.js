import React, { Component } from 'react'
import {
  Container,
  Darken,
  Footer,
  Header,
  Logo,
  Row,
  Spinner,
} from '../components/layout/index'
import { Button } from '../components/controls/index'
import MovieDetails from '../components/film/MovieDetails'
import ResultsBar from '../components/search/ResultsBar'
import SearchResult from '../components/search/SearchResult'
import { search, SEARCH_TYPE } from '../services/searchService'
import NoResult from '../components/search/NoResults'

const NavLink = Button.withComponent('a').extend`
    float: right;
    margin-top: -8px;
    text-decoration: none;
`

class FilmPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movie: null,
      relatedMovies: [],
      loadingMain: false,
      loadingRelated: false,
      error: '',
    }
  }

  componentDidMount() {
    this.performSearch()
  }

  performSearch() {
    search(SEARCH_TYPE.title, this.props.match.params.title).then(
      movies => {
        this.setState({ movie: movies[0], loadingRelated: true })
        this.searchRelated()
      },
      err => {
        this.props.history.replace('/err')
      }
    )
  }

  searchRelated() {
    const { movie } = this.state
    if (movie && movie.director) {
      search(SEARCH_TYPE.director, movie.director).then(
        movies => {
          this.setState({
            relatedMovies: movies,
            loadingRelated: false,
            error: '',
          })
        },
        err => {
          this.setState({
            relatedMovies: [],
            loadingRelated: false,
            error: err.message,
          })
        }
      )
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.title !== this.props.match.params.title)
      this.performSearch()
  }

  render() {
    const { relatedMovies, loadingRelated, error } = this.state

    return (
      <div>
        <Header>
          <Darken>
            <Container>
              <Row>
                <Logo />
                <NavLink href="/">search</NavLink>
              </Row>
            </Container>
            <MovieDetails {...this.state.movie} />
          </Darken>
        </Header>
        <ResultsBar resultText="Other bear movies" />
        {loadingRelated && <Spinner />}
        {!loadingRelated && !error && <SearchResult movies={relatedMovies} />}
        {error && <NoResult message={error} />}
        <Footer />
      </div>
    )
  }
}

export default FilmPage
