import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Modal, Button, Typography, DialogActions, Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { ServiceListResults } from '../components/service/service-list-results';
import { ServiceListToolbar } from '../components/service/service-list-toolbar';
import { ServiceModal } from '../components/service/modal';
import { DashboardLayout } from '../components/dashboard-layout';
import SnackbarData from '../components/Snackbar';
import ApiService from '../service/Api.service';
import { API_BASE_URL } from '../utils/Constant';
import { customers } from '../__mocks__/customers';

const Page = () => {

  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [service, setService] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const token = localStorage.getItem('token');
    const headers = {
      authorization: `${token}`,
      Accept: 'application/json',
    };
    const url = `${API_BASE_URL}service/list_service`;
    ApiService.get(url, headers)
      .then(res => {
        const { data } = res.data;
        setData(data);
      })
      .catch(e => console.log("error", e));
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const closeModal = () => {
    setOpen(false);
    fetchData();
    setMessage("Service Added Successfully");
    setType("success");
    setOpenSnackbar(true);
  };

  const OnEditData = (service) => {
    console.log("dsfvffdf", service);
    setService(service);
    setOpen(true);
  };
  const onDelete = (serviceId) => {
    const token = localStorage.getItem('token');
    const headers = {
      authorization: `${token}`,
      Accept: 'application/json',
    };
    const url = `${API_BASE_URL}service/delete_service/${serviceId}`;
    axios.delete(url, {
      headers: headers,
    }).then(res => {
      console.log("fdghhjghffghj", res);
      if (res.data.status == 200) {
        setMessage("Service Deleted Successfully");
        setType("success");
        setOpenSnackbar(true);
        fetchData();
        
      } else {
        setMessage("Service not Deleted");
        setType("error");
        setOpenSnackbar(true);
      }
    })
      .catch(e => {
        setMessage("Service not Deleted");
        setType("success");
        setOpenSnackbar(true);
      });
    // ApiService.delete(url, headers)
    //   .then(res => {
    //     console.log("fdghhjghffghj", res);
    //   })
    //   .catch(e => console.log("error", e));
  };

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
          Service
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
          <SnackbarData message={message} type={type} open={openSnackbar} onClose={(event, reason) => handleCloseSnackbar(event, reason)} />
          <Dialog
            fullWidth
            maxWidth={'lg'}
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
                You can set my maximum width and whether to adapt or not.
              </DialogContentText>
              <Box
                noValidate
                component="form"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  m: 'auto',
                  width: 'fit-content',
                }}
              >
                <ServiceModal service={service} onClose={() => closeModal()} />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
          <ServiceListToolbar onAdd={() => handleOpen()} />
          <Box sx={{ mt: 3 }}>
            <ServiceListResults customers={data} onEdit={(data) => OnEditData(data)} onDelete={(serviceID) => onDelete(serviceID)} />
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
