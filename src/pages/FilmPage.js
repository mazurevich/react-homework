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
    this.performSearch()
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.movieLoadingError.length > 0) {
      this.props.history.push('/notFound')
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id ||
      prevProps.match.params.type !== this.props.match.params.type) {
        this.performSearch()
    }

    if (!!this.props.movie && this.props.movie.id !== prevProps.movie.id)
      this.searchRelated()
  }

  performSearch() {
    this.props.setLoading('film', 'movieLoading')
    const {type, id} = this.props.match.params
    this.props.fetchMovie(type, id)
  }

  searchRelated() {
    const {collection} = this.props.movie
    if (!collection)
      return
    this.props.setLoading('film', 'relatedLoading')
    this.props.fetchRelatedMovies(collection.id)
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
          resultText={movie.collection ? `Other movie in ${movie.collection.name} collection`: 'This movie doesn\'t belong to any collection'}
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
}) => ({
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
