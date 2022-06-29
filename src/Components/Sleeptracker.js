import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Graph from './Graph';
import Newentry from './Newentry'

export default function Sleeptracker() {
    
    const [tableData, setTableData] = useState([]);
    const username = Cookies.get('username');
    
    useEffect(()=>{
        axios.get(`/newentry/data`,{params:{name:username}}).then((response)=>{
            setTableData(response.data);
        })
    },[]);
    

    const onClickTableData = (data)=>{
        setTableData(data);
        
    };


  return (
    <div className='sleepdata'>
        <h1 className='center'>Welcome {username}</h1>
        <h2 className='center' >Daily Sleep Tracker <Link to="/"><button id='logout'>Logout</button></Link></h2>
        <div className="center"><Newentry username={username} onClickTableData={onClickTableData}/></div>
       <div> <h3 id='tabtitle'>Sleep Stats</h3>
       <Table sx={{ maxWidth: 380 }} aria-label="simple table">
       <TableHead>
          <TableRow>
          <TableCell>DATE</TableCell>
          <TableCell align="right">Time of Sleep</TableCell>
          <TableCell align="right">WakeUp time</TableCell>
          <TableCell align="right" >Duration(hrs)</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {tableData.map((one)=>(  
                <TableRow>
                        <TableCell component="th" scope="row">{one.date}</TableCell>
                        <TableCell align="right">{one.sleep}</TableCell>
                        <TableCell align="right">{one.wakeup}</TableCell>
                        <TableCell align="right">{one.duration}</TableCell>
                </TableRow>
                ))}
                </TableBody>       
        </Table>
        <span id='graph'><h3 id='graphtitle'>Sleep Duration Graph</h3>
            <Graph tableData={tableData}/></span>
        </div>
    </div>
  )
}
