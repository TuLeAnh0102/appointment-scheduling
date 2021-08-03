import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from "moment";
import SelectTrNoLabel from '../Controls/SelectTrNoLabel';
import Select from 'react-select';
import { cauhinhhethongService } from 'src/services';
import {
    CCol,
    CRow,
    CModal,
    CModalHeader,
    CModalBody,
    CButton,
    CModalFooter,
    CInput
} from '@coreui/react';
const styleLabel = {
    fontWeight: "bold",
    fontSize: "20px",
    color: "black"
};
const styleTinhtrang = {
    fontWeight: "bold",
    fontSize: "20px",
    color: "red"
};

const CModalBodyStyled = styled(CModalBody)`
    font-family: Roboto;
    font-style: normal;

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
align-items: right;
text-align: right;
`;

export default function ModalInsert({ isOpen, dataOptions, valueDefault }) {
    const [modal, setModal] = useState(isOpen);
    useEffect(() => {
        setModal(isOpen)
    }, [isOpen]);

    const toggle = () => {
        setModal(!modal);
    }
    const handelLoaiTKChange = () =>
    {

    }
    const upDateNhomQuyen = (data) => {
  
        cauhinhhethongService.modifyNhomQuyen(data).then((res) => {
            //setisLoadding(0);
            if (res["id"] === 1) {
              //
              alert("Cập nhật thành công!");
            }
          });
    }
    const handelUpdateClick = () => {
        console.log("???")
       let data = {
           id_loai_tai_khoan: 1,
           ten_nhom_quyen: "Nhân viên y tế",
           id_nhom_quyen:  0
        }
        upDateNhomQuyen(data);
    }
    return (
        <div>
            <CModal
                show={modal}
                onClose={toggle}
                size="lg"
                closeOnBackdrop={false}
            >
                <CModalHeadertyled >Thêm Mới Nhóm Quyền</CModalHeadertyled>
                <CModalBodyStyled>
                    <CRow>
                        <CColStyled xs="4">
                            <span>
                                Tên nhóm(
                            </span>
                            <span style={{ color: 'red', fontWeight: 'bold' }}>
                                *
                            </span>):
                        </CColStyled>
                        <CCol xs="8">
                            <CInput style={{ color: 'black', fontWeight: 'bold' }}></CInput>
                        </CCol>
                    </CRow>
                    <CRow style={{ marginTop: '10px' }}>
                        <CColStyled xs="4">
                            Loại Tài khoản
                        </CColStyled>
                        <CCol xs="8">
                            <SelectTrNoLabel
                                nameselect="cong_ty"
                                dataOptions={dataOptions}
                                setValueDefault={dataOptions[0]}
                                handelOnChange={handelLoaiTKChange}
                                placeholder="Chọn . . ."
                            />
                        </CCol>
                    </CRow>
                </CModalBodyStyled>
                <CModalFooter>
                    <CButton
                        color="success"
                        onClick={handelUpdateClick}
                        name="btnUpdate"
                    >Cập nhật</CButton>
                    <CButton
                        color="secondary"
                        onClick={toggle}
                        name="btnCanCel"
                    >Đóng</CButton>
                </CModalFooter>
            </CModal>
        </div>
    )
}
