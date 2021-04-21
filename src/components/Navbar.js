import { NavLink } from 'react-router-dom';
import { AppBar, Link, Toolbar, Typography, List, ListItem, ListItemText } from '@material-ui/core';

const Navbar = (props) => {
    return (
        <AppBar>
            <Toolbar variant="dense" style={{display: "flex", justifyContent:"space-between"}}>
            <Typography variant="h3" ><Link style={{color: "white"}}component={NavLink} to="/">Time Tracker ⏱</Link></Typography>
            {props.loggedIn && 
            <List style={{display: "flex"}}>
                <ListItem button> 
                    <ListItemText>   
                        <Link component={NavLink} color="secondary" to="/">
                            Projects
                        </Link>
                    </ListItemText>
                </ListItem>
                
                <ListItem button>
                    <ListItemText>
                        <Link component={NavLink} color="secondary" to="/reports">
                            Reports
                        </Link>
                    </ListItemText>
                </ListItem>

                <ListItem button>
                    <ListItemText>
                        <Link component={NavLink} to="/" color="secondary" onClick={props.logout}>
                            Logout
                        </Link>
                    </ListItemText>
                </ListItem>
            </List>}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
