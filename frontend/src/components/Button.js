import { Button } from '@mui/material';
import PropTypes from 'prop-types';

const Buttons = (props) => {
    if (props.children) {
        return (<Button
            fullWidth={props.fullWidth}
            onClick={props.onClick}
            required={props.required}
            variant={props.variant}
            startIcon={props.startIcon}
            endIcon={props.endIcon}
            color={props.color}
            disabled={props.disabled}
            classes={props.classes}
        >
            {props.children}
        </Button>);
    }

    return (
        <Button
            fullWidth={props.fullWidth}
            onClick={props.onClick}
            required={props.required}
            variant={props.variant}
            startIcon={props.startIcon}
            endIcon={props.endIcon}
            color={props.color}
            disabled={props.disabled}
            classes={props.classes}
        />
    );
};

Buttons.propTypes = {
    children: PropTypes.node,
    startIcon: PropTypes.node,
    endIcon: PropTypes.node,
    fullWidth: PropTypes.bool,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    href: PropTypes.string,
    classes: PropTypes.object,
    color: PropTypes.string,
    variant: PropTypes.string,
    onClick: PropTypes.func,
};

Buttons.defaultProps = {
    fullWidth: true,
};

export default Buttons;
