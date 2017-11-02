import fetchMock from 'fetch-mock'

import { fetchMovie } from '../fetchMovie'

describe('fetchMovie', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  test('return promise with movie on success response', done => {
    fetchMock.get('*', {
      body: { id: 'testId', genres: [] },
      status: 200,
    })
    fetchMovie('movie', 'query').payload.then(payload => {
      expect(payload.movie.id).toBe('testId')
      expect(payload).toMatchSnapshot()
      done()
    })
  })

  test('return promise with error message on error response', done => {
    fetchMock.get('*', {
      body: { id: 'testId', genres: [] },
      status: 404,
    })
    fetchMovie('movie', 'query').payload.then(payload => {
      expect(payload.success).toBe(false)
      expect(payload).toMatchSnapshot()
      done()
    })
  })
})
