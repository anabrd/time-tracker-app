import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

const LogTable = (props) => { 

    const [rawData, setRawData] = useState(props.data);
    let logsArr = rawData.map(item => item.logs.map(log => log));
    logsArr = [].concat.apply([], logsArr);
    const [logsRender, setLogsRender] = useState(logsArr);

    let timeParser = (total) => {
        let hours   = Math.floor(total / 3600);
        let minutes = Math.floor((total - (hours * 3600)) / 60);
        let seconds = total - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0" + hours;}
        if (minutes < 10) {minutes = "0" + minutes;}
        if (seconds < 10) {seconds = "0" + seconds;}
        return hours+':'+minutes+':'+seconds;
    }

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

        let cells = logsRender.map(log => <tr>
                                        <td>{log.name}</td>
                                        <td>{log.startDate}</td>
                                        <td>{log.endDate}</td>
                                        <td>{timeParser(log.logTime)}</td>
                                        </tr>);
        
    return (<div className = "table-wrapper">
                <p>Logs you made in this period:</p>
                <table>
                    {header}
                    {cells}
                </table>
            </div>)
}

export default LogTable;