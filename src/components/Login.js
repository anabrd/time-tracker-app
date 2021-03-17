import {useState} from 'react'
export default function(props) {

    const [newUserBox, setNewUserBox] = useState(false);
    const [logInBox, setLogInBox] = useState(true);

    let addNewUser = () => {
        setLogInBox(false);
        setNewUserBox(true);
        console.log(newUserBox);
    }

    return(
        <div> {logInBox ? 
        <div className="card">
        <form  onSubmit={props.action}>
            <h3>Log In</h3>
            <input type="text" placeholder={props.preview} value={props.username}></input>
            <input type="submit" className="btn btn-main" value="Log In"/>
        </form>
        <p>New here? <span onClick={() => addNewUser()}>Register</span></p>
        </div> 
        : 
        <div className="card">
            <form onSubmit={props.action}>
                <h3>Register</h3>
                <input type="text" placeholder="Enter Username" value={props.username}></input>
                <input type="submit" className="btn btn-main" value="Register"/>
            </form>
        </div>}
        </div>
    )
}