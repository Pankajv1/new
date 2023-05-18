import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
    Avatar,
    Box,
    Card,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { getInitials } from '../../utils/get-initials';
import { API_BASE_URL } from '../../utils/Constant';
import ApiService from '../../service/Api.service';
import SnackbarData from '../Snackbar';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';  
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';  

export const ServiceModal = (props) => {
    console.log(props,props.service._id);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [img, setimg] = useState('');
    const [showimagepreview, imgpreview] = useState('');
    const [imgpath, imgpathset] = useState('');
    const [formValues, setFormValues] = useState({
        first_name: {
            value: props?.service?.first_name || '',
            error: false,
            errorMessage: 'You must enter  First Name'
        },
        last_name: {
            value: props?.service?.last_name || '',
            error: false,
            errorMessage: 'You must enter an Last Name'
        },
        phoneno: {
            value: props?.service?.phoneno || '',
            error: false,
            errorMessage: 'You must enter ToolTip'
        },
        username: {
            value: props?.service?.username || '',
            error: false,
            errorMessage: 'Please Enter Level'
        },
        
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
       
        
        setFormValues({
            ...formValues,
            [name]: {
                ...formValues[name],
                value
            }
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
       
        const formFields = Object.keys(formValues);
        let newFormValues = { ...formValues }
        for (let index = 0; index < formFields.length; index++) {
            const currentField = formFields[index];
            const currentValue = formValues[currentField].value;
            if (currentValue === '') {
                newFormValues = {
                    ...newFormValues,
                    [currentField]: {
                        ...newFormValues[currentField],
                        error: true
                    }
                }
            }
        }
        setFormValues(newFormValues);
        const headers = {
            first_name: newFormValues.first_name.value,
            last_name: newFormValues.last_name.value,
            email_phone: newFormValues.phoneno.value,
            username: newFormValues.username.value,
            password:'12345'
           
        };
        
        if (props.service._id) {
           
            const url = `${API_BASE_URL}user/registation/${props.service._id}`;
            ApiService.patch(url)
            .then(res => {
                if (res.data.status == 200) {
                    setMessage("User added Successfully.");
                    setType("success");
                    setOpenSnackbar(true);
                    props.onClose(false);
                } else {
                   
                    setMessage(res.data.data);
                    setType("error");
                    setOpenSnackbar(true);
                }
            })
        } else {
            const url = `${API_BASE_URL}user/registation`;
           
            ApiService.post(url, headers)
            .then(res => {
                if (res.data.status == 200) {
                    setMessage("User added Successfully.");
                    setType("success");
                    setOpenSnackbar(true);
                    props.onClose(false);
                } else {
                   
                    setMessage(res.data.data);
                    setType("error");
                    setOpenSnackbar(true);
                }
            })
       }
       
    };

    const upload = (e) => {
        setimg(e.target.files[0]);
        imgpreview(URL.createObjectURL(e.target.files[0]));
    };
    const uploadimg = (e) => {
        e.preventDefault();
        if (img) {
            let headers = new FormData();
            headers.append('file', img);
            const url = `${API_BASE_URL}upload/uploadfile`;
            ApiService.post(url, headers)
                .then(res => {
                    console.log(res);
                    if (res.data.status == 200) {
                        imgpathset(res.data.data);
                        setMessage("File uploaded Successfully.");
                        setType("success");
                        setOpenSnackbar(true);
                    }
                    else {
                        setMessage("Something Went Wrong");
                        setType("error");
                        setOpenSnackbar(true);
                        // alert('Something Went Wrong');
                    }
                })
        }
        else {
            alert('Please Select Images');
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <>
            <Container className='' >
            
                <SnackbarData message={message} type={type} open={openSnackbar} onClose={(event, reason) => handleCloseSnackbar(event, reason)} />
               
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                     <Grid item xs={4}>
                        <TextField
                            placeholder="Enter your First Name"
                            label="First Name"
                            name="first_name"
                            variant="outlined"
                            fullWidth
                            required
                            className=''
                            value={formValues.first_name.value}
                            onChange={handleChange}
                            error={formValues.first_name.error}
                            helperText={formValues.first_name.error && formValues.first_name.errorMessage}
                            id="margin-dense"
                            margin="dense"
                        />
                      </Grid>
                        <Grid item xs={4}>
                        <TextField
                            placeholder="Enter your Last Name"
                            label="Last Name"
                            name="last_name"
                            variant="outlined"
                            fullWidth
                            required
                            className=''
                            value={formValues.last_name.value}
                            onChange={handleChange}
                            error={formValues.last_name.error}
                            helperText={formValues.last_name.error && formValues.last_name.errorMessage}
                            id="margin-dense"
                            margin="dense"
                        />
                        </Grid>
                        <Grid item xs={4}>
                        <TextField
                            placeholder="Enter your Phone No / Email ID"
                            label="Phone / Email"
                            name="phoneno"
                            variant="outlined"
                            fullWidth
                            required
                            className=''
                            value={formValues.phoneno.value}
                            onChange={handleChange}
                            error={formValues.phoneno.error}
                            helperText={formValues.phoneno.error && formValues.phoneno.errorMessage}
                            id="margin-dense"
                            margin="dense"
                        />
                        </Grid>
                        <Grid item xs={4}>
                        <TextField
                            placeholder="Enter your Username"
                            label="User Name"
                            name="username"
                            variant="outlined"
                            fullWidth
                            required
                            className=''
                            value={formValues.username.value}
                            onChange={handleChange}
                            error={formValues.username.error}
                            helperText={formValues.username.error && formValues.username.errorMessage}
                            id="margin-dense"
                            margin="dense"
                        />
                        </Grid>
                        
                       
                       
                    </Grid>
                </Box>
                <Button
                    type="submit"
                    variant="outlined"
                    color="secondary"
                    onClick={(e) => handleSubmit(e)}
                >
                    {props?.service?._id ? 'Update' : 'Submit'}
                </Button>
                {/* </form> */}

            </Container>
        </>
    )
}
