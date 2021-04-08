const NewProjectBtn = (props) =>
{
    return (
        <button
            id="new-proj-btn"
            className="btn btn-main"
            onClick={props.showNewProjectHandler}
            >
            New Project +
        </button>
    )
}
export default NewProjectBtn;