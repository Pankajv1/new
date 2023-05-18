import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

function BasicSnackbar(props) {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Snackbar open={props.open} classes={props.classes} autoHideDuration={props.autoHideDuration} onClose={props.onClose}>
                {props.children}
            </Snackbar>
        </Stack>
    );
}

BasicSnackbar.prototype = {
    children: PropTypes.node,
    classes: PropTypes.object,
    onClose: PropTypes.func,
    open: PropTypes.string,
    autoHideDuration: PropTypes.string,
};

export default BasicSnackbar;