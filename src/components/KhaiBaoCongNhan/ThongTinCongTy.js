import React, { useEffect, useState } from 'react'
import { CLabel, CCol, } from "@coreui/react";
import Controls from '../Controls/Controls';
import Select from 'react-select';
import { Controller } from "react-hook-form";
import { congNhanService } from 'src/services';
export default function ThongTinCongTy({ errors = null, register, control , setValue, thongtincty}) {
    const [dmKCN, setdmKCN] = useState([]);
    const [dmCty, setdmCty] = useState([]);
    const [tenCongTy, settenCongTy] = useState('');
    const [tenKCN, settenKCN] = useState('')
    useEffect(() => {
        congNhanService.getDSkhuCongNghiep().then((res) => {
            if (res.success && res.data != null) {
                setdmKCN(res.data)
            }
        });
    }, [])

    useEffect(() => {
        if (tenKCN !== '') {
            congNhanService.getDSCongTytheoKCN(tenKCN.ma_khu_cong_nghiep).then((res) => {
                if (res.success && res.data != null) {
                    setdmCty(res.data);
                }
            });
        }

    }, [tenKCN])
    useEffect(() => {
        if(thongtincty !== '')
        {
            if (thongtincty.ma_khu_cong_nghiep !== '' && thongtincty.ma_khu_cong_nghiep !== undefined && dmKCN.length >0)
            {
                settenKCN(dmKCN.find(item => item.ma_khu_cong_nghiep===thongtincty.ma_khu_cong_nghiep))
            }
        }
    }, [thongtincty,dmKCN])
    useEffect(() => {
        if(thongtincty !== '')
        {
            if (thongtincty.ma_cong_ty !== '' && thongtincty.ma_cong_ty !== undefined && dmCty.length >0)
            {
                settenCongTy(dmCty.find(item => item.ma_cong_ty===thongtincty.ma_cong_ty))
            }
        }
    }, [thongtincty,dmCty])
    const onSelectChange = (value, event) => {
        if (event.name === "ma_khu_cong_nghiep") {
            settenKCN(value);
            settenCongTy('');
            setValue('ma_khu_cong_nghiep', value.ma_khu_cong_nghiep);
            setValue('ma_cong_ty', '');
        }
        else {
            settenCongTy(value);
            setValue('ma_cong_ty', value.ma_cong_ty);
        }
    }
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
    return (
        <>
            <CCol lg="6" xs="12">
                <CLabel htmlFor='ma_khu_cong_nghiep'>Cty thuộc Khu Công Nghiệp (*):</CLabel>
                <Controller
                    name='ma_khu_cong_nghiep'
                    control={control}
                    defaultValue=""
                    render={() => (
                        <Select
                            placeholder="Chọn . . . ."
                            noOptionsMessage={noOptionsMessage}
                            name='ma_khu_cong_nghiep'
                            options={dmKCN}
                            value={tenKCN}
                            getOptionLabel={(option) => option.ten_khu_cong_nghiep}
                            getOptionValue={(option) => option.ma_khu_cong_nghiep}
                            onChange={onSelectChange}
                            className={`${errors['ma_khu_cong_nghiep'] ? "is-invalid" : ""}`}
                            styles={colourStyles}
                        />
                    )}
                />
                {!tenKCN && (errors['ma_khu_cong_nghiep']) && <div className="invalid-feedback">{errors['ma_khu_cong_nghiep']?.message} </div>}
            </CCol>
            <CCol lg="6" xs="12">
                <CLabel htmlFor='ma_cong_ty'>Tên Công ty (*): </CLabel>
                <Controller
                    name='ma_cong_ty'
                    control={control}
                    defaultValue=""
                    render={() => (
                        <Select
                            placeholder="Chọn . . . ."
                            noOptionsMessage={noOptionsMessage}
                            name='ma_cong_ty'
                            options={dmCty}
                            value={tenCongTy}
                            getOptionLabel={(option) => option.ten_cong_ty}
                            getOptionValue={(option) => option.ma_cong_ty}
                            onChange={onSelectChange}
                            className={`${errors['ma_cong_ty'] ? "is-invalid" : ""}`}
                            styles={colourStyles}
                        />
                    )}
                />
                {!tenCongTy && (errors['ma_cong_ty']) && <div className="invalid-feedback">{errors['ma_cong_ty']?.message} </div>}
            </CCol>
            <CCol lg="6" xs="12">
                <Controls.Input
                    label="Tên bộ phận"
                    name="ten_bo_phan"
                    type="text"
                    style={{ fontWeight: "bold", color: "black" }}
                    register={register}
                //error={errors.ho_ten}
                />
            </CCol>
        </>
    )
}
