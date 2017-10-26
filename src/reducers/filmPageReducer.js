import {
  FETCH_MOVIE,
  SET_LOADING,
  SELECT_MOVIE,
  FETCH_RELATED_MOVIES,
} from '../actions/index'

import PAGES from '../pages/pages'

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
      return {
        movie: action.payload.success ? action.payload.movie : {},
        movieLoading: false,
        movieLoadedOk: action.payload.success,
        movieLoadingError: action.payload.errorMsg,
      }
    }
    case SET_LOADING: {
      const { page, key } = action.payload
      if (page === PAGES.FILM) {
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
