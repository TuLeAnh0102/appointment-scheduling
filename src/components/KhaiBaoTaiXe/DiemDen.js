import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { CCol, CLabel } from "@coreui/react";
import { Controller } from "react-hook-form";
import Controls from '../Controls/Controls';

const styleRequire = {
    color: "#FF0000",
    marginLeft: "2px",
}
export default function DiemDen({ errors = null, register, handelOnChange, control, labelRequired, options,diemdenmacdinh }) {
    const [diemhientai, setdiemhientai] = useState([]);

    useEffect(() => {
        if(diemdenmacdinh != '' &&diemdenmacdinh != null && options.length>0)
        {
            if(diemdenmacdinh.indexOf(',') >= 0)
            {
                var s = diemdenmacdinh.split(',');
                var x = s.map(item => {
                    var rs = options.find(x => x.value ===parseInt(item));
                    return rs;
                })
                setdiemhientai(x);

            }
            else{
                setdiemhientai(options.find(x => x.value ===parseInt(diemdenmacdinh)));
            }

        }

    }, [diemdenmacdinh,options])

    const noOptionsMessage = () => {
        return "Không có dữ liệu!"
    }
    const colourStyles = {
        placeholder: (defaultStyles) => {
            return {
                ...defaultStyles,
                color: '#000000',
                fontStyle: 'italic'
            }
        }
    }
    const handleOnSelectChange = (e, item) => {
        setdiemhientai(e)
        handelOnChange(e);
    }
    return (
        <>
            <CCol xs="12" >
                <h5 >Danh sách các điểm sẽ đến:
                    <CLabel style={styleRequire}> {labelRequired}</CLabel>
                    :
                </h5>
            </CCol>
            <CCol xs="12">
                <Controller
                    name="diem_den"
                    control={control}
                    defaultValue=''
                    render={() => (
                        <Select
                            closeMenuOnSelect={false}
                            placeholder="Chọn .... (1 hoặc nhiều)"
                            noOptionsMessage={noOptionsMessage}
                            name="diem_den"
                            value={diemhientai}
                            isMulti
                            options={options}
                            onChange={handleOnSelectChange.bind()}
                            className={`${errors['diem_den'] ? "is-invalid" : ""}`}
                            styles={colourStyles}
                        />
                    )}
                />
               {/*  {!diemhientai.value && (errors['diem_den']) && <div className="invalid-feedback">{errors['diem_den']?.message} </div>} */}
            </CCol>
            <CCol  xs="12">
              <Controls.Input
                  label="Hoặc tự nhập các điểm đến ngoài danh sách"
                  name="diem_den_ngoai_ds"
                  type="text"
                  style={{ fontWeight: "bold", color: "black" }}
                  register={register}
          />
          </CCol>
        </>
    )
}
