import apiFactory from './api'

const headers = new Headers()
headers.append('Access-Control-Allow-Origin', '*')

const api = apiFactory.create({headers})
const endpoint = '/api/api.php'

const search = (type, query) => {
  return api.get(endpoint, {
      params: {
        type: 'json',
        title: query,
      },
      mode: 'cors',
    },
  )
}

const SEARCH_TYPE = {
  TITLE: 'title',
  AUTHOR: 'author',
}

export {SEARCH_TYPE}
export default search


