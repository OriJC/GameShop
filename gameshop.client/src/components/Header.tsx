import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="nav-items">
                <li>
                    <Link to="/">HOME</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Header