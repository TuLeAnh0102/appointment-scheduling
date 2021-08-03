import React, { useEffect, useState } from "react";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CButton,
  CRow,
  CLabel,
  CInput,
  CFormGroup,
} from "@coreui/react";

import { useDispatch, useSelector } from 'react-redux';
import CIcon from "@coreui/icons-react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
// import ThongTinLayMauPartial from "./ThongTinLayMauPartial";
import { matchSorter } from "match-sorter";
import { danhSachToKhaiService } from "../../../services";
import { history } from  "../../../helpers";
import moment from "moment";
import ToKhaiYTe from "../ToKhaiYTe/ToKhaiYTe";
import config from "../../../configs/config";

function XacNhanThongTinToKhaiPage(props) {
  const common = useSelector(state => state.common);
  const id_to_khai = props.match.params.id;
  const [openPopupPartial, setOpenPopupPartial] = useState(false);
  let user = JSON.parse(localStorage.getItem("user"));

  function handleEditRowClick(id) {
    // setKeyForEdit(id);
    setOpenPopupPartial(true);
  }

  function handleBtnXacNhanClick() {
      danhSachToKhaiService.xacNhanToKhaiYTe(id_to_khai, user.ma_chot)
      .then((res) => {
          if (res.success) {
              alert("Xác minh tờ khai y tế thành công");
              history.push('/danh-sach-to-khai-y-te');
          }else{
            alert("Không thể xác nhận tờ khai y tế")
          }
        });
  }

  function handleBtnLayMauClick() {
    setOpenPopupPartial(true);
  }


  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            XÁC NHẬN THÔNG TIN TỜ KHAI Y TẾ
            <div className="card-header-actions">
              <CButton
                color="success"
                onClick={() => handleBtnXacNhanClick(0)}
                className="mr-1"
              >
                Xác nhận thông tin
              </CButton>
              {/* <CButton
                color="warning"
                onClick={() => handleEditRowClick(0)}
                className="mr-2"
              >
                Chỉnh sửa tờ khai
              </CButton> */}
            </div>
          </CCardHeader>
          <CCardBody>
            <ToKhaiYTe keyForEdit={id_to_khai}></ToKhaiYTe>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default XacNhanThongTinToKhaiPage;
