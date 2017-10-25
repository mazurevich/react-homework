import { FETCH_MOVIES, SET_LOADING } from '../actions/index'

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_MOVIES: {
      return Object.assign({}, action.payload, { loading: false })
    }
    case SET_LOADING: {
      const { page, key } = action.payload
      if (page === 'search') {
        return Object.assign({}, state, {
          [key]: true,
          movies: [],
          errorMsg: '',
        })
      } else {
        return state
      }
    }
    default:
      return state
  }
}
