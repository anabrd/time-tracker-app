import {Link} from 'react-router-dom'
export default function(props) {

    let logInHandler = (e) => {
        e.preventDefault();

        let data = {};

        data.email = e.currentTarget.children[1].value;
        data.pass = e.currentTarget.children[2].value;

        let urlLogin = 'https://auth404.herokuapp.com/api/auth/login';

        let options = {
            method:'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        }

        fetch(urlLogin, options).then(result => result.json()
            .then(output => {
                if (output.status == "success") {
                    localStorage.setItem("token", output.token);
                    console.log("ok");
                    props.setLoggedIn(true);
                    props.setToken(output.token);
                } else {
                    localStorage.removeItem("token");
                    console.log("nope");
                }
            }));
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