import React from 'react'
import renderer from 'react-test-renderer'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'

jest.disableAutomock()
import SearchPage from '../SearchPage'
import SearchHeader from '../../components/search/SearchHeader'
import SearchResult from '../../components/search/SearchResult'
import ResultsBar from '../../components/search/ResultsBar'
import NoResult from '../../components/search/NoResult'
import { Spinner } from '../../components/layout/index'
import { fetchMovies } from '../../actions/fetchMovies'
import { setLoading } from '../../actions/setLoading'

jest.mock('../../components/search/SearchHeader', () => 'SearchHeader')
jest.mock('../../components/search/SearchResult', () => 'SearchResult')
jest.mock('../../components/search/ResultsBar', () => 'ResultsBar')
jest.mock('../../components/search/NoResult', () => 'NoResult')
jest.mock('../../components/layout/Spinner', () => 'Spinner')

const fetchMoviesMock = jest.mock('../../actions/fetchMovies')
const setLoadingMock = jest.mock('../../actions/setLoading')

configure({ adapter: new Adapter() })

describe('SearchPage', () => {
  const matchMock = {
    params: {
      query: 'test',
    },
  }

  const initialState = {
    search: { movies: [], loading: true, errorMsg: '', success: true },
  }
  const mockStore = configureStore()
  let component
  let store
  beforeEach(() => {
    store = mockStore(initialState)
    component = renderer.create(<SearchPage match={matchMock} store={store} />)
  })

  test('matches snapshot', () => {
    expect(component.toJSON()).toMatchSnapshot()
  })

  // test('calls fetchMovies action on performSearch', () => {
  //   const $searchPage = shallow(<SearchPage match={matchMock} store={store}/>)
  //   $searchPage.instance().performSearch('test', 'test')
  // })
})
