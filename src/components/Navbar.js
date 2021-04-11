import { NavLink } from "react-router-dom";

const Navbar = (props) => {
    return (
        <nav>
            <h1><NavLink to="/">Time Tracker ⏱</NavLink></h1>
            {props.loggedIn && 
            <ul>
                <li>
                    <NavLink to="/">
                        Projects
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/reports">
                        Reports
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/" onClick={props.logout}>
                        Logout
                    </NavLink>
                </li>
            </ul>}
        </nav>
    );
}

export default Navbar;
