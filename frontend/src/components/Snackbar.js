import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars(props) {
    const vertical = 'top';
    const horizontal = 'right';

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={props.open} anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={props.onClose}>
                <Alert onClose={props.onClose} severity={props.type} sx={{ width: '100%' }}>
                    {props.message}
                </Alert>
            </Snackbar>
        </Stack>
    );
};