import React, { Component } from "react";
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

class XacNhanCheckout extends Component {
    constructor(props) {
        super(props);
        this.state = { 

        }
    }

    geoFindMe = () => {
        let href = `https://www.openstreetmap.org/#map=18/`
        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            href = `${href}${latitude}/${longitude}`;
        }

        function error() {
            href = 'Unable to retrieve your location';
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        }
        return href;
    }

    handleSubmit = (data)=>{
        // console.log(geoFindMe, data);
        // danhSachToKhaiService.ThongBaoDenZalo()
    }

    render() {
        return (
            <div style={style}>
                <CRow style={style1}>
                    <div className="col-12">
                        <h5 style={style2}>
                            XÁC NHẬN RỜI KHỎI TỈNH BÌNH PHƯỚC
                        </h5>
                    </div>
                </CRow>
                <CRow>
                    <form>
                        <label>
                            Nhập số điện thoại:
                            <input type='number' name='so_dien_thoai' />
                        </label>
                        <input type='submit' value='Xác thực' />
                    </form>
                </CRow>


            </div>
        );
    }
}

export default XacNhanCheckout;