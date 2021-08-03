import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CButton,
  CRow
} from "@coreui/react";

import "react-table-v6/react-table.css";
// import ThongTinLayMauPartial from "./ThongTinLayMauPartial";
import { VanTaiService } from "../../../services";
import { history } from  "../../../helpers";
import ToKhaiVanTai from "../ToKhaiYTe/ToKhaiVanTai.js";

function XacNhanThongTinToKhaiVanTaiPage(props) {
  const id_to_khai = props.match.params.id;
  let user = JSON.parse(localStorage.getItem("user"));

  function handleInToKhaiClick() {
    var innerContents = document.getElementById("InToKhai").innerHTML;
    var tabPrint = window.open("", "", "");
    tabPrint.document.open();
    tabPrint.document.write(
      '<html><head><link rel="stylesheet" type="text/css" href="style.css" /><style>@media print {thead {display: table-header-group;}}</style></head><body onload="window.print()">'
    );
    tabPrint.document.write(innerContents + "</html>");
    tabPrint.document.close();
  }

  function handleThoatClick() {
    history.push("/van-tai/danh-sach-to-khai-van-tai");
  }

  function handleBtnXacNhanClick() {
    VanTaiService.xacNhanToKhaiVanTai(id_to_khai, user.ma_chot_khai_bao_vt)
      .then((res) => {
        if (res.success) {
          alert("Xác minh tờ khai y tế thành công");
        } else {
          alert("Không thể xác nhận tờ khai y tế");
        }
      });
  }


  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <b>XÁC NHẬN THÔNG TIN TỜ KHAI VẬN TẢI</b>
            <div className="card-header-actions">
              <CButton
                color="secondary"
                onClick={() => handleThoatClick()}
                className="mr-1"
              >
                Thoát
              </CButton>
              <CButton
                color="success"
                onClick={() => handleInToKhaiClick()}
                className="mr-1"
              >
                In tờ khai
              </CButton>
              <CButton
                color="info"
                onClick={() => handleBtnXacNhanClick(0)}
                className="mr-1"
              >
                Xác nhận thông tin
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            <ToKhaiVanTai keyForEdit={id_to_khai}></ToKhaiVanTai>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default XacNhanThongTinToKhaiVanTaiPage;
