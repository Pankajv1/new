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
   console.log(props,'props');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [img, setimg] = useState('');
    const [showimagepreview, imgpreview] = useState('');
    const [imgpath, imgpathset] = useState('');
    const [formValues, setFormValues] = useState({
        name: {
            value: props?.service?.name || '',
            error: false,
            errorMessage: 'You must enter Name'
        },
        sidemenuID: {
            value: props?.service?.sidemenuID || '',
            error: false,
            errorMessage: 'Select Side Menu'
        },
        link: {
            value: props?.service?.link || '',
            error: false,
            errorMessage: 'You must enter an Link'
        },
        toltip: {
            value: props?.service?.toltip || '',
            error: false,
            errorMessage: 'You must enter ToolTip'
        },
        level: {
            value: props?.service?.level || '',
            error: false,
            errorMessage: 'Please Enter Level'
        },
        type: {
            value: props?.service?.type || '',
            error: false,
            errorMessage: 'Please Select Type'
        },
        icon: {
            value: props?.service?.icon || '',
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name == 'type') {
            if (value == 'icon') {
                document.getElementById('icon_div').style.display = '';
                document.getElementById('img_div').style.display = 'none';
            }
            else if (value == 'image') {
                document.getElementById('icon_div').style.display = 'none';
                document.getElementById('img_div').style.display = '';
            }
            else {
                document.getElementById('icon_div').style.display = 'none';
                document.getElementById('img_div').style.display = 'none';
            }
        }
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
            name: newFormValues.name.value,
            sidemenuID: newFormValues.sidemenuID.value,
            link: newFormValues.link.value,
            toltip: newFormValues.toltip.value,
            level: newFormValues.level.value,
            type: newFormValues.type.value,
            icon: newFormValues.icon.value
        };
        if (headers.type != 'icon') {
            headers.menuimage = imgpath;
        }
        if (props.service._id) {
            if (!headers.img_name) {
                headers.img_name = props.service.service_image;
            }
            const url = `${API_BASE_URL}subsidemenu/update_subsidemenu/${props.service._id}`;
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
            const url = `${API_BASE_URL}subsidemenu/save_subsidemenu`;
            console.log(url, headers);
            
            ApiService.post(url, headers)
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
                <Box sx={{ flexGrow: 1 }} style={{ 'margin': '15px', display: 'none' }} id="img_div">
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
                                placeholder="Enter your  Name"
                                label="Name"
                                name="name"
                                variant="outlined"
                                fullWidth
                                required

                                className=''
                                value={formValues.name.value}
                                onChange={handleChange}
                                error={formValues.name.error}
                                helperText={formValues.name.error && formValues.name.errorMessage}
                                id="margin-dense"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-helper-label">Service</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={formValues.sidemenuID.value}
                                    label="Service"
                                    name="sidemenuID"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {props?.sidemenu?.map((name) => (
                                        <MenuItem
                                            key={name?._id}
                                            value={name?._id}
                                        //style={getStyles(name, personName, theme)}
                                        >
                                            {name?.name}
                                        </MenuItem>
                                    ))}
                                </Select>

                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                placeholder="Enter your Link"
                                label="Link Name"
                                name="link"
                                variant="outlined"
                                fullWidth
                                required
                                className=''
                                value={formValues.link.value}
                                onChange={handleChange}
                                error={formValues.link.error}
                                helperText={formValues.link.error && formValues.link.errorMessage}
                                id="margin-dense"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                placeholder="Enter Tooltip"
                                label="ToolTip"
                                name="toltip"
                                variant="outlined"
                                required
                                className=''
                                value={formValues.toltip.value}
                                onChange={handleChange}
                                error={formValues.toltip.error}
                                helperText={formValues.toltip.error && formValues.toltip.errorMessage}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                placeholder="Enter Level"
                                label="Level"
                                name="level"
                                variant="outlined"
                                fullWidth
                                required

                                className=''
                                value={formValues.level.value}
                                onChange={handleChange}
                                error={formValues.level.error}
                                helperText={formValues.level.error && formValues.level.errorMessage}
                                id="margin-dense"
                                margin="dense"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={formValues.type.value}
                                    label="Type"
                                    name="type"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>

                                    <MenuItem

                                        value='icon'

                                    >
                                        <em>Icon</em>
                                    </MenuItem>
                                    <MenuItem

                                        value='image'

                                    >
                                        <em>Image</em>
                                    </MenuItem>

                                </Select>

                            </FormControl>

                        </Grid>
                        <Grid item xs={4} style={{ display: 'none' }} id="icon_div">
                            <TextField
                                placeholder="Enter Icon Name"
                                label="Icon"
                                name="icon"
                                variant="outlined"
                                required
                                className=''
                                value={formValues.icon.value}
                                onChange={handleChange}

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
