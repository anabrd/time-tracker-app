export default function(props) {
    return (
        <div>
            <h2>Welcome, {props.username}!</h2>
            <div>{props.content}</div>
        </div>
    )
}