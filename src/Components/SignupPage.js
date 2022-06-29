import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import axios from 'axios';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import { Alert } from '@mui/material';

export default function SignupPage() {
  const [open, setOpen] = React.useState(false);
  const [singleData, setSingleData] = useState({
    email:"",
    password:""
  });
  const [check,setCheck] = useState("");

  const form = React.useRef(null)

  const [passAlert,setPassAlert] = useState(false);
  const [unAlert,setUnAlert] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    
  };

  const handleClose = () => {
    setOpen(false);
    setSingleData({
      email:"",
      password:""
    });
    setCheck("");
    setUnAlert(false);
    setPassAlert(false);
  };

  const onChangeClick=(e)=>{
    e.preventDefault();
    const {id,value} = e.target;
    const tempData = {...singleData};
    tempData[id]=value;
    setSingleData(tempData);
    setUnAlert(false);
    setPassAlert(false);
  }

  const onClickHandle=()=>{
    if(singleData.email !=="" && singleData.password !==""){
    if(check === singleData.password){    
    axios.post("/signup/data", singleData).then((response)=>{
        if(response.data === false){
            alert("Registered Successfully!! Try Login");
            setOpen(false);
        }else{
            setUnAlert(true);
        }
    });
    }else{
        setPassAlert(true);
    }
  }
  }
  return (
    <div>
      
      <a id="hyp" onClick={handleClickOpen}>
       SignUp? for newuser....
      </a>
      <Dialog open={open} onClose={handleClose}>
      <ValidatorForm ref={form} onSubmit={onClickHandle}>
        <DialogTitle>SignUp</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your Username and Password
          </DialogContentText><br/>
          {unAlert === true ? (<Alert severity='error'>Username Already Exist</Alert>):null}<br/>
          {passAlert === true ? (<Alert severity='error'>Password and Confirm password should be same</Alert>):null}<br/>
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
                /><br/>
          {/* <TextField
            autoFocus
            margin="dense"
            id="conpassword"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={e=>setCheck(e.target.value)}
          /> */}
          <TextValidator
                    label="Confirm Password"
                    onChange={e=>setCheck(e.target.value)}
                    id="conpassword"
                    type="password"
                    validators={['required']}
                    errorMessages={['this field is required']}
                    value={check}
                />
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={handleClose}>Cancel</Button>
          <Button color='success' type='submit'>SignUp</Button>
        </DialogActions>
        </ValidatorForm>
      </Dialog>
      
    </div>
  );
}
