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

    useEffect(() => {
        let updateTime;
        if (props.isActive) {
            updateTime = setTimeout(() => {setTotalSeconds(totalSeconds+1); setSeconds((seconds+1)%60)}, 1000);
            setMinutes(Math.floor(totalSeconds/60)%60);
            setHours(Math.floor(totalSeconds/3600));
        }
        return () => clearTimeout(updateTime);
    }, [seconds, props.isActive]);


    return(
        <div style = {props.isActive ? {border: "2px solid green", transition: "0.2s"} : null} className="project">
            <h3 
            contentEditable = {props.editable ? true : false} 
            suppressContentEditableWarning = {true}
            style = {props.editable ? {borderBottom: "2px solid #9C20B0", transition: "0.4s"}: null} 
            onInput = {(e) => setName(e.target.innerText)}>
                {props.name}
            </h3>
            <p 
            contentEditable = {props.editable ? true : false} 
            suppressContentEditableWarning = {true}
            style = {props.editable ? {borderBottom: "2px solid #9C20B0", transition: "0.4s"}: null}
            onInput = {(e) => setDescription(e.target.innerText)}>
                {props.description}
            </p>
            <p>Started: {props.start}</p>
            <p>Status: {props.status}</p>
            <p>Total time: {hours}h {minutes}m {seconds}s</p>
            {props.isActive ?
                <div className="btn-wrapper">
                    <FontAwesomeIcon 
                        className = "btn-active" 
                        icon={faStop} 
                        onClick={() => props.timeControl("stop", props.projectId, totalSeconds)}/>
                </div> : 
                <div className="btn-wrapper">
                {!props.editable && 
                <FontAwesomeIcon 
                    className = "btn-ctrl" 
                    icon={faPlay} 
                    onClick={() => props.timeControl("play", props.projectId, totalSeconds)}/>}
                {!props.editable && 
                <FontAwesomeIcon 
                    className = "btn-ctrl" 
                    icon={faTrashAlt} onClick={() => props.deleteProj(props.projectId)}/>}
                <FontAwesomeIcon 
                    icon = {props.editable ? faCheckCircle : faPen} 
                    className = {props.editable ? "btn-active" : "btn-ctrl"}
                    onClick = {props.editable ? (e) => props.editProject(e, false, props.projectId, name, description) : (e) => props.editProject(e, true, props.projectId, name, description)}/>
                </div>}
            </div>
    )
}