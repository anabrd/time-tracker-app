import ApiToGo from "api-to-go";
import { useState } from 'react';

export default function(props) {

    const [noMatch, setNoMatch] = useState(false);

    let registerHandler = (e) => {
        e.preventDefault();
        let email = e.currentTarget.children[2].value;
        let pass = e.currentTarget.children[3].value;
        let passConf = e.currentTarget.children[4].value;

        if (passConf !== pass) {
            setNoMatch(true);
        } else {
            setNoMatch(false);
            ApiToGo.register(email,pass).then(output => 
            { 
                if (output == "success"){
                    props.setRegistered(true)
                }
            });
        }
    }

    return (
        <div className="card">
            <form onSubmit = {registerHandler}>
                <h3>Register</h3>
                <input type="email" placeholder="Enter Email" required/>
                <input type="password" placeholder="Enter Password" required/>
                <input type="password" placeholder="Confirm Password" required/>
                <input type="submit" className="btn btn-main" value="Register"/>
                {noMatch && <p style={{opacity: 1, color: "red", transition: "0.3s"}}>Passwords don't match!</p>}
            </form>
        </div>
    )
}
