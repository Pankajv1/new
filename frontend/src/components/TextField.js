import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

const TextFields = (props) => {
    if (props.select) {
        <TextField
            fullWidth={props.fullWidth}
            label={props.label}
            name={props.name}
            onChange={props.onChange}
            required={props.required}
            value={props.value}
            select={props.select}
            SelectProps={props.SelectProps}
            variant={props.variant}
        >
            {props.children}
        </TextField>
    }

    return (
        <TextField
            fullWidth={props.fullWidth}
            label={props.label}
            name={props.name}
            onChange={props.onChange}
            required={props.required}
            value={props.value}
            variant={props.variant}
        />
    );
};

TextFields.propTypes = {
    children: PropTypes.node,
    fullWidth: PropTypes.bool,
    required: PropTypes.bool,
    autoFocus: PropTypes.bool,
    disabled: PropTypes.bool,
    select: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    classes: PropTypes.object,
    SelectProps: PropTypes.object,
    color: PropTypes.string,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    variant: PropTypes.string,
    helperText: PropTypes.string,
    onChange: PropTypes.func,
    autoComplete: PropTypes.string,
};

TextFields.defaultProps = {
    fullWidth: true,
};

export default TextField;
