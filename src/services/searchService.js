import 'isomorphic-fetch'
import queryString from 'query-string'

const API_URL = 'https://netflixroulette.net/api/api.php'

const search = (type, query) => {
  let queryString = '?type=json'
  if (type && query) queryString += `&${type}=${query}`
  const url = `${API_URL}${queryString}`

  return fetch(url)
    .then(res => {
      if (res.status >= 200 && res.status < 300) return res.json()
      throw new Error('Movies not found')
    })
    .then(data => {
      if (data instanceof Array) return data
      return [data]
    })
}

const paramsToUrl = (type, query) =>
  queryString.stringify({ [type.toLowerCase()]: query })

const urlToSearchParams = (query = '') => {
  const parsedObject = queryString.parse(query)
  const keys = Object.keys(parsedObject)
  const types = Object.keys(SEARCH_TYPE).map(key => key.toLowerCase())
  for (let key of keys) {
    for (let type of types) {
      if (key.toLowerCase() === type) {
        return { searchType: type, searchText: parsedObject[key] }
      }
    }
  }

  return { searchType: SEARCH_TYPE.title, searchText: '' }
}

const SEARCH_TYPE = {
  title: 'title',
  director: 'director',
}

export { SEARCH_TYPE, paramsToUrl, urlToSearchParams, search }
export default search
