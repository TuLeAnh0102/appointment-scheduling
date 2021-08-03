import React, {useState, useEffect} from 'react'
import { CCol, } from "@coreui/react";
import Controls from '../Controls/Controls';
const listLoaiPhuongTien = [
    { id: "Xe_May", title: "Xe máy" },
    { id: "Xe_oto", title: "Xe otô" },
    { id: "Xe_Tai", title: "Xe tải" },
    { id: "Xe_Khach", title: "Xe khách" },
    { id: "Xe_Dap", title: "Xe đạp" },
  ];
export default function ThongTinXe({ register, errors = null, loaixemd }) {
    const [loaixe, setloaixe] = useState('Xe_Tai')
    const onLoaiPhuongTineChange = (e) => {
        setloaixe(e.target.value);
    }
    useEffect(() => {
        if(loaixemd!='' && loaixemd != null)
        {
            setloaixe(loaixemd);
        }
    }, [loaixemd])
    return (
        <>
            <CCol xs="12">
                <h5>Thông tin Xe</h5>
            </CCol>
            <CCol lg="6" xs="12">
                <Controls.Select
                    label="Loại phương tiện"
                    name="loai_phuong_tien"
                    onChange={onLoaiPhuongTineChange}
                    options={listLoaiPhuongTien}
                    error={errors.loai_phuong_tien}
                    register={register}
                    labelRequired = {'(*)'}
                    idDefault={loaixe}
                />
            </CCol>
            <CCol lg="3" xs="6">
                <Controls.Input
                    label="Biển số"
                    name="bien_so"
                    type="text"
                    style={{ fontWeight: "bold", color: "black" }}
                    register={register}
                    error={errors.bien_so}
                    labelRequired = {'(*)'}
                />
            </CCol>
            <CCol lg="3" xs="6">
                <Controls.Input
                    label="Số người"
                    name="so_nguoi"
                    type="number"
                    style={{ fontWeight: "bold", color: "black" }}
                    register={register}
                    error={errors.so_nguoi}
                    labelRequired={'*'}
                />
            </CCol>
        </>
    )
}
