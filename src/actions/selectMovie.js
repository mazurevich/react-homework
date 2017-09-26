export const SELECT_MOVIE = 'SELECT_MOVIE'

export function selectMovie(movie) {
  return {
    type: SELECT_MOVIE,
    payload: movie,
  }
}
