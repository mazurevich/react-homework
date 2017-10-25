import { getDetails } from '../services/searchService'

export const FETCH_MOVIE = 'FETCH_MOVIE'

export function fetchMovie(type, id) {
  const request = getDetails(type, id)
  return {
    type: FETCH_MOVIE,
    payload: request,
  }
}
