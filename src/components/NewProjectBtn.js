import Button from '@material-ui/core/Button';

const NewProjectBtn = (props) =>
{
    return (
        <Button 
            variant="contained" 
            color="primary"
            onClick={props.showNewProjectHandler}
            >
            New Project +
        </Button>
    )
}

export default NewProjectBtn;