import { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { ArrowDownwardRounded } from '@material-ui/icons'
import timeParser from './TimeParser'

const LogTable = (props) => { 

    const [rawData, setRawData] = useState(props.data);

    let logsArr = rawData.map(item => item.logs.map(log => log));
    logsArr = [].concat.apply([], logsArr);
    const [logsRender, setLogsRender] = useState(logsArr);

    let dataSorter = (param, order) => {
        console.log("in function")

        if (param == "name") {
            logsArr.sort(function (a,b) {
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            
            if (order == "asc") {
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
        } else if (order == "desc") {
            if (nameA > nameB) {
                return -1;
            }
            if (nameA < nameB) {
                return 1;
            }
        }
        
        return 0;
        
        })} else if (param == "logTime") {
            logsArr.sort(function (a, b) {
                if (order == "asc") {
                    return a.logTime - b.logTime;
                } else if (order == "desc") {
                    return b.logTime - a.logTime;
                }
        })} else if (param == "logOrder") {
            logsArr.sort(function (a, b) {
                if (order == "asc") {
                    return a.id - b.id;
                } else if (order == "desc") {
                    return b.id - a.id;
                }

            });
        }
        setLogsRender([...logsArr])
    }

    useEffect(() => {
    console.log(logsRender)
    }, [logsArr]);


    let header = 
    <tr>
        <th>
            <div className = "th-wrapper">
                <p>Project name</p>
                <div className = "sort-wrapper">
                    <FontAwesomeIcon 
                    style = {{height: "15px", width: "15px"}}
                    className = "btn-sort" 
                    icon={faCaretUp}
                    onClick = {() => dataSorter("name", "desc")} />
                    <FontAwesomeIcon 
                    style = {{height: "15px", width: "15px"}}
                    className = "btn-sort" 
                    icon={faCaretDown}
                    onClick = {() => dataSorter("name", "asc")} />
                </div>
            </div>
        </th>
        <th>
            <div className = "th-wrapper">
                <p>Log start</p>
                <div className = "sort-wrapper">
                    <FontAwesomeIcon 
                    style = {{height: "15px", width: "15px"}}
                    className = "btn-sort" 
                    icon={faCaretUp} 
                    onClick = {() => dataSorter("logOrder", "desc")}/>
                    <FontAwesomeIcon 
                    style = {{height: "15px", width: "15px"}}
                    className = "btn-sort" 
                    icon={faCaretDown} 
                    onClick = {() => dataSorter("logOrder", "asc")}/>
                </div>
            </div>
        </th>
        <th>
            <div className = "th-wrapper">
                <p>Log end</p>
                <div className = "sort-wrapper">
                    <FontAwesomeIcon 
                    style = {{height: "15px", width: "15px"}}
                    className = "btn-sort" 
                    icon={faCaretUp} 
                    onClick = {() => dataSorter("logOrder", "desc")}/>
                    <FontAwesomeIcon 
                    style = {{height: "15px", width: "15px"}}
                    className = "btn-sort" 
                    icon={faCaretDown} 
                    onClick = {() => dataSorter("logOrder", "asc")}/>
                </div>
            </div>
        </th>
        <th>
            <div className = "th-wrapper">
                <p>Time logged</p>
                <div className = "sort-wrapper">
                    <FontAwesomeIcon 
                    style = {{height: "15px", width: "15px"}}
                    className = "btn-sort" 
                    icon={faCaretUp} 
                    onClick = {() => dataSorter("logTime", "desc")}/>
                    <FontAwesomeIcon 
                    style = {{height: "15px", width: "15px"}}
                    className = "btn-sort" 
                    icon={faCaretDown} 
                    onClick = {() => dataSorter("logTime", "asc")}/>
                </div>
            </div>
        </th>
        </tr>;
        
    return (<>
            <p>Logs you made in this period:</p>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Project name
                                <TableSortLabel />
                            </TableCell>
                            <TableCell>
                                Log Start
                                <TableSortLabel />
                            </TableCell>
                            <TableCell>
                                Log End
                                <TableSortLabel />
                            </TableCell>
                            <TableCell>
                                Time Logged
                                <TableSortLabel 
                                onClick = {() => dataSorter("logTime", "asc")}/>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                        <TableBody>
                            {logsRender.map((log, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        {log.name}
                                    </TableCell>
                                    <TableCell>
                                        {log.startDate}
                                    </TableCell>
                                    <TableCell>
                                        {log.endDate}
                                    </TableCell>
                                    <TableCell>
                                        {timeParser(log.logTime)}
                                    </TableCell>
                                </TableRow>
                            )
                            )}
                        </TableBody>
                </Table>
            </TableContainer>
        </>)
}

export default LogTable;