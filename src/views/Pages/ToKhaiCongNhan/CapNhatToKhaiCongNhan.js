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
import { history } from "../../../helpers";
import moment from "moment";
import ToKhaiYTe from "../ToKhaiYTe/ToKhaiYTe";
import config from "../../../configs/config";
import ToKhaiCongNhan from './ToKhaiCongNhan';

function CapNhatToKhaiCongNhan(props) {
    const id_to_khai = props.match.params.id;
    let user = JSON.parse(localStorage.getItem("user"));

    console.log('xxxxx', id_to_khai);
    function handleBtnXacNhanClick() {
        danhSachToKhaiService.xacNhanToKhaiYTe(id_to_khai, user.ma_chot)
            .then((res) => {
                if (res.success) {
                    alert("Xác minh tờ khai y tế thành công");
                    history.push('/danh-sach-to-khai-y-te');
                } else {
                    alert("Không thể xác nhận tờ khai y tế")
                }
            });
    }

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>
                        CẬP NHẬT THÔNG TIN TỜ KHAI
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
                        <ToKhaiCongNhan keyForEdit={id_to_khai}/>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}

export default CapNhatToKhaiCongNhan;
