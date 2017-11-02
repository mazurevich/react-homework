import React from 'react'
import renderer from 'react-test-renderer'

import MovieCard from '../MovieCard'
import SearchResult from '../SearchResult'

jest.disableAutomock()
jest.mock('../MovieCard', () => 'MovieCard')

describe('SearchResult', () => {
  test('matched snapshot', () => {
    const searchResult = <SearchResult />
    const component = renderer.create(searchResult)
    expect(component).toMatchSnapshot()
  })

  test('matched snapshot', () => {
    const searchResult = <SearchResult movies={[{ id: 1, year: '2010' }]} />
    const component = renderer.create(searchResult)
    expect(component.toJSON()).toMatchSnapshot()
  })
})
