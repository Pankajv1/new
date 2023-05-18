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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export const ServiceModal = (props) => {
   
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [img, setimg] = useState('');
    const [showimagepreview, imgpreview] = useState('');
    const [imgpath, imgpathset] = useState('');
    const [formValues, setFormValues] = useState({
        title: {
            value: props?.service?.title || '',
            error: false,
            errorMessage: 'You must enter Title'
        },
        servicename: {
            value: props?.service?.servicename || '',
            error: false,
            errorMessage: 'You must enter an Name'
        },
        service_tooltip: {
            value: props?.service?.service_tooltip || '',
            error: false,
            errorMessage: 'You must enter your liked tech stacks'
        },
        service_description: {
            value: props?.service?.service_description || '',
            error: false,
            errorMessage: 'Please Enter service description'
        },
        serviceID: {
            value: props?.service?.serviceID || '',
            error: false,
            errorMessage: 'Please Enter service Name'
        }
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
            title: newFormValues.title.value,
            servicename: newFormValues.servicename.value,
            img_name: imgpath,
            service_tooltip: newFormValues.service_tooltip.value,
            service_description: newFormValues.service_description.value,
            serviceID: newFormValues.serviceID.value
        };

        // return false;
        if (props.service._id) {

            if (!headers.img_name) {
                headers.img_name = props.service.service_image;
            }
            const url = `${API_BASE_URL}subservice/update_subsidemenu/${props.service._id}`;
            ApiService.patch(url, headers)
                .then(res => {
                    if (res.data.status == 200) {
                        setMessage("Service added Successfully.");
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

            const url = `${API_BASE_URL}subservice/save_subservice`;
            ApiService.post(url, headers)
                .then(res => {
                    if (res.data.status == 200) {
                        setMessage("Sub Service added Successfully.");
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
                <Box sx={{ flexGrow: 1 }} style={{ 'margin': '15px' }}>
                    <Typography
                        variant="h6">
                        Please enter your data
                    </Typography>
                    <Grid container spacing={2} style={{ 'marginTop': '10px' }}>
                        <label htmlFor="btn-upload">
                            <input
                                id="btn-upload"
                                name="btn-upload"
                                style={{ display: 'none' }}
                                type="file"
                                onChange={upload}
                            />
                            <Button
                                className="btn-choose"
                                variant="outlined"
                                component="span" >
                                Choose Files
                            </Button>
                        </label>
                        <Button
                            className="btn-upload"
                            color="primary"
                            variant="contained"
                            component="span"
                            onClick={uploadimg}
                        >
                            Upload
                        </Button>
                    </Grid>
                    {showimagepreview && <img src={showimagepreview} width='100' height='100' />}
                </Box>
                {/* <form noValidate onSubmit={handleSubmit} > */}
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>

                        <Grid item xs={4}>
                            <TextField
                                placeholder="Enter your Service Name"
                                label="Sub Service Name"
                                name="servicename"
                                variant="outlined"
                                fullWidth
                                required
                                className=''
                                value={formValues.servicename.value}
                                onChange={handleChange}
                                error={formValues.servicename.error}
                                helperText={formValues.servicename.error && formValues.servicename.errorMessage}
                                id="margin-dense"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            {/* <Select
                            displayEmpty
                            value={formValues.serviceID.value}
                            onChange={handleChange}
                            name="serviceID"
                            // input={<OutlinedInput />}
                            renderValue={(selected) => {
                                if (selected.length === 0) {
                                    return <em>Select Service</em>;
                                }

                             
                            }}
                            MenuProps={MenuProps}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem disabled value="">
                                <em>Select Service</em>
                            </MenuItem>
                            {props.servicename.map((name) => (
                                <MenuItem
                                    key={name?._id}
                                    value={name?.servicename}
                                    //style={getStyles(name, personName, theme)}
                                >{console.log(name)}
                                    {name?.servicename}
                                </MenuItem>
                            ))}
                        </Select> */}
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-helper-label">Service</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={formValues.serviceID.value}
                                    label="Service"
                                    name="serviceID"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {props?.sevicename?.map((name) => (
                                        <MenuItem
                                            key={name?._id}
                                            value={name?._id}
                                        //style={getStyles(name, personName, theme)}
                                        >
                                            {name?.servicename}
                                        </MenuItem>
                                    ))}
                                </Select>

                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                placeholder="Enter Title"
                                label="Title"
                                name="title"
                                variant="outlined"
                                required
                                className=''
                                value={formValues.title.value}
                                onChange={handleChange}
                                error={formValues.title.error}
                                helperText={formValues.title.error && formValues.title.errorMessage}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                placeholder="Enter your Tool Tip"
                                label="Tooltip"
                                name="service_tooltip"
                                variant="outlined"
                                fullWidth
                                required

                                className=''
                                value={formValues.service_tooltip.value}
                                onChange={handleChange}
                                error={formValues.service_tooltip.error}
                                helperText={formValues.service_tooltip.error && formValues.service_tooltip.errorMessage}
                                id="margin-dense"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                placeholder="Enter your service description"
                                label="sub Service Description"
                                name="service_description"
                                variant="outlined"
                                fullWidth
                                required
                                type="text"
                                className=''
                                value={formValues.service_description.value}
                                onChange={handleChange}
                                error={formValues.service_description.error}
                                helperText={formValues.service_description.error && formValues.service_description.errorMessage}
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
