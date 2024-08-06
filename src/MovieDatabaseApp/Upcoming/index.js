import React from 'react'
import Loader from 'react-loader-spinner'

import MovieCard from '../MovieCard'
import NavBar from '../NavBar'
import Pagination from '../Pagination'

class Upcoming extends React.Component {
  state = {
    isLoading: true,
    upcomingMovieResponse: {},
  }

  componentDidMount() {
    this.getUpcomingMoviesResponse()
  }

  getUpdatedDate = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  getUpcomingMoviesResponse = async (page = 1) => {
    const API_KEY = '655214fece85c7e86e4179dc2063d5e2'
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const newData = this.getUpdatedDate(data)
    this.setState({isLoading: false, upcomingMovieResponse: newData})
  }

  renderLoadingView = () => {
    ;<div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  }

  renderPopularMoviesList = () => {
    const {upcomingMovieResponse} = this.state
    const {results} = upcomingMovieResponse

    return (
      <ul className="row p-0 mt-3">
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }
  render() {
    const {isLoading, upcomingMovieResponse} = this.state
    return (
      <>
        <NavBar />
        <div className="route-page-body">
          {isLoading
            ? this.renderLoadingView()
            : this.renderPopularMoviesList()}
        </div>
        <Pagination
          totalPages={upcomingMovieResponse.totalPages}
          apiCallback={this.getUpcomingMoviesResponse}
        />
      </>
    )
  }
}
export default Upcoming
