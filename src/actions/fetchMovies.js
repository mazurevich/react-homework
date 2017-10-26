import { search } from '../services/searchService'

export const FETCH_MOVIES = 'FETCH_MOVIES'

export function fetchMovies(type, searchText) {
  const request = search(type, searchText)
  return {
    type: FETCH_MOVIES,
    payload: request,
  }
}
