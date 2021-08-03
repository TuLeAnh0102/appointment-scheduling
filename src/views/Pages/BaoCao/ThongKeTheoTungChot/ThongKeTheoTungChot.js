import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CButton,
  CRow,
  CLabel,
  CFormGroup,
  CSelect,
  // DateTimePickerInput
} from "@coreui/react";
// import DateTimePickerInput from 'coreui/lib/components/DateTimePickerInput';
import DateTime from 'react-datetime';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import CIcon from "@coreui/icons-react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Loading } from "../../../../components/Loading/loading.jsx";
import moment from "moment";
import { history } from "../../../../helpers";
import { columns } from "./ObjectColumns";
import { reportService } from "src/services/reports.service";
import {listChot} from 'src/datamock/commonData';
import { commonService } from "src/services/common.service";

const FORMAT_DATETIME = 'yyyy-MM-DD HH:mm:ss';
function ThongKeTheoTungChotPage() {
  let user = JSON.parse(localStorage.getItem("user"));
  const [rows, setRows] = useState([]);
  let currentDay = new Date();
  const [startDate, setStartDate] = useState(moment(currentDay).add(-1, 'day'));
  const [endDate, setEndDate] = useState(new Date());
  const [chotDichTe, setchotDichTe] = useState(user.ma_chot);
  const [loading, setLoading] = useState(false);
  const [huongXL, sethuongXL] = useState(0);
  const [xet_nghiem, setXN] = useState(0);
  const [dmXL, setdmXL] = useState([]);
  const [dmXN, setdmXN] = useState([]);

  const loadData = () => {
    setLoading(true)
    if (!loading) {
      setLoading(true);
      reportService.thongkeDanhsachTheoDK(chotDichTe, huongXL, xet_nghiem, moment(startDate).format(FORMAT_DATETIME), moment(endDate).format(FORMAT_DATETIME))
        .then((res) => {
          if (res.success && res.data != null) {
            setRows(res.data);
            setLoading(false);
          } else {
            setLoading(false);
            setRows([])
            // alert("Không có dữ liệu");
          }
        });
    }
  };

  useEffect(() => {
    initDanhMuc();
    loadData();
    //console.log(moment().format());
  }, []);
  function handleChangeChotDichTe(e) {
    setchotDichTe(e.target.value);
  }

  function handleBtnSearchClick() {
    loadData();

  }

  function handleChangeHuongXL(e){
    sethuongXL(e.target.value)
  }

  function handleChangeCDXN(e) {
    setXN(e.target.value)
  }

  function handleChangeStartDate(date){
    // console.log(date);
    setStartDate(date);
  }

  function handleChangeEndDate(date) {
    setEndDate(date);
  }

  function handleBtnExportClick() {
    // constant
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    // export
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, 'Thống kê' + fileExtension);
  }

  function initDanhMuc(){
    commonService.getDanhMucHuongXuLy().then(res => {

      setdmXL(res.data);
    })
    commonService.getDanhMucXetNghiem().then(res => {
      setdmXN(res.data);
    })
    
    console.log(dmXL, dmXN);
  }

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            THÔNG KÊ THEO TỪNG CHỐT
          </CCardHeader>
          <CCardBody>
            <CFormGroup row className="my-0">
              <CCol lg="4" xs="12">
                <CFormGroup>
                  <CLabel htmlFor="postal-code">Chốt</CLabel>
                  <CSelect custom name="select" id="select" value={chotDichTe} onChange={handleChangeChotDichTe}>
                    {
                      listChot().map(item => {
                        return(
                          <option value={item.id}>Chốt {item.title}</option>
                        )
                      })
                    }
                    {/* <option value="0">Tất cả</option>
                    <option value="1">Chốt Phú Sơn, Bù Đăng</option>
                    <option value="2">Chốt Tân Lập, Đồng Phú</option>
                    <option value="3">Chốt Thành Tâm, Chơn Thành</option>
                    <option value="4">Chốt Minh Long, Chơn Thành</option>
                    <option value="5">Chốt Minh Tâm, Hớn Quản</option> */}
                  </CSelect>
                </CFormGroup>
              </CCol>
              <CCol lg="4" xs="12">
                <CFormGroup>
                  <CLabel htmlFor="postal-code">Hướng xử lý</CLabel>
                  <CSelect custom name="select" id="select" onChange={handleChangeHuongXL}>
                    <option value="0">Tất cả</option>
                    {
                      dmXL.map(item => {
                        return(
                          <option value={item.value}>{item.label}</option>
                        )
                      })
                    }
                    {/* <option value="1">Tự theo dõi sức khỏe</option>
                    <option value="2">Tự cách ly tại nhà 21 ngày</option>
                    <option value="3">Cách ly tập trung</option>
                    <option value="4">Test nhanh</option>
                    <option value="5">Không xử lý dịch tễ</option> */}
                  </CSelect>
                </CFormGroup>
              </CCol>
              <CCol lg="4" xs="12">
                <CFormGroup>
                  <CLabel htmlFor="postal-code">Chỉ định xét nghiệm</CLabel>
                  <CSelect custom name="select" id="select" onChange={handleChangeCDXN}>
                    <option value="0">Tất cả</option>
                    {
                      dmXN.map(item => {
                        return (
                          <option value={item.value}>{item.label}</option>
                        )
                      })
                    }
                    {/* <option value="1">Không lấy mẫu xét nghiệm</option>
                    <option value="2">Lấy mẫu xét nghiệm đơn</option>
                    <option value="3">Lấy mẫu xét nghiệm gộp</option>
                    <option value="4">Lấy mẫu test nhanh</option> */}
                  </CSelect>
                </CFormGroup>
              </CCol>

            </CFormGroup>
            <CFormGroup row className="my-0">
              <CCol lg="4" xs="12">
                <CFormGroup>
                  <CLabel htmlFor="city">Từ ngày</CLabel>
                  <DateTime
                    dateFormat="DD/MM/YYYY"
                    timeFormat="HH:mm"
                    value={startDate}
                    onChange={handleChangeStartDate}
                    />
                </CFormGroup>
              </CCol>
              <CCol lg="4" xs="12">
                <CFormGroup>
                  <CLabel htmlFor="postal-code">Đến ngày</CLabel>
                  <DateTime
                    dateFormat="DD/MM/YYYY"
                    timeFormat="HH:mm"
                    value={endDate}
                    onChange={handleChangeEndDate}
                    />
                </CFormGroup>
              </CCol>
              <CCol lg="4" xs="12" style={{paddingTop:'10px'}}>
                <CLabel > {" "}</CLabel>
                <CFormGroup >
                  <CButton
                    type="button"
                    size="sm"
                    color="success"
                    className="float-center"
                    onClick={handleBtnSearchClick}
                  >
                    <CIcon name="cil-magnifying-glass" /> Tìm kiếm
                  </CButton>
                  {"  "}
                  <CButton
                    type="button"
                    size="sm"
                    color="info"
                    className="float-center"
                    onClick={handleBtnExportClick}
                  >
                    <CIcon name="cil-print" /> Xuất báo cáo
                  </CButton>
                </CFormGroup>
              </CCol>
            </CFormGroup>
            <hr className="mt-0" />
            {loading && <Loading/>}
            {rows && (
              <ReactTable
                data={rows}
                previousText="Previous"
                nextText="Next"
                loadingText="Loading..."
                noDataText="No rows found"
                pageText="Trang"
                ofText="của"
                rowsText="dòng"
                filterable
                defaultFilterMethod={(filter, row) =>
                  String(row[filter.id]) === filter.value
                }
                columns={columns}
                defaultPageSize={20}
                className="-striped -highlight"
              />
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default ThongKeTheoTungChotPage;
