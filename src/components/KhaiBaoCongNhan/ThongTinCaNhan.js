import React, { useState, useEffect } from 'react'
import Controls from '../Controls/Controls';
import Select from 'react-select';
import { CLabel, CCol, } from "@coreui/react";
import { listGioiTinh } from 'src/datamock/commonData';

export default function ThongTinCaNhan({ register, errors = null,onSdtChange, hidenFieldGioiTinh,placeholderSdt}) {
    const [gioiTinh, setgioiTinh] = useState('')
    return (
        <>
            <CCol xs="12" >
                <h5 style ={{fontWeight: 'bold'}}>Thông tin cá nhân</h5>
            </CCol>
            <CCol lg="6" xs="6">
                <Controls.Input
                    key="so_dien_thoai"
                    label="Số điện thoại"
                    name="so_dien_thoai"
                    type="number"
                    onChange={onSdtChange}
                    style={{ fontWeight: "bold", color: "black" }}
                    register={register}
                    error={errors.so_dien_thoai}
                    labelRequired = {'(*)'}
                    placeholder={placeholderSdt}
                />
            </CCol>
            <CCol lg="6" xs="6">
                <Controls.Input
                    key="cmnd"
                    label="CCCD/CMND/HC"
                    name="cmnd"
                    type="text"
                    style={{ fontWeight: "bold", color: "black" }}
                    register={register}
                    error={errors.cmnd}
                    labelRequired = {'(*)'}
                />
            </CCol>
            <CCol lg="6" xs="12">
                <Controls.Input
                    label="Họ tên"
                    name="ho_ten"
                    key="ho_ten"
                    type="text"
                    style={{ fontWeight: "bold", color: "black" }}
                    register={register}
                    error={errors.ho_ten}
                    labelRequired = {'(*)'}
                />
            </CCol>
            <CCol lg="6" xs="12">
                <Controls.Input
                    label="Ngày, tháng, năm sinh"
                    name="nam_sinh"
                    key="nam_sinh"
                    type="text"
                    style={{ fontWeight: "bold", color: "black" }}
                    error={errors.nam_sinh}
                    register={register}
                    labelRequired = {'(*)'}
                />
            </CCol>
            <CCol xs="6" style={hidenFieldGioiTinh}>
                <Controls.Select
                    label="Giới tính"
                    name="gioi_tinh"
                    key="gioi_tinh"
                    options={listGioiTinh()}
                    register={register}
                    error={errors.gioi_tinh}
                    labelRequired = {'(*)'}
                />
            </CCol>
            {/* <CCol xs="6">
                <Controls.Input
                    label="Số thẻ nhân viên"
                    name="so_the"
                    type="text"
                    register={register}
                    error={errors.so_the}
                // error={errors.so_the}
                />
            </CCol> */}
        </>
    )
}
