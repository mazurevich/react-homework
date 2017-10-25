import { getCollection } from '../services/searchService'

export const FETCH_RELATED_MOVIES = 'FETCH_RELATED_MOVIES'

export function fetchRelatedMovies(collectionId) {
  const request = getCollection(collectionId)
  return {
    type: FETCH_RELATED_MOVIES,
    payload: request,
  }
}
