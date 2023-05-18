import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types'

function Loader(props) {
    return (
        <CircularProgress
            variant={props.variant}
            sx={{
                color: (theme) =>
                    theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
            }}
            size={props.size}
            thickness={props.thickness}
            {...props}
            value={props.value}
        />
    );
}

Loader.prototype = {
    children: PropTypes.node,
    classes: PropTypes.object,
    onClose: PropTypes.func,
    thickness: PropTypes.number,
    size: PropTypes.number,
    value: PropTypes.number,
    variant: PropTypes.string,
};

export default Loader;