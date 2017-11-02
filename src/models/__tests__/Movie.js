import Movie from '../Movie'

describe('Movie', () => {
  test('converts from movie respose', () => {
    const movie = new Movie({
      release_date: '2000-10-10',
    })
    expect(movie.year).toBe('2000')
    expect(movie.type).toBe('movie')
  })

  test('converts from tv show respose', () => {
    const movie = new Movie({
      first_air_date: '2000-10-10',
    })
    expect(movie.year).toBe('2000')
    expect(movie.type).toBe('tvShow')
  })
})
