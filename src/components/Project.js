import {useState, useEffect} from 'react';
import { PlayArrowRounded, StopRounded, DeleteRounded, EditRounded, CheckCircleRounded } from '@material-ui/icons'
import { Box, Card, CardActions, CardContent, Typography } from '@material-ui/core';

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
        <Card style = {props.isActive ? {border: "2px solid green", transition: "0.2s"} : null}>
            <CardContent>
                <Typography
                    variant="h5"
                    contentEditable = {props.editable ? true : false} 
                    suppressContentEditableWarning = {true}
                    style = {props.editable ? {borderBottom: "2px solid #9C20B0", transition: "0.4s"}: null} 
                    onInput = {(e) => setName(e.target.innerText)}>
                    {props.name}
                </Typography>
                <Typography
                    variant="p" 
                    color="textSecondary"
                    contentEditable = {props.editable ? true : false} 
                    suppressContentEditableWarning = {true}
                    style = {props.editable ? {borderBottom: "2px solid #9C20B0", transition: "0.4s"}: null}
                    onInput = {(e) => setDescription(e.target.innerText)}
                    >
                    {props.description}
                </Typography>
                <Typography
                    variant="body2" component="p">Started: {props.start}</Typography>
                <Typography
                    variant="body2" component="p">Status: {props.status}</Typography>
                <Typography
                    variant="p">Total time:  
                {hours < 10 ? " 0" + hours : hours}:
                {minutes < 10 ? "0" + minutes : minutes}:
                {seconds < 10 ? "0" + seconds : seconds}</Typography>
            </CardContent>

            <CardActions>
                {props.isActive ?
                    <Box width="100%" display="flex" justifyContent="space-around">
                        <StopRounded 
                            onClick={() => props.timeControl("stop", props.projectId, totalSeconds)}/>
                    </Box> : 
                    <Box width="100%" display="flex" justifyContent="space-around">
                    {props.editable ?
                    <CheckCircleRounded
                    onClick = {(e) => props.editProject(e, false, props.projectId, name, description)} />
                    :
                    <>
                        <PlayArrowRounded onClick={() => props.timeControl("play", props.projectId, totalSeconds)}/>
                        <DeleteRounded onClick={() => props.deleteProj(props.projectId)}/>
                        <EditRounded onClick = {(e) => props.editProject(e, true, props.projectId, name, description)} />
                    </>
                    }
                    </Box>
                }
                </CardActions>
            </Card>
    )
}