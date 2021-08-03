import React from "react";
import PropTypes from "prop-types";
import {
    CFormGroup,
    CLabel,
} from '@coreui/react';

const RadioGroup = ({ name, label, register, onChange, error=null, options, valueDefault, ...other }) => {
  return (
    <CFormGroup>
      <CLabel>{label}</CLabel>
      <div>
        {options.map(({ label: optionLabel, value }, index) => {
          return (
            <div key={index}>
              <input
                id={index}
                name={name}
                type="radio"
                value={value}
                ref={register}
                {...other}
              />
              <label htmlFor={index}>
                <span>{optionLabel}</span>
              </label>
            </div>
          );
        })}
        <div className="invalid-feedback">{error?.message}</div>
      </div>
    </CFormGroup>
  );
};

RadioGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  )
};
export default RadioGroup;
