import 'isomorphic-fetch'
import queryString from 'query-string'
import config from '../config'
import Movie from '../models/Movie'

const API_URL = config.apiUrl
const API_KEY = 'abd4c37a5cef07bca30399bfd8f86cae'

// for debug purpose
const Delay = time => {
  return new Promise(res => {
    setTimeout(() => {
      res()
    }, time)
  })
}

export const search = (type, query) => {
  if (!type || !SEARCH_TYPE[type] || !query)
    return Promise.reject({
      success: false,
      errorMsg: 'Invalid search query',
    })

  const url = `${API_URL}/search/${SEARCH_TYPE[type]
    .subpath}?query=${encodeURIComponent(query)}&api_key=${API_KEY}`

  return fetch(url)
    .then(res => {
      if (res.status >= 200 && res.status < 300) return res.json()

      throw new Error('Movies not found')
    })
    .then(response => {
      let movies = response.results

      return resolveGenres(movies)
    })
    .then(
      movies => {
        const moviesArray = movies.map(movie => new Movie(movie))
        return {
          success: true,
          errorMsg: '',
          movies: moviesArray,
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

export const getCollection = collectionId => {
  if (!collectionId)
    return Promise.reject({
      success: false,
      errorMsg: 'Invalid search query',
    })

  const url = `${API_URL}/collection/${collectionId}?api_key=${API_KEY}`

  return fetch(url)
    .then(res => {
      if (res.status >= 200 && res.status < 300) return res.json()

      throw new Error('Movies not found')
    })
    .then(response => {
      let movies = response.parts

      return resolveGenres(movies)
    })
    .then(
      movies => {
        const moviesArray = movies.map(movie => new Movie(movie))
        return {
          success: true,
          errorMsg: '',
          movies: moviesArray,
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

export const getDetails = (type, id) => {
  if (!type || !SEARCH_TYPE[type.toLowerCase()] || !id)
    return Promise.reject({
      success: false,
      errorMsg: 'Invalid params',
    })

  const url = `${API_URL}/${SEARCH_TYPE[type.toLowerCase()]
    .subpath}/${id}?api_key=${API_KEY}`

  return fetch(url)
    .then(res => {
      if (res.status >= 200 && res.status < 300) return res.json()

      throw new Error('Movies not found')
    })
    .then(
      movie => {
        movie.genres = movie.genres.map(genre => genre.name)
        return {
          success: true,
          errorMsg: '',
          movie: new Movie(movie),
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

let genresCache = null

const getGenresList = () => {
  if (genresCache) return Promise.resolve(genresCache)

  const url = `${API_URL}/genre/movie/list?api_key=${API_KEY}`
  return fetch(url)
    .then(res => {
      if (res.status >= 200 && res.status < 300) return res.json()

      throw new Error('Movies not found')
    })
    .then(result => {
      genresCache = new Map()
      result.genres.forEach(genre => genresCache.set(genre.id, genre.name))
      return genresCache
    })
}

const resolveGenres = movies => {
  return getGenresList().then(genres => {
    movies.forEach(movie => {
      movie.genres = movie.genre_ids.map(genreId => genres.get(genreId))
    })
    return movies
  })
}

export const paramsToUrl = (type, query) =>
  queryString.stringify({ [type.toLowerCase()]: query })

export const urlToSearchParams = (query = '') => {
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

  return { searchType: Object.keys(SEARCH_TYPE)[0], searchText: '' }
}

export const SEARCH_TYPE = {
  movie: {
    label: 'movie',
    subpath: 'movie',
  },
  tvshow: {
    label: 'TV show',
    subpath: 'tv',
  },
}
