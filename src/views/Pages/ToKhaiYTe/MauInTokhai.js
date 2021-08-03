import React, { Component} from "react";
import {
    CRow,
    CCol,
} from "@coreui/react";
import moment from "moment";
const style = {
    fontFamily: "arial, sans-serif", 
    fontSize: "10px"
}

const style1 = {
    display: "flex", 
    justifyContent: "space-around"
}

const style2 = {
    textAlign: "center", 
    marginBottom: "0.5em"
}

const style3 = {
    borderCollapse: "collapse", width: "100%", margin: "5px 0"
}

const style4 = {
    textAlign: "left",
    width: "100%",
    
}

class MauInToKhai extends Component {
    constructor(props) {
        super(props);
        console.log(props.record);
    }

    getTenChot = (status) => {
        switch (status) {
            case "1":
                return "Phú Sơn - Bù Đăng";
            case "2":
                return "Tân Lập - Đồng Phú";
            case "3":
                return "Thành Tâm - Chơn Thành";
            case "4":
                return "Minh Long - Chơn Thành";
            case "5":
                return "Minh Tâm - Hớn Quản";
            case "6":
                return "Nội bộ - Chơn Thành";
            case "7":
                return "Tân Hiệp - Hớn Quản";
            case "8":
                return "Sao Bọng - Bù Đăng";
            default:
                return status;
        }
    };

    render() { 
        return ( 
            <div
                id="InCamKet"
                hidden={true}
                style={style}
            >
                <CRow style={style1}>
                    <div className="col-12">
                        <h5 style={style2}>
                        CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT Nam
                            <br />
                            Độc lập - Tự do - Hạnh phúc
                        </h5>
                    </div>
                    
                </CRow>
                <CRow style={style1}>
                    <div className="col-12">
                        <h5 style={style2}>
                            GIẤY CAM KẾT
                        </h5>
                    </div>
                </CRow>
                <CRow>
                    <table
                        style={style3}
                    >
                        <tr>
                            <td style={{ width: "66%" }}>
                                Họ tên: {this.props.record.ho_ten}
                            </td>
                            <td style={{ width: "34%" }}>
                                Năm sinh : {this.props.record.nam_sinh}
                            </td>
                        </tr>
                    </table>
                </CRow>
                <CRow>
                    <table
                        style={style3}
                    >
                        <tr>
                            <td style={{ width: "30%" }}>
                                Giới tính :{" "}
                                {this.props.record.gioi_tinh === 1 ? "Nam" : "Nữ"}
                            </td>
                            <td style={{ width: "30%" }}>
                                Quốc tịch : {this.props.record.quoc_tich}
                            </td>
                            <td style={{ width: "30%" }}>
                                Điện thoại : {this.props.record.so_dien_thoai}{" "}
                            </td>
                        </tr>
                    </table>
                </CRow>
                <CRow style={style3}>
                    <CCol>
                        CMND/Số căn cước/hộ chiếu:{" "} {this.props.record.cmnd}
                    </CCol>
                </CRow>
                <CRow>
                    <span>
                        Chỗ ở hiện nay : {this.props.record.str_dia_chi_lien_he}
                    </span>
                </CRow>
                <CRow>
                    <table
                        style={style3}
                    >
                        <tr>
                            <td style={{ width: "60%" }}>
                                Là tài xế xe biển số : {this.props.record.so_hieu_phuong_tien}{" "}
                            </td>
                            <td style={{ width: "40%" }}>
                                Số người trên xe: {"   "}{" Người"} 
                            </td>
                        </tr>
                    </table>
                </CRow>
                <CRow>
                    <span>
                        Địa điểm xuất phát : {this.props.record.str_dia_chi_bat_dau}
                    </span>
                </CRow>
                <CRow style={style3}>
                    <span>Nơi đến : {this.props.record.str_dia_chi_ket_thuc}</span>
                </CRow>
                
                <CRow>
                    <table style={style3}>
                        <tr>
                            <td style={style4}>
                                <b> Tôi cam kết không, Đón, Trả khách; Không dừng dừng đỗ xe trên địa bàn tỉnh Bình Phước 
                                và Chấp hành quy định của UBND tỉnh, Sở GTVT tỉnh Bình Phước về phòng, chống dịch Covid - 19.
                                </b>
                            </td>
                        </tr>
                    </table>
                </CRow>
                <CRow>
                    <table style={style3}>
                        <tr>
                            <td style={style4}>
                                Tôi xin chịu trách nhiệm trước Pháp luật nếu không thực hiện đúng nội dung cam kết.
                            </td>
                        </tr>
                    </table>
                </CRow>
                <br/>
                <CRow style={{textAlign: "right", fontStyle: "italic"}}>
                    <CCol xs="6">
                        {this.getTenChot(this.props.record.noi_lay_mau)}{", "}
                        Ngày {moment().format("DD")} Tháng{" "}
                        {moment().format("MM")} Năm {moment().format("yyyy")}
                        
                    </CCol>
                    <CCol xs="6" style={{marginRight: "2em"}}>
                        ( Ký, ghi rõ họ tên )
                    </CCol>
                </CRow>
            </div>
        );
    }
}
 
export default MauInToKhai;