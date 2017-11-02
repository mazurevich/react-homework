import filmPageReducer from '../filmPageReducer'
import {
  FETCH_MOVIE,
  SET_LOADING,
  FETCH_RELATED_MOVIES,
} from '../../actions/index'

describe('filmPageReducer', () => {
  test('returns initial state on unknown action', () => {
    expect(filmPageReducer(undefined, { type: 'unknown' })).toEqual({})
  })

  test('sets selected movie from payload on SELECT_MOVIE type', () => {
    const movie = { id: 'testId' }
    const nextState = filmPageReducer(
      {},
      { type: FETCH_MOVIE, payload: { movie, success: true } }
    )
    expect(nextState.movie.id).toEqual('testId')
    expect(nextState).toMatchSnapshot()
  })

  test('sets sets provided key to true if page is FILM on SET_LOADING type', () => {
    const movie = { id: 'testId' }
    const nextState = filmPageReducer(
      {},
      {
        type: SET_LOADING,
        payload: {
          movie,
          key: 'testKey',
          page: 'film',
        },
      }
    )
    expect(nextState.testKey).toBe(true)
    expect(nextState).toMatchSnapshot()
  })

  test('sets sets related movies from payload on FETCH_RELATED_MOVIES type', () => {
    const movies = [{ id: 'testId' }]
    const nextState = filmPageReducer(
      {},
      {
        type: FETCH_RELATED_MOVIES,
        payload: {
          movies,
          success: true,
        },
      }
    )
    expect(nextState.relatedMovies).toEqual(movies)
    expect(nextState).toMatchSnapshot()
  })
})
