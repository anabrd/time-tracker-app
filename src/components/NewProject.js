import { Button, Input, TextField } from '@material-ui/core';
import { useState } from 'react';



export default function(props) {

    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    console.log(projectName, projectDescription)
    
    return(
        <form id = "new-project-form" className="new-project-card" onSubmit={() => props.projectHandler(projectName, projectDescription)}>
            <h3>Create New Project</h3>
            <TextField 
                id="outlined-basic" 
                label="Name" 
                variant="outlined"
                onChange = {(e) => setProjectName(e.target.value)} 
                value={props.name} 
                required
            />
            <TextField 
                id="outlined-basic" 
                label="Description" 
                variant="outlined"
                onChange = {(e) => setProjectDescription(e.target.value)} 
                value={props.description}
            />
            <Button 
                type="submit" 
                variant="contained" 
                color="secondary" 
                value="Create">
                Create
            </Button>
        </form>
    )
}