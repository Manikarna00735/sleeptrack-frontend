import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRef } from 'react';
import axios from "axios"
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import Cookies from 'js-cookie';
import { Alert } from '@mui/material';

export default function LoginPage() {
  const [open, setOpen] = React.useState(false);
  const [singleData, setSingleData] = useState({
    email:"",
    password:""
  });
  const form = useRef(null);

  const [alert,setAlert] = useState(false);

    let navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSingleData({
      email:"",
      password:""
    });
    setAlert(false);
  };

  const onChangeClick=(e)=>{
    e.preventDefault();
    const {id,value} = e.target;
    const tempData = {...singleData};
    tempData[id]=value;
    setSingleData(tempData);
    setAlert(false);
    
  }
  

  const onClickHandle=()=>{
    if(singleData.email !=="" && singleData.password !==""){
    axios.post(`/login/data`, singleData).then((response)=>{
        if(response.data === true){
          let str = singleData.email;
          Cookies.set('username',str.slice(0,-10));
            navigate("/sleeptrack");
            setOpen(false);
        }
        else{
          setAlert(true);
        }
    });
  }
    
  }

  return (
    <div>
      
      <button id='login' onClick={handleClickOpen}>
       Login
      </button>
      
      <Dialog open={open} onClose={handleClose}>
      <ValidatorForm ref={form} onSubmit={onClickHandle}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your Login details
          </DialogContentText><br/>
          {alert === true ? (<Alert severity='error'>Username or Password incorrect</Alert>):null}
          {/* <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={onChangeClick}
          /> */}
          <TextValidator
                    label="Email"
                    onChange={onChangeClick}
                    id="email"
                    value={singleData.email}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                /><br/>
          {/* <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={onChangeClick}
          /> */}
          <TextValidator
                    label="Password"
                    onChange={onChangeClick}
                    id="password"
                    type="password"
                    validators={['required']}
                    errorMessages={['this field is required']}
                    value={singleData.password}
                />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>Cancel</Button>
          <Button color='success' type='submit'>Login</Button>
        </DialogActions>
        </ValidatorForm>
      </Dialog>
      
    </div>
  );
}
