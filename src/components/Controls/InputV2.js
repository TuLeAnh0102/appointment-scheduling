import React from 'react';
import {
    CFormGroup,
    CLabel,
} from '@coreui/react';

export default function InputV2(props) {

    const style = {marginLeft: '10px'}
    const { name, label, register, error=null, type, ...other } = props;

    return (
        <div>
            <CLabel htmlFor={name}>{label}</CLabel>
            <input
                name={name}
                type={type}
                style={style}
                label={label}
                ref={register}
                {...other}
            />

            <div className="invalid-feedback">{error?.message}</div>
        </div>
    )
}
