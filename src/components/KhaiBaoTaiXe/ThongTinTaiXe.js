import React, { useState } from 'react'
import Controls from '../Controls/Controls';
import { CCol, } from "@coreui/react";
import { listGioiTinh } from 'src/datamock/commonData';
export default function ThongTinTaiXe({ register, errors = null,onSdtChange,gioitinhMd }) {
    const [gioiTinh, setgioiTinh] = useState(1)
    const OnGioiTinhChange = (e) => {
        setgioiTinh(e.target.value);
    }
    return (
        <>
            <CCol xs="12">
                <h5>Thông tin cá nhân</h5>
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
            <CCol lg="3" xs="6">
                <Controls.Input
                    label="Năm sinh"
                    name="nam_sinh"
                    key="nam_sinh"
                    type="text"
                    style={{ fontWeight: "bold", color: "black" }}
                    error={errors.nam_sinh}
                    register={register}
                    labelRequired = {'(*)'}
                />
            </CCol>
            <CCol lg="3" xs="6">
                <Controls.Select
                    label="Giới tính"
                    name="gioi_tinh"
                    key="gioi_tinh"
                    options={listGioiTinh()}
                    register={register}
                    error={errors.gioi_tinh}
                    labelRequired = {''}
                    idDefault={gioiTinh}
                    onChange={OnGioiTinhChange}
                />
            </CCol>
        </>
    )
}
