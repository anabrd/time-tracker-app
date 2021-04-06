import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export default function (props) {


    useEffect(() => {
        if (window.location.pathname !== "/") {
        props.setisHome(false);
        }
    }, [props.isHome]);

    return (
    <nav>
        <h1>
        <NavLink to="/">Time Tracker ⏱</NavLink>
        </h1>
        <ul>
        <li>
            {props.isHome ? (
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
            ) : (
            <NavLink to="/">Home</NavLink>
            )}
        </li>
        <li>
            {props.loggedIn ? <NavLink to="/reports">Reports</NavLink> : null}
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
