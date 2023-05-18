import { Checkbox, FormHelperText } from '@mui/material';
import PropTypes from 'prop-types';

const Checkboxs = (props) => {

    return (
        <>
            <FormHelperText>You can display an error</FormHelperText>
            <Checkbox
                onChange={props.onChange}
                required={props.required}
                color={props.color}
                icon={props.icon}
                onRateChangeCapture
                checked={props.checked}
                checkedIcon={props.checkedIcon}
                size={props.size}
                disabled={props.disabled}
                classes={props.classes}
            />
        </>
    );
};

Checkboxs.propTypes = {
    children: PropTypes.node,
    checkedIcon: PropTypes.node,
    icon: PropTypes.node,
    defaultChecked: PropTypes.bool,
    checked: PropTypes.bool,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    size: PropTypes.string,
    classes: PropTypes.object,
    color: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
};

Checkboxs.defaultProps = {
    disabled: false,
};

export default Buttons;
