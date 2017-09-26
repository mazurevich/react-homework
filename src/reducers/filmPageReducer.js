import {
  FETCH_MOVIE,
  SET_LOADING,
  SELECT_MOVIE,
  FETCH_RELATED_MOVIES,
} from '../actions/index'

export default function(state = {}, action) {
  switch (action.type) {
    case SELECT_MOVIE: {
      return {
        movie: Object.assign({}, action.payload),
        movieLoadedOk: true,
        movieLoading: false,
        movieLoadingError: '',
        relatedMovies: [],
        relatedLoadedOk: false,
        relatedLoadingError: '',
      }
    }
    case FETCH_MOVIE: {
      const nextState = {
        movie: action.payload.success ? action.payload.movies[0] : {},
        movieLoading: false,
        movieLoadedOk: action.payload.success,
        movieLoadingError: action.payload.errorMsg,
      }
      return nextState
    }
    case SET_LOADING: {
      const { page, key } = action.payload
      if (page === 'film') {
        return Object.assign({}, state, {
          [key]: true,
          relatedMovies: [],
          movieLoadingError: '',
          relatedLoadingError: '',
        })
      } else {
        return state
      }
    }
    case FETCH_RELATED_MOVIES: {
      return Object.assign({}, state, {
        relatedMovies: action.payload.movies,
        relatedLoading: false,
        relatedLoadedOk: action.payload.success,
        relatedLoadingError: action.payload.errorMsg,
      })
    }
    default:
      return state
  }
}
