import apiFactory from './api'

const headers = new Headers()
headers.append('Access-Control-Allow-Origin', '*')

const api = apiFactory.create({headers})
const endpoint = '/api/api.php'

const search = (type, query) => {
  return api.get(endpoint, {
      params: {
        type: 'json',
        [SEARCH_TYPE[type]]: query,
      },
      mode: 'cors',
    },
  )
}

const SEARCH_TYPE = {
  TITLE: 'title',
  DIRECTOR: 'director',
}

export {SEARCH_TYPE}
export default search


