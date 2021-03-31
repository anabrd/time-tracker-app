import ApiToGo from "api-to-go"
export default function(props) {
    let registerHandler = (e) => {
        e.preventDefault();
        let username = e.currentTarget.children[1].value;
        let email = e.currentTarget.children[2].value;
        let pass = e.currentTarget.children[3].value;

        ApiToGo.register(email,pass).then(output => 
            { 
                if (output == "success"){
                    props.setRegistered(true)
                }
            });
    }

    return (
        <div className="card">
            <form onSubmit = {registerHandler}>
                <h3>Register</h3>
                <input type="text" placeholder="Choose your username" autoComplete/>
                <input type="email" placeholder="Enter Email" autoComplete/>
                <input type="password" placeholder="Enter Password" autoComplete/>
                <input type="submit" className="btn btn-main" value="Register"/>
            </form>
        </div>
    )
}
