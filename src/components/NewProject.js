import { Button, Grid, TextField, Box} from '@material-ui/core';
import { useState } from 'react';

export default function(props) {

    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");

    
    return(
        <form id = "new-project-form" className="new-project-card" onSubmit={() => props.projectHandler(projectName, projectDescription)}>
            <h3>Create New Project</h3>
            <Grid container spacing = {2}>

            <Grid item xs={12} md={6} lg={4}>
                <TextField 
                    id="outlined-basic" 
                    label="Name" 
                    variant="outlined"
                    onChange = {(e) => setProjectName(e.target.value)} 
                    fullWidth 
                    required
                />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <TextField 
                    id="outlined-basic" 
                    label="Description" 
                    variant="outlined"
                    onChange = {(e) => setProjectDescription(e.target.value)} 
                    fullWidth
                />
            </Grid>

        </Grid>
            <Button 
                type="submit" 
                variant="contained" 
                color="secondary" 
                value="Create">
                Create
            </Button>

            <Button 
                type="submit" 
                variant="outlined" 
                color="primary" 
                value="Cancel"
                onClick={()=>props.setShowNewProject(false)}>
                Cancel
            </Button>
        </form>
    )
}