import React from 'react';
import {
    CLabel,
} from '@coreui/react';

export default function SelectV2(props) {

    const { name, label, register, onChange, error=null, options } = props;

    return (
        <div>
            <CLabel htmlFor={name}>{label}</CLabel>
            <select
                name={name}
                label={label}
                ref={register}
                onChange={onChange}
                >
                <option value=""></option>
                {
                    options.map(
                        item => (<option  key={item.id} value={item.id}>{item.title}</option >)
                    )
                }
            </select>
            <div className="invalid-feedback">{error?.message}</div>
        </div>
    )
}
