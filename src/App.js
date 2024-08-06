import {useState} from 'react'
import {Switch, Route} from 'react-router-dom'

import Popular from './MovieDatabaseApp/Popular'
import TopRated from './MovieDatabaseApp/TopRated'
import Upcoming from './MovieDatabaseApp/Upcoming'
import SearchQuery from './MovieDatabaseApp/SearchQuery'

import ConfigurationContext from './context/ConfigurationContext'

const API_KEY = '655214fece85c7e86e4179dc2063d5e2'

const App = () => {
  const [searchResponse, setSearchResponse] = useState({})
  const [apiStatus, setApiStatus] = useState('INITIAL')
  const [searchInput, setSearchInput] = useState('')

  const onChangeSearchInput = text => setSearchInput(text)

  const getUpdateData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  const onTriggerSearchingQuery = async (page = 1) => {
    setApiStatus('IN_PROGRESS')
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(data)
    setSearchResponse(getUpdateData(data))
    setApiStatus('SUCCESS')
  }

  return (
    <ConfigurationContext.Provider
      value={{
        searchResponse,
        apiStatus,
        searchInput,
        onTriggerSearchingQuery,
        onChangeSearchInput,
      }}
    >
      <Switch>
        <Route exact path="/" component={Popular} />
        <Route exact path="/top-rated" component={TopRated} />
        <Route exact path="/upcoming" component={Upcoming} />
        <Route exact path="/search" component={SearchQuery} />
      </Switch>
    </ConfigurationContext.Provider>
  )
}
export default App
