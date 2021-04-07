const NewProjectBtn = (props) =>
{
    return (
        <button
            id="new-proj-btn"
            className="btn btn-main"
            onClick={props.showNewProjectHandler}
            >
            +
        </button>
    )
}
export default NewProjectBtn;