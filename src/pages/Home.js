import './Styles.css'
import NewProject from '../components/NewProject'
import NewProjectBtn from '../components/NewProjectBtn'
import Project from '../components/Project'
import Loader from '../components/Loader'
import {useState, useEffect} from 'react'
import { HashLink as Link } from 'react-router-hash-link';

export default function(props) {

    const [currentProject, setCurrentProject] = useState({});
    const [projects, setProjects] = useState([]);
    const [showNewProject, setShowNewProject] = useState(false);

    
    // ADD NEW PROJECT
    let submitNewProjectHandler = (event) => {
        event.preventDefault();
        let newProject = {};
        newProject.id = Date.now();
        newProject.projectName = event.currentTarget.children[1].children[0].value;
        newProject.description = event.currentTarget.children[1].children[1].value;
        newProject.start = new Date().toLocaleString();
        newProject.status = "inactive";
        newProject.startTime = null;
        newProject.totalTime = 0;
        newProject.isActive = false;
        newProject.isEditable = false;
        setShowNewProject(false);
        props.setProjectsDB([...props.projectsDB, newProject]);
    }

    // TIME CONTROLLER
    let timeControl = (action, projectId, time) => {
        let currentlyActive = props.projectsDB.filter(project => project.id == projectId);

        if (action == "play") {
            currentlyActive[0].status = "active";
            currentlyActive[0].isActive = true;
        } else {
            currentlyActive[0].status = "inactive";
            currentlyActive[0].isActive = false;
            currentlyActive[0].totalTime = time;
        }
        setCurrentProject({...currentlyActive[0]});
        let duplicate = [...props.projectsDB];
        let replaceIndex = props.projectsDB.findIndex(project => project.id == projectId);
        duplicate.splice(replaceIndex, 1, currentlyActive[0]);
        props.setProjectsDB([...duplicate]);
    }

    // DELETE PROJECT
    let deleteProj = (projectId) => {
        let deleteIndex = props.projectsDB.findIndex(project => project.id == projectId);
        let duplicate = [...props.projectsDB];
        duplicate.splice(deleteIndex, 1);
        props.setProjectsDB([...duplicate]);
    }

    let editProject = (e, status, projectId, name, description) => {
        let currentlyActive = props.projectsDB.filter(project => project.id == projectId);
        currentlyActive[0].isEditable = status;
        currentlyActive[0].projectName = name;
        currentlyActive[0].description = description;
        let duplicate = [...props.projectsDB];
        let replaceIndex = props.projectsDB.findIndex(project => project.id == projectId);
        duplicate.splice(replaceIndex, 1, currentlyActive[0]);
        props.setProjectsDB([...duplicate]);
    }

    // PROJECTS COMPONENT
    
    useEffect(() => {
        setProjects(props.projectsDB.map(project => 
            <Project 
            projectId = {project.id}  
            name = {project.projectName}
            description = {project.description} 
            start = {project.start} 
            status = {project.status} 
            timeControl = {timeControl}
            editProject = {editProject}
            deleteProj = {deleteProj}
            totalTime = {project.totalTime} 
            isActive = {project.isActive}
            editable = {project.isEditable} />
        ))
    }, [props.projectsDB]);

    // Toggle show new project comp
    let showNewProjectHandler = () => {
        setShowNewProject(prevState => !prevState);
    }

    return (
        <div>
            <div>
            <h3>Welcome!</h3>
            {props.loader ? <Loader /> : null}
            {props.projectsDB.length !== 0 || props.loader ? <div className="project-wrapper"> { projects } </div>: <p>You have no projects yet.</p>}
            {showNewProject ? <NewProject projectHandler = {submitNewProjectHandler}/> : <Link to="/home/#new-project-form"><NewProjectBtn showNewProjectHandler = {showNewProjectHandler}/></Link>}
            </div>
        </div>
        )
}