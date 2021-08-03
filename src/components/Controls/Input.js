import React from 'react';
import {
    CFormGroup,
    CLabel,
} from '@coreui/react';
const styleRequire =  {
    color: "#FF0000",
    marginLeft: "2px",
}
export default function Select(props) {

    const { name, label, register, error=null, type, labelRequired,placeholder  ,...other} = props;

    return (
        <CFormGroup className="form-group">
            <CLabel htmlFor={name}>{label} </CLabel>
            <CLabel style ={ styleRequire}> {labelRequired}</CLabel>
            <input
                name={name}
                type={type}
                label={label}
                ref={register}
                className={`form-control ${error? 'is-invalid' : ''}`}
                placeholder={placeholder}
                {...other}
                id="inputID"
            />

            <div className="invalid-feedback">{error?.message}</div>
        </CFormGroup>
    )
}
