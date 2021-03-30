import {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop, faTrashAlt, faPen, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

export default function(props) {
    
    const [seconds, setSeconds] = useState(parseInt(props.totalTime)%60);
    const [totalSeconds, setTotalSeconds] = useState(parseInt(props.totalTime));
    const [minutes, setMinutes] = useState(Math.floor(props.totalTime/60)%60);
    const [hours, setHours] = useState(Math.floor(props.totalTime/3600));
    const [name, setName] = useState(props.name);
    const [description, setDescription] = useState(props.description);
    console.log(name);
    console.log(description)

    useEffect(() => {
    if (props.isActive) {
        setTimeout(function() {setTotalSeconds(totalSeconds+1)}, 1000);
        console.log("total seconds:", totalSeconds)
        setTimeout(function() {setSeconds((seconds+1)%60)}, 1000);
        setMinutes(Math.floor(totalSeconds/60)%60);
        setHours(Math.floor(totalSeconds/3600));
    }}, [seconds]);


    return(
        <div  style = {props.isActive ? {backgroundColor: "green", color: "white", transition: "0.5s"} : null} className="project">
            <h3 
            contentEditable = {props.editable ? true : false} 
            style = {props.editable ? {borderBottom: "2px solid #FFC839", transition: "0.1s"}: null} 
            onInput = {(e) => setName(e.target.innerText)}
            >
                {props.name}
            </h3>
            <p 
            contentEditable = {props.editable ? true : false} 
            style = {props.editable ? {borderBottom: "2px solid #FFC839", transition: "0.1s"}: null}
            onInput = {(e) => setDescription(e.target.innerText)}
            >
                {props.description}
            </p>
            <p>Started: {props.start}</p>
            <p>Status: {props.status}</p>
            <p>Total time: {hours}h {minutes}m {seconds}s</p>
            {props.isActive && props.hasActiveProjects ? 
                <div className="btn-wrapper">
                <FontAwesomeIcon 
                    className = "btn-ctrl" 
                    icon={faStop} 
                    onClick={() => props.timeControl("stop", props.projectId, totalSeconds)}/>
                <FontAwesomeIcon 
                    className = "btn-ctrl" 
                    icon={faTrashAlt} 
                    onClick={() => props.deleteProj(props.projectId)}/>
                <FontAwesomeIcon 
                    className = "btn-ctrl" 
                    icon={props.editable ? faCheckCircle : faPen} 
                    onClick={props.editable ? (e) => props.editProject(e, false, props.projectId, name, description) : (e) => props.editProject(e, true, props.projectId, name, description)}/>
                </div>:
                null
                }
            {!props.isActive && !props.hasActiveProjects ? 
                <div className="btn-wrapper">
                <FontAwesomeIcon className = "btn-ctrl" icon={faPlay} onClick={() => props.timeControl("play", props.projectId, totalSeconds)}/>
                <FontAwesomeIcon className = "btn-ctrl" icon={faTrashAlt} onClick={() => props.deleteProj(props.projectId)}/>
                <FontAwesomeIcon className = "btn-ctrl" icon={props.editable ? faCheckCircle : faPen} onClick={props.editable ? (e) => props.editProject(e, false, props.projectId, name, description) : (e) => props.editProject(e, true, props.projectId, name, description)}/>
                </div>:
                null
            }
            </div>
    )
}