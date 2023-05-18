import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

function BasicAlerts(props) {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert variant={props.variant} role={props.role} severity={props.severity} onClose={props.onClose}>
                {props.children}
            </Alert>
        </Stack>
    );
}

BasicAlerts.prototype = {
    children: PropTypes.node,
    severity: PropTypes.arrayOf('error', 'info', 'success', 'warning'),
    messaage: PropTypes.string,
    classes: PropTypes.object,
    onClose: PropTypes.func,
    role: PropTypes.string,
    variant: PropTypes.string,
};

BasicAlerts.defaultProps = {
    role: 'alert'
};

export default BasicAlerts;