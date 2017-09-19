import apiFactory from './api'
import queryString from 'query-string'

const headers = new Headers()
headers.append('Access-Control-Allow-Origin', '*')

const api = apiFactory.create({})
const endpoint = '/api/api.php'

const search = (type, query) => {
  const url = `${endpoint}`
  return api.get(url, {
      params: {
        type: 'json',
        [type.toLowerCase()]: query,
      },
    },
  )
}

const paramsToUrl = (type, query) => queryString.stringify({[type.toLowerCase()]: query})

const urlToSearchParams = (query = '') => {
  const parsedObject = queryString.parse(query)
  const keys = Object.keys(parsedObject)
  const types = Object.keys(SEARCH_TYPE).map(key => key.toLowerCase())
  for (let key of keys) {
    for (let type of types ) {
      if (key.toLowerCase() === type) {
        return { searchType: type, searchText: parsedObject[key]}
      }
    }
  }

  return { searchType: SEARCH_TYPE.TITLE, searchText: ''}
}

const SEARCH_TYPE = {
  TITLE: 'title',
  DIRECTOR: 'director',
}

export {SEARCH_TYPE, paramsToUrl, urlToSearchParams, search}
export default search


