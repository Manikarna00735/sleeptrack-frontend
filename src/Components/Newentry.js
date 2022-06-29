import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import axios from 'axios';


export default function Newentry({username, onClickTableData}) {
  const [open, setOpen] = React.useState(false);
  const [singleData,setSingleData] = React.useState({date:"",sleep:"",wakeup:""});
  const form = React.useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClickHandle=()=>{
    if(singleData.date !=="" && singleData.sleep !=="" && singleData.wakeup !==""){
    setOpen(false);
    
    const temp={name:username,data:singleData};
    axios.post("/newentry/data", temp).then((response)=>{
      onClickTableData(response.data);
    });
  }
  setSingleData({date:"",sleep:"",wakeup:""});
  }

  const onChangeClick=(e)=>{
    e.preventDefault();
    const {id,value} = e.target;
    const tempData = {...singleData};
    tempData[id]=value;
    setSingleData(tempData);
  }

  const onResetHandle =()=>{
    setSingleData({date:"",sleep:"",wakeup:""})
  }

  return (
    <div>
      
      <Button  variant="outlined" onClick={handleClickOpen}>
       New Entry
      </Button>
      <Dialog open={open} onClose={handleClose}>
      <ValidatorForm ref={form} onSubmit={onClickHandle}>
        <DialogTitle>Sleep Tracker</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your Sleep Datas
          </DialogContentText><br/>
          {/* <TextField
            autoFocus
            margin="dense"
            id="date"
            type="date"
            value={singleData.date}
            fullWidth
            variant="standard"
            onChange={onChangeClick}
          /> */}
          <TextValidator
                    onChange={onChangeClick}
                    id="date"
                    type='date'
                    value={singleData.date}
                    validators={['required']}
                    errorMessages={['this field is required']}
                /><br/>
          {/* <TextField
            autoFocus
            margin="dense"
            id="sleep"
            type="time"
            fullWidth
            value={singleData.sleep}
            variant="standard"
            onChange={onChangeClick}
          /> */}
          <TextValidator
                    onChange={onChangeClick}
                    id="sleep"
                    type='time'
                    value={singleData.sleep}
                    validators={['required']}
                    errorMessages={['this field is required']}
                /><br/>
          {/* <TextField
            autoFocus
            margin="dense"
            id="wakeup"
            type="time"
            fullWidth
            value={singleData.wakeup}
            variant="standard"
            onChange={onChangeClick}
          /> */}
          <TextValidator
                    onChange={onChangeClick}
                    id="wakeup"
                    type='time'
                    value={singleData.wakeup}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={handleClose}>Cancel</Button>
          <Button color='secondary' onClick={onResetHandle}>Reset</Button>
          <Button color='success' type="submit">Submit</Button>
        </DialogActions>
        </ValidatorForm>
      </Dialog>
      
    </div>
  );
}
