import { Button, Input, TextField } from '@material-ui/core';

export default function(props) {
    
    return(
        <form id = "new-project-form" className="new-project-card" onSubmit={props.projectHandler}>
            <h3>Create New Project</h3>
            <TextField id="outlined-basic" label="Name" variant="outlined" value={props.name} required/>
            <TextField id="outlined-basic" label="Description" variant="outlined" value={props.description}/>
            <Button type="submit" variant="contained" color="secondary" value="Create">Create</Button>
        </form>
    )
}