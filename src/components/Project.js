import {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default function(props) {
    
    const [seconds, setSeconds] = useState(parseInt(props.totalTime)%60);
    const [totalSeconds, setTotalSeconds] = useState(parseInt(props.totalTime));
    const [minutes, setMinutes] = useState(Math.floor(props.totalTime/60)%60);
    const [hours, setHours] = useState(Math.floor(props.totalTime/3600));


    useEffect(() => {
    if (props.isActive) {
        setTimeout(function() {setTotalSeconds(totalSeconds+1)}, 1000);
        console.log("total seconds:", totalSeconds)
        setTimeout(function() {setSeconds((seconds+1)%60)}, 1000);
        setMinutes(Math.floor(totalSeconds/60)%60);
        setHours(Math.floor(totalSeconds/3600));
    }}, [seconds]);

    return(
        <div style = {props.isActive ? {backgroundColor: "green", color: "white", transition: "0.5s"} : null} className="project">
            <h3>{props.name}</h3>
            <p>{props.description}</p>
            <p>Started: {props.start}</p>
            <p>Status: {props.status}</p>
            <p>Total time: {hours}h {minutes}m {seconds}s</p>

            

               {props.isActive && props.hasActiveProjects ? 
                    <div className="btn-wrapper">
                    <FontAwesomeIcon className = "btn-ctrl" icon={faPlay} onClick={() => props.play(props.name, totalSeconds)}/>
                    <FontAwesomeIcon className = "btn-ctrl" icon={faStop} onClick={() => props.stop(props.name, totalSeconds)}/>
                    <FontAwesomeIcon className = "btn-ctrl" icon={faTrashAlt} onClick={props.delete}/>
                    </div>:
                    null
                }
                {
                !props.isActive && !props.hasActiveProjects ? 
                    <div className="btn-wrapper">
                    <FontAwesomeIcon className = "btn-ctrl" icon={faPlay} onClick={() => props.play(props.name, totalSeconds)}/>
                    <FontAwesomeIcon className = "btn-ctrl" icon={faStop} onClick={() => props.stop(props.name, totalSeconds)}/>
                    <FontAwesomeIcon className = "btn-ctrl" icon={faTrashAlt} onClick={props.delete}/>
                    </div>:
                    null
                }
            </div>
    )
}