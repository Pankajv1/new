import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Modal, Grid, FormControl, InputLabel, Select, MenuItem, Button, Typography, DialogActions, Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { ServiceListResults } from '../components/permission/user-list-results';

import { DashboardLayout } from '../components/dashboard-layout';
import SnackbarData from '../components/Snackbar';
import ApiService from '../service/Api.service';
import { API_BASE_URL } from '../utils/Constant';
import { customers } from '../__mocks__/customers';
const perpage = ['service','subservice','menu','sidemenu','user','slider'];
const permissionusertype  = {};
const Page = () => {

  const [usertype, setuser] = useState("");
  const [permissiondata, setpermissiondata] = useState({});
  const [permissionusers, setpermissionusers] = useState({});
  
  const Callpermission=(usertype)=>{
    console.log(usertype,'usertype');
    const permissionobj = {};
    const permissionusertype  = {};
    permissionusertype[usertype] = {};
  
    perpage.map((pages) =>{
      permissionobj[pages] = {};
      permissionobj[pages]['add'] = 0;
      permissionobj[pages]['edit'] = 0;
      permissionobj[pages]['delete'] = 0;
    })
    permissionusertype[usertype] = permissionobj;
    setpermissiondata(permissionusertype);
  }
  
  
  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = () => {
    const permissionarray = {};
    const token = localStorage.getItem('token');
    const headers = {
      authorization: `${token}`,
      Accept: 'application/json',
    };
    const url = `${API_BASE_URL}user/getpermission`;
    ApiService.get(url, headers)
      .then(res => {
       
          res.data.data.map((val)=>{
          
          permissionarray[val.usertype] = JSON.parse(val.permission)[val.usertype];
        })
        setpermissionusers(permissionarray);
        
      })
      .catch(e => console.log("error", e));
  };
 
 const permissionassign  = (name,operation,event)=>{
  
  if (event.target.checked) {
    permissiondata[usertype][name][operation] = 1;
    permissionusers[usertype][name][operation] = 1;
    setpermissionusers(permissionusers)
  }
  else{
    permissiondata[usertype][name][operation] = 0;
    permissionusers[usertype][name][operation] = 0;
    setpermissionusers(permissionusers)
  }
  console.log(permissionusers[usertype],permissiondata);
  //setpermissionusers(permissionarray);
 
 }

 const savepermission = ()=>{
 
  const headers = {
    usertype: usertype,
    permission: JSON.stringify(permissiondata)
   };
  const url = `${API_BASE_URL}user/setpermission`;
  
  ApiService.post(url, headers)
  .then(res => {
      if (res.data.status == 200) {
         alert('success');
      } else {
        alert('Something Went Wrong');
       
      }
  })
 }
 const callfunction = async (event)=>{
  setuser(event.target.value);
  const typeuser = await event.target.value;
  if(permissionusers?.[event.target.value] != undefined)
  {
    permissionusertype = {};
    permissionusertype[event.target.value] = permissionusers?.[event.target.value];
    setpermissiondata(permissionusertype)
  }
  else{
    
    Callpermission(event.target.value);
    
  }

  
 }
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
  return (
    <>
      <Head>
        <title>
          Permission
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <SnackbarData />
         
          <Grid item xs={4}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">User Type</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="usertype"
                onChange={(e) => {callfunction(e)}}
                label="User Type"
                name="usertype"
                style={{ width: 250, OverflowX: "scroll" }}

              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="super_admin">
                  <em>Super Admin</em>
                </MenuItem>
                <MenuItem value="admin">
                  <em>Admin</em>
                </MenuItem>
                <MenuItem value="customer">
                  <em>Customer</em>
                </MenuItem>
              </Select>
             
            </FormControl>
          </Grid>
          <Grid item xs={4}>
          <Button
                  className="btn-upload"
                  color="primary"
                  variant="contained"
                  component="span"
                  onClick={savepermission}
              >
                Save
              </Button>
          </Grid>
          
          <Box sx={{ mt: 6 }}>
            <ServiceListResults pages={perpage} usertype={usertype} permissionassign={permissionassign} permissionusers={permissionusers} />
          </Box>
        </Container>
      </Box>
    </>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
