import React, { useEffect , useState} from 'react';
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
} from '@coreui/react';
const styleLabel ={
    fontWeight: "bold",
    fontSize: "20px",
    color: "black"
  };
  const styleTinhtrang ={
    fontWeight: "bold",
    fontSize: "20px",
    color: "red"
  };

const CColInfoStyled = styled(CCol)`
    font-family: Roboto;
    font-style: normal;
    font-size: 18px;
`;
const CModalHeadertyled = styled(CModalHeader)`
  text-align: center;
  color: red;
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

export default function LichSuDichTe ({isOpen, info}) {

  const [infoCachly, setinfoCachly] = useState(info);
  const [modal, setModal] = useState(isOpen);
  useEffect(() => {
    setModal(isOpen)
  }, [isOpen]);

  useEffect(() => {
    setinfoCachly(info);
  }, [info]);

   const toggle = ()=>{
     setModal(!modal);
   }

    return (
      <div>
        <CModal
           show={modal}
           onClose={toggle}
           size = "lg"
           closeOnBackdrop={false}
         >
           <CModalHeadertyled >!!!Cảnh báo lịch sử dịch tễ</CModalHeadertyled>
           <CModalBody>
            <CCol>
               <CRow>
                <CColStyled >Họ tên:<span style={styleLabel}>{infoCachly.ho_ten}</span></CColStyled>
                <CColStyled >Số điện thoại: <span style={styleLabel}>{infoCachly.so_dien_thoai}</span></CColStyled>
            </CRow>
            <CRow>
              <CColInfoStyled>
                Địa chỉ: {infoCachly.dia_chi}
              </CColInfoStyled>
            </CRow>
              <CRow>
              <CColInfoStyled>
                Đi từ: {infoCachly.dia_chi_di}
              </CColInfoStyled>
            </CRow>
            <CRow>
              <CColInfoStyled>
                Đến: {infoCachly.dia_chi_den}
              </CColInfoStyled>
            </CRow>
            <CRow>
                <CColInfoStyled>
                Đã khai báo y tế tại chốt: <span style={styleLabel}>{infoCachly.don_vi}</span>
                </CColInfoStyled>
            </CRow>
            <CRow>
                <CColInfoStyled>
                Ngày chỉ định dịch tễ: <span style={styleLabel}>{moment(infoCachly.ngay_kiemtra_dichte).format("DD-MM-YYYY HH:mm:ss")}</span>
                </CColInfoStyled>
            </CRow>
            <CRow>
                <CColInfoStyled>
                  Đã chỉ định: <span style={styleTinhtrang}>{infoCachly.huong_xu_ly}</span>
                </CColInfoStyled>
                
            </CRow>
               </CCol>
           
           </CModalBody>
           <CModalFooter>
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
