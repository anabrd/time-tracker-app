import {Link} from 'react-router-dom'
import ApiToGo from "api-to-go"

export default function(props) {

    let logInHandler = (e) => {
        e.preventDefault();

        let email = e.currentTarget.children[1].value;
        let pass = e.currentTarget.children[2].value;

        ApiToGo.login(email,pass).then(output =>
            {
                if (output !== null) {
                    props.setLoggedIn(true);
                }
            });
    }

    return(
        <div className="card">
            <form onSubmit={logInHandler}>
                <h3>Log In</h3>
                <input type="email" placeholder="Enter email" />
                <input type="password" placeholder="Password" />
                <input type="submit" className="btn btn-main" value="Log In"/>
            </form>
            <p>New here? <Link to="/register">Register</Link></p>
        </div>
    )
}