import {useState} from 'react';
export default function(props) {
    // Register new user using bulent's api
    // Duplicate the same structure in local storage??

    let registerHandler = (e) => {
        e.preventDefault();

        let data = {};

        let username = e.currentTarget.children[1].value;
        data.email = e.currentTarget.children[2].value;
        data.pass = e.currentTarget.children[3].value;

        console.log(data)
        let url = "https://auth404.herokuapp.com/api/auth/register";

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        console.log(e.currentTarget.children[1].value); 
        // First returns an HTTP response, then a json Response object that needs to be parsed
        fetch(url, options).then(result => result.json().then(output=> {
            console.log(output);
            if (output.status == "success") {
                console.log("ok");
                props.username(username);
                props.setRegistered(true);
            } else {
                alert("Uset already exists! Please log in.");
            }
        }));
    }

    return (
        <div className="card">
            <form onSubmit = {registerHandler}>
                <h3>Register</h3>
                <input type="text" placeholder="Choose your username" />
                <input type="email" placeholder="Enter Email" />
                <input type="password" placeholder="Enter Password" />
                <input type="submit" className="btn btn-main" value="Register"/>
            </form>
        </div>
    )
}
