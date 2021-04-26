import { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import timeParser from './TimeParser'

const LogTable = (props) => { 

    const [rawData, setRawData] = useState(props.data);
    let logsArr = rawData.map(item => item.logs.map(log => log));
    logsArr = [].concat.apply([], logsArr);
    const [logsRender, setLogsRender] = useState(logsArr);
    const [order, setOrder] = useState("desc");
    const [activeSort, setActiveSort] = useState(true);

    let dataSorter = (param, order) => {
        if (param == "name") {
            logsArr.sort(function (a,b) {
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            
            if (order == "asc") {
                setOrder("desc");
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
            } else if (order == "desc") {
                setOrder("asc");
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
                    setOrder("desc");
                    return a.logTime - b.logTime;
                } else if (order == "desc") {
                    setOrder("asc");
                    return b.logTime - a.logTime;
                }
        })} else if (param == "logOrder") {
            logsArr.sort(function (a, b) {
                if (order == "asc") {
                    setOrder("desc");
                    return a.id - b.id;
                } else if (order == "desc") {
                    setOrder("asc");
                    return b.id - a.id;
                }

            });
        }
        setLogsRender([...logsArr])
    }

    useEffect(() => {
    console.log(logsRender)
    }, [logsArr]);
        
    return (<TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Project name
                                <TableSortLabel 
                                active = {activeSort}
                                onClick = {() => dataSorter("name", order)}/>
                            </TableCell>
                            <TableCell>
                                Log Start
                                <TableSortLabel 
                                active = {activeSort}
                                onClick = {() => dataSorter("logOrder", order)}/>
                            </TableCell>
                            <TableCell>
                                Log End
                                <TableSortLabel 
                                active = {activeSort}
                                onClick = {() => dataSorter("logOrder", order)}/>
                            </TableCell>
                            <TableCell>
                                Time Logged
                                <TableSortLabel 
                                active = {activeSort}
                                onClick = {() => dataSorter("logTime", order)}/>
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
            </TableContainer>)
}

export default LogTable;