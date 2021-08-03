import React, {useState} from "react";
import {
    CRow,
    CCol,
} from "@coreui/react";

export default function SuccessPageQR({data}) {
    return (
        <div className="container" style={{ textAlign: "center", margin: "0.5em" }}>
                <CRow>
                    <CCol xs="12">
                        <h4 >
                            CHỐT KIỂM DỊCH XÁC NHẬN <br />
                        </h4>
                    </CCol>
                </CRow>
                <hr/>
                <CRow >
                    <CCol xs="12">
                        <h5>
                            Ông/bà : <b>{data['ho_ten']}</b> đã khai báo y tế thành công.<br />
                            Mời ông/bà <b>{data['ho_ten']}</b> đến bàn xác minh thông tin để thực hiện bước tiếp theo
                            <br />
                        </h5>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol xs="12">
                        <h3>Xin cảm ơn !!</h3>
                    </CCol>
                </CRow>

                {/* <CRow>
                    <CButton
                        color="success"
                        className="mr-2"
                        style={{ margin: "1em" }}
                        onClick={this.BackToToKhai}
                    >
                        Trở về trang khai báo
                    </CButton>
                </CRow> */}
            </div>
    )
}
