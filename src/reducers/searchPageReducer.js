import {
  FETCH_MOVIES,
  SET_LOADING,
  RESET_SEARCH_RESULT,
} from '../actions/index'
import PAGES from '../pages/pages'

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_MOVIES: {
      return Object.assign({}, action.payload, { loading: false })
    }
    case SET_LOADING: {
      const { page, key } = action.payload
      if (page === PAGES.SEARCH) {
        return Object.assign({}, state, {
          [key]: true,
          movies: [],
          errorMsg: '',
        })
      } else {
        return state
      }
    }
    case RESET_SEARCH_RESULT: {
      return Object.assign({}, state, {
        movies: [],
        errorMsg: '',
      })
    }
    default:
      return state
  }
}
