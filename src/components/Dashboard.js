export default function(props) {
    return (
        <div>
            <h3>Welcome, {props.username}!</h3>
            <div>{props.content}</div>
        </div>
    )
}