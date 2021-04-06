import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function (props) {


    return (
        <nav>
            <h1>
                <Link to="/">Time Tracker ⏱</Link>
            </h1>
            <ul>
                <li>
                {props.isHome && props.loggedIn ? (
                    <button
                    className="btn btn-main"
                    id="nav-btn"
                    onClick={
                        props.showNewProject
                        ? () => props.setShowNewProject(false)
                        : () => props.setShowNewProject(true)
                    }
                    >
                    New Project
                    </button>
                ) : null}
                </li>
                <li>
                {!props.isHome ?
                <NavLink onClick={() => props.setisHome(true)} to="/">
                    Home
                </NavLink> : null
                }
                </li>
                <li>
                {props.loggedIn ? (
                    <NavLink onClick={() => props.setisHome(false)} to="/reports">
                    Reports
                    </NavLink>
                ) : null}
                </li>
                <li>
                {props.loggedIn ? (
                    <NavLink to="/" onClick={props.logout}>
                    Logout
                    </NavLink>
                ) : null}
                </li>
            </ul>
        </nav>
    );
}
