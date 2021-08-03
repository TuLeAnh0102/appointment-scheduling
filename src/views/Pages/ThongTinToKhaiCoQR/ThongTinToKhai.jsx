import React, { useEffect, useState, useRef } from "react";
import {
  CCard,
  CRow,
  CButton,
  CCardBody,
  CForm,
  CCol,

} from "@coreui/react";
import "react-table-v6/react-table.css";
import { theoDoiCachLyService } from "../../../services";
import { Loading } from "src/components/Loading/loading";
import { useParams } from "react-router-dom";
// import QrReader from 'react-qr-reader';
// import { Button } from 'react-bootstrap';

function ToKhaiYTePage(props) {
  const [record, setRecord] = useState({});
  const { id } = useParams();
  const [isLoadding, setisLoadding] = useState(0);
  const [showInfo, setShowInfo] = useState(true);

  useEffect(() => {
    console.log(id);
    if (id) {
      setisLoadding(1);
      theoDoiCachLyService.getTheoDoiCachLy(id).then((res) => {
        if (res.success && res.data) {
          setRecord(res.data)
          //getTenChot(record.noi_lay_mau)
        }
        setisLoadding(0);
      });
    }
    
  }, [id]);

  const getTenChot = (status) => {
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

  const handleSubmit = () => {
    // if(data.so_dien_thoai == record.so_dien_thoai){
    //   setShowInfo(1);
    // }
    setShowInfo(!showInfo)
  }

  const handleScan = data =>{
    alert(data);
    // history.p
  }

  const handleError = err => {
    console.error(err)
  }

  const user = JSON.parse(localStorage.getItem("user"));
  

  const checkout = ()=>{    
    alert('Đã rời khỏi Bình Phước tại chốt ' +  getTenChot(user.ma_chot))
  }

  return (
    <div>
      {isLoadding? <Loading/> : 
        <div>
          {
            //showInfo ? (
              <div>
                <CRow>
                  <CCol>
                    <CCard>
                      <CCardBody className="pt-0 pb-0">
                        <div
                          id="InToKhai"
                          // hidden={true}
                          style={{ fontFamily: "arial, sans-serif", padding: "1em" }}
                        >
                          <CRow className="flex-container">
                            <div className="col-12">
                              <h5 style={{ textAlign: "center", marginBottom: "0.5em", fontWeight: "bold" }}>
                                THÔNG TIN KHAI BÁO Y TẾ
                              </h5>
                            </div>
                          </CRow>
                          <CRow>
                            <span>
                              <b>Họ tên: {record.ho_ten}</b>
                            </span>
                          </CRow>
                          <CRow>
                            <span>
                              <b>Năm sinh: {record.nam_sinh}</b>
                            </span>
                          </CRow>
                          <CRow>
                            <span>
                              <b>Giới tính:{" "} {record.gioi_tinh === 1 ? "Nam" : "Nữ"}</b>
                            </span>
                          </CRow>
                          <CRow>
                            <span>
                              <b>Điện thoại: {record.so_dien_thoai}</b>
                            </span>
                          </CRow>
                          <CRow>
                            <span>
                              <b>CMND/CCCD/hộ chiếu:{" "}{record.cmnd}</b>
                            </span>
                          </CRow>
                          <CRow>
                            <span>
                              <b>Khai báo tại chốt:{" "}{getTenChot(record.noi_lay_mau)}</b>
                            </span>
                          </CRow>
                          <CRow>
                            <span>
                              <b>Thời gian khai báo:{" "}{record.ngay_xacminh_to_khai}</b>
                            </span>
                          </CRow>
                        </div>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
              </div>
            //)
            // : (
            //   // <form onSubmit={handleSubmit}>
            //   //   <label>
            //   //     Nhập số điện thoại:
            //   //     <input type='text' name='so_dien_thoai' />
            //   //   </label>
            //   //   <input type='submit' value='Xác thực'/>
            //   // </form>
            //     <div>
            //       <QrReader
            //         delay={300}
            //         onError={handleError}
            //         onScan={handleScan}
            //         style={{ width: '100%' }}
            //       />
                  
            //     </div>
            // )
          }
          {/* <div>
            {
              user ? (
                <div>
                  <Button variant="primary" onClick={handleSubmit}>Quét mã QR</Button>{' '}
                  <Button variant="success" onClick={checkout}>Checkout</Button>
                </div>
              ) : 
                (<div></div>)
              
            }
            
            
          </div> */}
        </div>
      }
    </div>

  );
}

export default ToKhaiYTePage;
