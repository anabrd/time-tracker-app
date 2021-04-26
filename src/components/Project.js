import {useState, useEffect} from 'react';
import { PlayArrowRounded, StopRounded, DeleteRounded, EditRounded, CheckCircleRounded } from '@material-ui/icons'
import { Box, Card, CardActions, CardContent, Tooltip, Typography } from '@material-ui/core';
import TimeParser from './TimeParser'

export default function(props) {
    
    const [seconds, setSeconds] = useState(parseInt(props.totalTime)%60);
    const [totalSeconds, setTotalSeconds] = useState(parseInt(props.totalTime));
    const [name, setName] = useState(props.name);
    const [description, setDescription] = useState(props.description);
    

    useEffect(() => {
        let updateTime;
        if (props.isActive) {
            updateTime = setTimeout(() => {setTotalSeconds(totalSeconds+1); setSeconds((seconds+1)%60)}, 1000);
        }
        return () => clearTimeout(updateTime);
    }, [seconds, props.isActive]);


    return(
        <Card style = {props.isActive ? {background: "linear-gradient(to right, #fbc7d4, #9796f0)", transition: "0.2s"} : null}>
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
                    style = {props.editable ? {borderBottom: "2px solid #9C20B0", transition: "0.2s"}: null}
                    onInput = {(e) => setDescription(e.target.innerText)}
                    >
                    {props.description}
                </Typography>
                <Typography
                    variant="body2" component="p">Started: {props.start}</Typography>
                <Typography
                    variant="body2" component="p">Status: {props.status}</Typography>
                <Typography
                    variant="p">Total time: {TimeParser(totalSeconds)}</Typography>
            </CardContent>
            <CardActions>
                <Box width="100%" display="flex" justifyContent="space-around">
                    {props.isActive ?
                        <Tooltip title="Stop">
                            <StopRounded onClick={() => props.timeControl("stop", props.projectId, totalSeconds)}/>
                        </Tooltip> : 
                        props.editable ?
                        <Tooltip title="Submit">
                            <CheckCircleRounded onClick = {(e) => props.editProject(e, false, props.projectId, name, description)} />
                        </Tooltip>
                        :
                        <>
                            <Tooltip title="Start">
                                <PlayArrowRounded onClick={() => props.timeControl("play", props.projectId, totalSeconds)}/>
                            </Tooltip>

                            <Tooltip title="Delete">
                                <DeleteRounded onClick={() => props.deleteProj(props.projectId)}/>
                            </Tooltip>

                            <Tooltip title="Edit">
                                <EditRounded onClick = {(e) => props.editProject(e, true, props.projectId, name, description)} />
                            </Tooltip>
                        </>
                    }
                </Box>
            </CardActions>
        </Card>
    )
}