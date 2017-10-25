const merge = require('lodash/merge')

const browser = typeof window !== 'undefined'
const ip = process.env.IP || 'localhost'
const port = process.env.PORT || 3000
const basename = `/${process.env.PUBLIC_PATH || ''}`.replace('//', '/')

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    baseUrl: `http://${ip}:${port}${basename}`,
    apiUrl: 'https://api.themoviedb.org/3',
    baseImgUrl: 'http://image.tmdb.org/t/p/w342',
    noPosterPath: '/public/img/NoPoster.jpg',
    basename,
    browser,
    ip,
    port,
  },
  test: {},
  development: {},
  production: {
    ip: process.env.IP || 'localhost',
    port: process.env.PORT || 8080,
    apiUrl: 'https://api.themoviedb.org/3',
  },
}

module.exports = merge(config.all, config[config.all.env])
