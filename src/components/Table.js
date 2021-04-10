import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'


const LogTable = (props) => { 

    const [rawData, setRawData] = useState(props.data);
    const [logsRender, setLogsRender] = useState([]);

    let logsArr = rawData.map(item => item.logs.map(log => log));
    logsArr = [].concat.apply([], logsArr);
    console.log(logsArr);

        let dataSorter = (param) => {
        console.log("in function")
        if (typeof(param) == "string") {
            logsArr.sort(function (a,b) {
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
            setLogsRender(logsArr)
            console.log("sorted", logsArr)
            return -1;
            }
            if (nameA > nameB) {
            setLogsRender(logsArr)
            console.log("sorted", logsArr)
            return 1;
            }
            return 0;
        })
        } else {
        logsArr.sort(function (a, b) {
        return a.value - b.value;
        });
        }
    }

        useEffect(() => {
        console.log("ok")
        }, [logsRender]);

        let header = 
        <tr>
        <th>
            <div className = "th-wrapper">
            <p>Project name</p>
            <div className = "sort-wrapper">
                <FontAwesomeIcon 
                style = {{height: "15px", width: "15px"}}
                className = "btn-sort" 
                icon={faSortUp}
                onClick = {() => dataSorter("string")} />
                <FontAwesomeIcon 
                style = {{height: "15px", width: "15px"}}
                className = "btn-sort" 
                icon={faSortDown} />
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
                            icon={faSortUp} />
                <FontAwesomeIcon 
                style = {{height: "15px", width: "15px"}}
                            className = "btn-sort" 
                            icon={faSortDown} />
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
                            icon={faSortUp} />
                <FontAwesomeIcon 
                            style = {{height: "15px", width: "15px"}}
                            className = "btn-sort" 
                            icon={faSortDown} />
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
                icon={faSortUp} />
                <FontAwesomeIcon 
                style = {{height: "15px", width: "15px"}}
                className = "btn-sort" 
                icon={faSortDown} />
            </div>
            </div>
        </th>
        </tr>;

        let cells = logsArr.map(log => {
        return (<tr>
                <td>{log.name}</td>
                <td>{log.startDate}</td>
                <td>{log.endDate}</td>
                <td>{log.logTime}</td>
                </tr>)
                });
        
    return (
        <div className = "table-wrapper">
            <p>Logs you made in this period:</p>
            <table>
            {header}
            {cells}
            </table>
        </div>)}

export default LogTable;