import React, { useState, useEffect } from 'react'
import Controls from '../Controls/Controls';
import Select from 'react-select';
import { CLabel, CCol, } from "@coreui/react";
import { listGioiTinh } from 'src/datamock/commonData';

export default function ThongTinNguoiThan({ register, errors = null, onSdtChange }) {
    const [gioiTinh, setgioiTinh] = useState('')
    return (
        <>
            <CCol xs="12" >
                <h5 style={{ fontWeight: 'bold' }}>Thông tin người thân (đại diện)</h5>
            </CCol>
            <CCol lg="6" xs="12">
                <Controls.Input
                    label="Họ tên người thân"
                    name="nguoi_than_ho_ten"
                    type="text"
                    style={{ fontWeight: "bold", color: "black" }}
                    register={register}
                    error={errors.nguoi_than_ho_ten}
                    labelRequired={'(*)'}
                />
            </CCol>
            <CCol lg="3" xs="5">
                <Controls.Input
                    label="Năm sinh"
                    name="nguoi_than_nam_sinh"
                    type="text"
                    style={{ fontWeight: "bold", color: "black" }}
                    error={errors.nguoi_than_nam_sinh}
                    register={register}
                    labelRequired={'(*)'}
                />
            </CCol>
            <CCol lg="3" xs="7">
                <Controls.Input
                    label="Mối quan hệ(bố, mẹ...)"
                    name="nguoi_than_moi_qh"
                    type="text"
                    style={{ fontWeight: "bold", color: "black" }}
                    error={errors.nguoi_than_moi_qh}
                    register={register}
                    labelRequired={'(*)'}
                />
            </CCol>
            <CCol lg="6" xs="6">
                <Controls.Input
                    label="Số CMND/CCCD"
                    name="nguoi_than_cmnd"
                    type="number"
                    // onChange={onSdtChange}
                    style={{ fontWeight: "bold", color: "black" }}
                    register={register}
                    error={errors.nguoi_than_cmnd}
                    labelRequired={'(*)'}
                />
            </CCol>
            <CCol lg="6" xs="6">
                <Controls.Input
                    label="Số điện thoại người thân"
                    name="nguoi_than_so_dien_thoai"
                    type="number"
                    // onChange={onSdtChange}
                    style={{ fontWeight: "bold", color: "black" }}
                    register={register}
                    error={errors.nguoi_than_so_dien_thoai}
                    labelRequired={'(*)'}
                />
            </CCol>
        </>
    )
}
