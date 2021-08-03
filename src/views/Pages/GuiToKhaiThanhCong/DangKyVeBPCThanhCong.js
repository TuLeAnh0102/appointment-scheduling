import React, {Component} from "react";
import {
    CRow,
    CCol,
    CButton
} from "@coreui/react";
//import { history } from "src/helpers";
class DangKyVeBPCThanhCong extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: props.data
        }
    }

    BackToToKhai = () => {
        window.location.reload();
        //history.push('/dang-ky-ve-bpc')
        return 1;
    }

    render() { 
        return ( 
            <div className="container" style={{ textAlign: "center", margin: "0.5em" }}>
                <CRow>
                    <CCol xs="12">
                        <h4 >
                            HỆ THỐNG XÁC NHẬN <br />
                        </h4>
                    </CCol>
                </CRow>
                <hr/>
                <CRow >
                    <CCol xs="12">
                        <h5>
                            Ông/bà : <b>{this.state.data['ho_ten']}</b> đã đăng ký thông tin tin thành công.<br />
                            Ông/bà <b>{this.state.data['ho_ten']}</b> Vui lòng chờ tỉnh Bình Phước xác nhận và sắp xếp trong thời gian nhanh nhất!.
                            <br />
                        </h5>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol xs="12">
                        <h3>Trân trọng cảm ơn !!</h3>
                    </CCol>
                </CRow>

                <CRow>
                    <CButton
                        color="success"
                        className="mr-2"
                        style={{ margin: "1em" }}
                        onClick={this.BackToToKhai}
                    >
                        Tiếp tục đăng ký cho người khác
                    </CButton>
                </CRow>
            </div>
        );
    }
}
export default DangKyVeBPCThanhCong;