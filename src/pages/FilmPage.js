import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

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
import NoResult from '../components/search/NoResults'
import {
  fetchMovie,
  fetchRelatedMovies,
  setLoading,
  selectMovie,
} from '../actions'

const NavLink = Button.withComponent(Link).extend`
    float: right;
    margin-top: -8px;
    text-decoration: none;
`

const propTypes = {
  movie: PropTypes.object,
  movieLoading: PropTypes.bool,
  movieLoadedOk: PropTypes.bool,
  relatedMovies: PropTypes.array,
  relatedLoading: PropTypes.bool,
  relatedLoadedOk: PropTypes.bool,
  relatedLoadingError: PropTypes.string,
}

const defaultProps = {
  movie: {},
  movies: [],
  relatedMovies: [],
  movieLoading: false,
  movieLoadedOk: false,
  relatedLoading: false,
  relatedLoadedOk: false,
  relatedLoadingError: '',
}

class FilmPage extends Component {
  constructor() {
    super()

    this.state = {
      loadingRelated: false,
      error: '',
    }
  }

  componentDidMount() {
    const { movies } = this.props
    const title = this.props.match.params.title

    const selectedMovie = movies.find(movie => movie.show_title === title)
    if (selectedMovie) {
      this.props.selectMovie(selectedMovie)
      this.searchRelated(selectedMovie.director)
      return
    }

    this.performSearch()
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.movieLoadingError.length > 0) {
      this.props.history.push('/notFound')
    }
  }

  componentDidUpdate(prevProps) {
    const title = this.props.match.params.title
    if (prevProps.match.params.title !== this.props.match.params.title) {
      const { movies, relatedMovies } = this.props
      const loadedMovies = [...movies, ...relatedMovies]
      const selectedMovie = loadedMovies.find(
        movie => movie.show_title === title
      )
      if (selectedMovie) {
        this.props.selectMovie(selectedMovie)
      } else {
        this.performSearch()
      }
    }

    if (prevProps.movie.show_id !== this.props.movie.show_id)
      this.searchRelated(this.props.movie.director)
  }

  performSearch() {
    this.props.setLoading('film', 'movieLoading')
    this.props.fetchMovie(this.props.match.params.title)
  }

  searchRelated(director) {
    this.props.setLoading('film', 'relatedLoading')
    this.props.fetchRelatedMovies(director)
  }

  render() {
    const {
      movie,
      movieLoading,
      relatedMovies,
      relatedLoading,
      relatedLoadingError,
    } = this.props

    if (movieLoading) return <Spinner />

    return (
      <div>
        <Header>
          <Darken>
            <Container>
              <Row>
                <Logo />
                <NavLink to="/">search</NavLink>
              </Row>
            </Container>
            <MovieDetails {...movie} />
          </Darken>
        </Header>
        <ResultsBar
          resultText={`Other ${movie.director || 'director'}'s movies`}
        />
        {relatedLoading && <Spinner />}
        {!relatedLoading &&
          !relatedLoadingError && <SearchResult movies={relatedMovies} />}
        {relatedLoadingError && <NoResult message={relatedLoadingError} />}
        <Footer />
      </div>
    )
  }
}

FilmPage.propTypes = propTypes
FilmPage.defaultProps = defaultProps

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { fetchMovie, fetchRelatedMovies, setLoading, selectMovie },
    dispatch
  )

const mapStateToProps = ({
  film: {
    movie,
    movieLoading,
    movieLoadingError,
    movieLoadedOk,
    relatedMovies,
    relatedLoading,
    relatedLoadedOk,
    relatedLoadingError,
  },
  search: { movies },
}) => ({
  movies,
  movie,
  movieLoading,
  movieLoadingError,
  movieLoadedOk,
  relatedMovies,
  relatedLoading,
  relatedLoadedOk,
  relatedLoadingError,
})

export default connect(mapStateToProps, mapDispatchToProps)(FilmPage)
