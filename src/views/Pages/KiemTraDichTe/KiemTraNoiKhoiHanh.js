import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from "moment";
import {
    CCol,
    CRow,
    CModal,
    CModalHeader,
    CModalBody,
    CButton,
    CModalFooter,
    CListGroup,
    CListGroupItem
} from '@coreui/react';
import { theoDoiCachLyService } from "../../../services"

const styleLabel = {
    fontWeight: "bold",
    fontSize: "18px",
    color: "black"
};
const styleTinhtrang = {
    fontWeight: "bold",
    fontSize: "20px",
    color: "red"
};
const styleAddress = {
    fontWeight: "bold",
    fontSize: "18px",
    color: "red"
}
const CColInfoStyled = styled(CCol)`
    font-family: Roboto;
    font-style: normal;
    font-size: 18px;
`;
const CModalHeadertyled = styled(CModalHeader)`
  text-align: center;
  color: black;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
`;
const CColStyled = styled(CCol)`
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
`;

export default function KiemTraKhoiHanh({ isOpen, info, isClose }) {

    const [thongtin, setThongtin] = useState(info);
    const [modal, setModal] = useState(isOpen);
    const [diembatdau, setDBD] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    async function laythongtintokhai(){
        await theoDoiCachLyService.getTheoDoiCachLy(info).then(res => {
            setThongtin(res.data);
        });
    };

    const laydanhsachphongtoatheodiemdi = () =>{
        theoDoiCachLyService.getDiemCovidDiemBatDau(thongtin.tinh_bat_dau, thongtin.huyen_bat_dau, thongtin.xa_bat_dau)
            .then(res => {
                setDBD(res.data);
            });
    }
    useEffect(() => {
            laythongtintokhai();
            console.log(thongtin);
    }, []);

    useEffect(() => {
        laydanhsachphongtoatheodiemdi();
    }, [thongtin])

    const toggle = () => {
        setModal(!modal);
    }

    console.log(diembatdau);

    return (
        <div>
            {/* {isLoading ? (
                <div>Loading ...</div>
            ) : ( */}
                    <CModal
                        show={isOpen}
                        onClose={isClose}
                        size="lg"
                        closeOnBackdrop={false}
                    >
                        <CModalHeadertyled>KIỂM TRA ĐIỂM KHỞI HÀNH</CModalHeadertyled>
                        <CModalBody>
                            <CCol>
                                <CRow>
                                    <CColInfoStyled >Họ tên:<span style={styleLabel}>{" " + thongtin.ho_ten + " "}</span></CColInfoStyled>
                                    <CColInfoStyled >Số điện thoại: <span style={styleLabel}>{thongtin.so_dien_thoai}</span></CColInfoStyled>
                                </CRow>
                                {/* <CRow>
                            <CColInfoStyled>
                                Địa chỉ: {thongtin.str_dia_chi_lien_he}
                            </CColInfoStyled>
                        </CRow> */}
                                <CRow>
                                    <CColInfoStyled>
                                        Đi từ: <span style={styleAddress}>{" " + thongtin.str_dia_chi_bat_dau + " "}</span>
                                    </CColInfoStyled>
                                </CRow>
                                <CRow>
                                    <CColInfoStyled>
                                        Đến: <span >{" " + thongtin.str_dia_chi_ket_thuc + " "}</span>
                                    </CColInfoStyled>
                                </CRow>
                                <CRow>
                                    <CColInfoStyled>
                                        Điểm xuất phát gần các vùng dịch:
                                        {diembatdau.length ?
                                            // <template>
                                            //     <CListGroup>
                                            //         {diembatdau.map(item => {
                                            //             return (
                                            //                 <CListGroupItem color="danger">
                                            //                     This is a secondary list group item
                                            //                     {item.dia_diem_phong_toa + ", " + item.ten_xa + ", " + item.ten_huyen + ", " + item.ten_tinh}
                                            //                 </CListGroupItem>
                                            //             )
                                            //         })}
                                            //     </CListGroup>
                                            // </template>
                                            <ul>
                                                {diembatdau.map(item => {
                                                    return(
                                                        <li>
                                                            <span style={styleAddress}>{item.dia_diem_phong_toa }</span><span>{", " + item.ten_xa + ", " + item.ten_huyen + ", " + item.ten_tinh}</span>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                            : <span style={styleAddress}>{" "}Không gần vùng dịch !!</span>}
                                    </CColInfoStyled>
                                </CRow>

                            </CCol>

                        </CModalBody>
                        <CModalFooter>
                            <CButton
                                color="secondary"
                                onClick={isClose}
                                name="btnCanCel"
                            >Đóng</CButton>
                        </CModalFooter>
                    </CModal>
                {/* )} */}
            
        </div>
    )
}
