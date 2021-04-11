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
                    props.setToken(output);
                }
            });
    }

    return(
        <div className="card">
            <form onSubmit={logInHandler}>
                <h3>Log In</h3>
                <input type="email" placeholder="Enter email" autoComplete="on" required/>
                <input type="password" placeholder="Password" autoComplete="on" required/>
                <input type="submit" className="btn btn-main" value="Log In"/>
            </form>
            <p>New here? <Link className = "register-link" to="/register">Register</Link></p>
        </div>
    )
}