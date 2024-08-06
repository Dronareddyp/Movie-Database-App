import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, title, posterPath, voteAverage} = movieDetails
  return (
    <li className="moive-card-container d-flex flex-column">
      <img className="movie-card-image" src={posterPath} alt={title} />
      <div>
        <h1>{title}</h1>
        <p>Rating: {voteAverage}</p>
      </div>
      <Link to={`/movie/${id}`} className="mt-auto align-self-center">
        <button className="btn btn-outline-success" type="button">
          View Details
        </button>
      </Link>
    </li>
  )
}
export default MovieCard
