import React  from "react";
import { CFormGroup, CLabel } from "@coreui/react";
const styleRequire =  {
  color: "#FF0000",
  marginLeft: "2px",
}
export default function Select(props) {
  
  const {
    name,
    label,
    register,
    onChange,
    error = null,
    options,
    idDefault,
    labelRequired,
  } = props;
  
  return (
    <CFormGroup className="form-group">
      <CLabel htmlFor={name}>{label}</CLabel>
      <CLabel style ={ styleRequire}> {labelRequired}</CLabel>
      <select
        name={name}
        label={label}
        ref={register}
        value={idDefault}
        onChange={onChange} 
        className={`form-control ${error ? "is-invalid" : ""}`}
      >
        <option value=""></option>
        {options.map((item) => (
          <option key={item.id} value={item.id}>
            {item.title}
          </option>
        ))}
      </select>
      <div className="invalid-feedback">{error?.message}</div>
    </CFormGroup>
  );
}
