import React, {Component} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import SearchResult from '../SearchResult'
import ResultsBar from '../ResultsBar'

class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Header/>
        <ResultsBar/>
        <SearchResult/>
        <Footer/>
      </div>)
  }
}

export default Home
