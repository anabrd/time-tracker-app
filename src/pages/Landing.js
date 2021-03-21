import {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
export default function(props) {

    const [newUserBox, setNewUserBox] = useState(false);
    const [logInBox, setLogInBox] = useState(true);

    // let addNewUser = () => {
    //     setLogInBox(false);
    //     setNewUserBox(true);
    //     console.log(newUserBox);
    // }

    return(
        <div className="card">
            <form  onSubmit={props.action}>
                <h3>Log In</h3>
                <input type="text" placeholder="Enter username" />
                <input type="Password" placeholder="Password" />
                <input type="submit" className="btn btn-main" value="Log In"/>
            </form>
        <p>New here? <Link to="/register">Register</Link></p>
        </div>
    )
}