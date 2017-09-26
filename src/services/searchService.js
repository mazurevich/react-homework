import 'isomorphic-fetch'
import queryString from 'query-string'

const API_URL = 'https://netflixroulette.net/api/api.php'

// for debug purpose
const Delay = time => {
  return new Promise(res => {
    setTimeout(() => {
      res()
    }, time)
  })
}

const search = (type, query) => {
  if (!type || !query) return Promise.reject('Invalid search query')

  const url = `${API_URL}?type=json&${type}=${query}`

  return fetch(url)
    .then(res => {
      if (res.status >= 200 && res.status < 300) return res.json()

      throw new Error('Movies not found')
    })
    .then(
      data => {
        let movies = data
        if (!(data instanceof Array)) movies = [data]
        return {
          success: true,
          errorMsg: '',
          movies,
        }
      },
      error => {
        return {
          success: false,
          errorMsg: error.message,
        }
      }
    )
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
