import moment from 'moment'
import config from '../config'

export default class Movie {
  constructor(
    {
      release_date: releaseDate,
      first_air_date: firstAirDate, // for tv shows
      title,
      name, // for tv shows
      genres,
      vote_average: rating,
      overview: summary,
      runtime,
      poster_path: relativePosterPath,
      id,
      production_companies: productionCompanies = [],
      belongs_to_collection: collection,
    } = {}
  ) {
    releaseDate = releaseDate || firstAirDate
    title = title || name
    const poster = relativePosterPath
      ? `${config.baseImgUrl}${relativePosterPath}`
      : config.noPosterPath

    const year = moment(releaseDate).format('YYYY')

    Object.assign(this, {
      id,
      type: firstAirDate ? 'tvShow' : 'movie',
      year,
      title,
      genres,
      rating,
      summary,
      runtime,
      poster,
      productionCompanies: productionCompanies.map(company => company.name),
      collection,
    })
  }
}
