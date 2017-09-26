import { search, SEARCH_TYPE } from '../services/searchService'

export const FETCH_MOVIE = 'FETCH_MOVIE'

export function fetchMovie(searchText) {
  const request = search(SEARCH_TYPE.title, searchText)
  return {
    type: FETCH_MOVIE,
    payload: request,
  }
}
