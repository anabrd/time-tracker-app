//TODO : Data get and post, add delete
import './Home.css'
import NewProject from '../components/NewProject'
import {useState, useEffect} from 'react'
import Dashboard from '../components/Dashboard'
import Project from '../components/Project'

export default function(props) {

    const [currentProject, setCurrentProject] = useState({});
    const [projectsDB, setProjectsDB] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));
    let hasActiveProjects;

    useEffect(() => {
        let url = "https://auth404.herokuapp.com/api/my-data";
        let options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        }

        fetch(url,options).then(res => res.json()).then(output => setProjectsDB(output.data.data));
        console.log(projectsDB)
    }, []);

    useEffect(() => {
        let url = "https://auth404.herokuapp.com/api/my-data";
        let updatedData = [...projectsDB]
        let options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify({data: updatedData})
            }

        fetch(url,options).then(res => res.json()).then(output => console.log("post", output));
    }, [projectsDB]);

    let activeProjects = projectsDB.filter(project => project.isActive);

        if (activeProjects.length == 0) {
            hasActiveProjects = false;
        } else {
            hasActiveProjects = true;
        }

    // PROJECTS
    let ProjectGroup = () => {
        let projects = projectsDB.map(project => 
            <Project 
            projectId = {project.id}  
            name = {project.projectName}
            description = {project.description} 
            start = {project.start} 
            status = {project.status} 
            play = {startTime}
            stop = {stopTime}
            deleteProj = {deleteProj}
            totalTime = {project.totalTime} 
            isActive = {project.isActive}
            hasActiveProjects = {hasActiveProjects} />);
        return (<div className="project-wrapper">
            { projects }
            </div>);
    }

    let submitNewProjectHandler = (event) => {
        event.preventDefault();
        let newProject = {};

        if (projectsDB.length == 0) {
            newProject.id = 0;
        } else {
            newProject.id = projectsDB[projectsDB.length-1].id + 1;
        }
        
        newProject.projectName = event.currentTarget.children[1].children[0].value;
        newProject.description = event.currentTarget.children[1].children[1].value;
        newProject.start = new Date().toLocaleString();
        newProject.status = "inactive";
        newProject.startTime = null;
        newProject.totalTime = 0;
        newProject.isActive = false;
        props.setShowNewProject(false);
        setProjectsDB([...projectsDB, newProject]);
    }

    // START TIME
    let startTime = (projectId) => {
        // Check if an existing project is already active
        let currentlyActive = projectsDB.filter(project => project.id == projectId);
        currentlyActive[0].status = "active";
        currentlyActive[0].isActive = true;
        setCurrentProject(currentlyActive);
    }

    // STOP TIME
    let stopTime = (projectId, time) => {
        let currentlyActive = projectsDB.filter(project => project.id == projectId);
        currentlyActive[0].status = "inactive";
        currentlyActive[0].isActive = false;
        currentlyActive[0].totalTime = time;
        setCurrentProject(currentlyActive);
        let duplicate = [...projectsDB];
        duplicate.splice(currentlyActive[0].id, 1, currentlyActive[0]);
        setProjectsDB([...duplicate]);
        console.log(projectsDB);
    }

    let deleteProj = (projectId) => {
        let duplicate = [...projectsDB];
        let currentlyActive = duplicate.filter(project => project.id == projectId);
        duplicate.splice(currentlyActive[0].id, 1);
        setProjectsDB([...duplicate]);
        console.log(projectsDB);
    }

    return (
        <div>
            <Dashboard 
            username = {props.username} 
            content = {projectsDB.length !== 0 ? <ProjectGroup />: "You have no projects yet."} />
            {props.showNewProject ? <NewProject submitNewProject = {submitNewProjectHandler}/> : null}
        </div>
        )
}