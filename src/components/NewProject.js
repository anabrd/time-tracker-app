export default function(props) {
    return(
        <form className="new-project-card" onSubmit={props.submitNewProject}>
            <h3>Create New Project</h3>
            <div className="input-wrapper">
            <input type="text" placeholder="Name" value={props.name}></input>
            <input type="text" placeholder="Description" value={props.description}></input>
            <input type="submit" className="btn btn-main" value="Create"/>
            </div>
        </form>
    )
}