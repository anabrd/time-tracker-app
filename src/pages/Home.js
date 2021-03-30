import './Home.css'
import NewProject from '../components/NewProject'
import {useState} from 'react'
import Project from '../components/Project'

export default function(props) {

    const [currentProject, setCurrentProject] = useState({});
    let hasActiveProjects;
    let activeProjects = props.projectsDB.filter(project => project.isActive);

    if (activeProjects.length == 0) {
        hasActiveProjects = false;
    } else {
        hasActiveProjects = true;
    }

    // ADD NEW PROJECT
    let submitNewProjectHandler = (event) => {
        event.preventDefault();
        let newProject = {};

        if (props.projectsDB.length == 0) {
            newProject.id = 0;
        } else {
            newProject.id = props.projectsDB[props.projectsDB.length-1].id + 1;
        }
        
        newProject.projectName = event.currentTarget.children[1].children[0].value;
        newProject.description = event.currentTarget.children[1].children[1].value;
        newProject.start = new Date().toLocaleString();
        newProject.status = "inactive";
        newProject.startTime = null;
        newProject.totalTime = 0;
        newProject.isActive = false;
        props.setShowNewProject(false);
        props.setProjectsDB([...props.projectsDB, newProject]);
    }

    // TIME CONTROLLER
    let timeControl = (action, projectId, time) => {
        

        let currentlyActive = props.projectsDB.filter(project => project.id == projectId);

        if (action == "play") {
            currentlyActive[0].status = "active";
            currentlyActive[0].isActive = true;
            setCurrentProject({...currentlyActive[0]});
        } else {
            currentlyActive[0].status = "inactive";
            currentlyActive[0].isActive = false;
            currentlyActive[0].totalTime = time;
            setCurrentProject({...currentlyActive[0]});
            let duplicate = [...props.projectsDB];
            let replaceIndex = props.projectsDB.findIndex(project => project.id == projectId);
            duplicate.splice(replaceIndex, 1, currentlyActive[0]);
            props.setProjectsDB([...duplicate]);
        }
    }

    // DELETE PROJECT
    let deleteProj = (projectId) => {
        let deleteIndex = props.projectsDB.findIndex(project => project.id == projectId);
        let duplicate = [...props.projectsDB];
        duplicate.splice(deleteIndex, 1);
        props.setProjectsDB([...duplicate]);
    }

        // PROJECTS COMPONENT
    let ProjectGroup = () => {
        let projects = props.projectsDB.map(project => 
            <Project 
            projectId = {project.id}  
            name = {project.projectName}
            description = {project.description} 
            start = {project.start} 
            status = {project.status} 
            timeControl = {timeControl}
            deleteProj = {deleteProj}
            totalTime = {project.totalTime} 
            isActive = {project.isActive}
            hasActiveProjects = {hasActiveProjects} />);
        return (<div className="project-wrapper">
            { projects }
            </div>);
    }

    return (
        <div>
            <div>
            <h3>Welcome{/* , {props.username} */}!</h3>
            <div>{props.projectsDB.length !== 0 ? <ProjectGroup />: "You have no projects yet."}</div>
            {props.showNewProject ? <NewProject submitNewProject = {submitNewProjectHandler}/> : null}
            </div>
        </div>
        )
}