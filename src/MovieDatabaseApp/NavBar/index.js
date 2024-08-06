import {Link, withRouter} from 'react-router-dom'

import ConfigurationContext from "../../context/ConfigurationContext"

const Navbar=(props)=>{
    const renderSearchBar=()=>(
        <ConfigurationContext.Consumer>
            {value=>{
                const {
                    onTriggerSearchingQuery,
                    onChangeSearchInput,
                    searchInput,
                    apiStatus,
                }=value

                const onChangeHandle= event=>onChangeSearchInput(event.target.value)

                const onSearchHandler = event=>{
                    event.preventDefault()
                    const {history}=props
                    onTriggerSearchingQuery()
                    history.push("/search")
                }
                return(
                    <div className="d-flex align-items-center">
                        <input type="text" className="me-2 search-input"
                        onChange={onChangeHandle}
                        value={searchInput}
                        placeholder="Search"/>
                        <button type="button" className="btn btn-outline-info" 
                        onClick={onSearchHandler}>
                            search
                        </button>
                    </div>
                )
            }}

        </ConfigurationContext.Consumer>
    )
    return(
        <nav className="navbar-container d-flex align-item-center ">
            <div>
                <h1>movieDB</h1>
            </div>
            <div className="d-flex align-item-center">
                <ul className="d-flex align-items-center p-0 mb-0 ms-3 nav-item-list">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                        Popular
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/top-rated">
                            Top Rated
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/upcoming">
                            Upcoming
                        </Link>
                    </li>

                </ul>
                {renderSearchBar()}
            </div>
        </nav>
    )
}
export default withRouter(Navbar)