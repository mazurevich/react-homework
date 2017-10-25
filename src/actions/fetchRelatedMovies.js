import { search, SEARCH_TYPE } from '../services/searchService'

export const FETCH_RELATED_MOVIES = 'FETCH_RELATED_MOVIES'

export function fetchRelatedMovies(searchText) {
  const request = search(SEARCH_TYPE.director, searchText)
  return {
    type: FETCH_RELATED_MOVIES,
    payload: request,
  }
}
