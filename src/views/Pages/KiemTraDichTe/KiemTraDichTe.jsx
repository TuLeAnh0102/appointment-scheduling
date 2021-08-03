import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CButton,
  CRow,
} from "@coreui/react";

import { useSelector } from 'react-redux';
import "react-table-v6/react-table.css";
import ThongTinLayMauPartial from "./ThongTinLayMauPartial";
import { history } from "../../../helpers";
import ToKhaiYTe from "../ToKhaiYTe/ToKhaiYTe";
import LichSuDichTe from "./LichSuDichTe";
import {theoDoiCachLyService} from "../../../services"
import { Loading } from "src/components/Loading/loading";
import KiemTraKhoiHanh from './KiemTraNoiKhoiHanh'
import moment from "moment";

const getDateTimeNow = () => {
  let newDate = new Date();
  let date = newDate.getDate();
  if (date < 10) date = "0" + date;
  let month = newDate.getMonth() + 1;
  if (month < 10) month = "0" + month;
  let year = newDate.getFullYear();

  let timenow = (date + "/" + month + "/" + year);
  return timenow;
};
function KiemTraDichTePage(props) {
  const [openPopupPartial, setOpenPopupPartial] = useState(false);
  const [openLichSuDichTe, setopenLichSuDichTe] = useState(false);
  const [lichSuDTloadding, setlichSuDTloadding] = useState(false);
  const [openKiemTrakhoihanh, setopenKiemTrakhoihanh] = useState(false);
  const [info, setinfo] = useState([]);
  const [noidi, setNoidi] = useState()
  const id_to_khai = props.match.params.id;
  const infoNguoikhaibao = useSelector(state => state.setinfohuman);

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

  function handleInCamKetClick() {
    var innerContents = document.getElementById("InCamKet").innerHTML;
    var tabPrint = window.open("", "", "");
    tabPrint.document.open();
    tabPrint.document.write(
      '<html><head><link rel="stylesheet" type="text/css" href="style.css" /><style>@media print {thead {display: table-header-group;}}</style></head><body onload="window.print()">'
    );
    tabPrint.document.write(innerContents + "</html>");
    tabPrint.document.close();
  }

  useEffect(() => {
    if(infoNguoikhaibao.info_sdt !== '' && infoNguoikhaibao.info_sdt !== undefined)
    {
      setlichSuDTloadding(true);
      theoDoiCachLyService.getInfoDangCachLytheoSDT(infoNguoikhaibao.info_sdt)
      .then((res) => {
        setlichSuDTloadding(false);
        if (res.success && res.data != null) {
          console.log(res.data);
          var timeNow = getDateTimeNow();
          var timeDichTe = moment(res.data.ngay_kiemtra_dichte).format("DD/MM/YYYY");
          if (timeNow === timeDichTe) {
            console.log(moment(res.data.ngay_kiemtra_dichte).format("DD/MM/YYYY"));
          }
          else {
            setopenLichSuDichTe(true);
            setinfo(res.data);
          }

        }
      });
    }
    
  }, [infoNguoikhaibao])

  function handleChiDinhXetNghiemClick() {
    setOpenPopupPartial(true);
  }

  function handleThoatClick() {
    history.push("/danh-sach-dich-te");
  }

  function handleKiemTraNoiKhoiHanhClick(){
    setopenKiemTrakhoihanh(true);
  }

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            ĐIỀU TRA DỊCH TỄ
            <div className="card-header-actions">
              <CButton
                color="secondary"
                onClick={() => handleThoatClick()}
                className="mr-1"
              >
                Thoát
              </CButton>
              <CButton
                color="danger"
                onClick={() => handleKiemTraNoiKhoiHanhClick()}
                className="mr-1"
              >
                Kiểm tra nơi khởi hành
              </CButton>
              <CButton
                color="success"
                onClick={() => handleInCamKetClick()}
                className="mr-1"
              >
                In cam kết
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
                onClick={() => handleChiDinhXetNghiemClick()}
                className="mr-1"
              >
                Chỉ định xét nghiệm
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            <ToKhaiYTe keyForEdit={id_to_khai}></ToKhaiYTe>
          </CCardBody>

          <ThongTinLayMauPartial
            propShow={openPopupPartial}
            propOnClose={() => setOpenPopupPartial(!openPopupPartial)}
            keyForEdit={id_to_khai}
          ></ThongTinLayMauPartial>
          {lichSuDTloadding? <Loading></Loading>:
            <LichSuDichTe 
            isOpen ={openLichSuDichTe} 
            info ={info}
            >
            </LichSuDichTe>
          }
          
          <KiemTraKhoiHanh 
            isOpen={openKiemTrakhoihanh}
            isClose={() => setopenKiemTrakhoihanh(!openKiemTrakhoihanh)}
            info={id_to_khai}
          />
        </CCard>
      </CCol>
    </CRow>
  );
}

export default KiemTraDichTePage;
