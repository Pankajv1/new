import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';

import { Box, Container, Modal, Button, Typography, DialogActions, Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Fade from '@mui/material/Fade';
import { API_BASE_URL } from '../../utils/Constant';
import ApiService from '../../service/Api.service';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddressModel(props) {
  
  const [open, setOpen] = useState(false);   
  const [data, setdata] = useState('');   
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = ()=>{
    const headers = {
      address: data,
      userID: props?._id
     
  };
    const url = `${API_BASE_URL}user/saveaddress`;
           
    ApiService.post(url, headers)
    .then(res => {
        if (res.data.status == 200) {
          alert("Address added Successfully.");
          
            setOpen(false)
        } else {
          alert("Something Went Wrong")
           
        }
    })
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
   
    
    setdata(value)
}
  return (
    <div>
      <Button onClick={handleOpen}>Save Address</Button>
      <Dialog
            fullWidth
            maxWidth={'sm'}
            open={open}
            onClose={handleClose}
          >
            <DialogTitle>
              Optional sizes
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
                className='close-bttn'
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
               Address
              </DialogContentText>
              <Grid item xs={4}>
                <TextField
                    placeholder="Enter your Addeess"
                    label="Address"
                    name="address" 
                    variant="outlined"
                    fullWidth
                    required
                    className=''
                    value={data}
                    onChange={handleChange}
                    
                    id="margin-dense"
                    margin="dense"
                />

                </Grid>
                <Button
                    type="submit"
                    variant="outlined"
                    color="secondary"
                    onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </Button>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
     
    </div>
  );
}
