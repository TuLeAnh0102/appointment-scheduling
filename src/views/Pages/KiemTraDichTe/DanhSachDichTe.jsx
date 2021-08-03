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
  CSelect
} from "@coreui/react";

import { useDispatch, useSelector } from 'react-redux';
import CIcon from "@coreui/icons-react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { matchSorter } from "match-sorter";
import { danhSachToKhaiService } from "../../../services";
import { Loading } from "../../../components/Loading/loading.jsx";
import moment from "moment";
import DateTime from 'react-datetime';
import { commonConstants } from "../../../constants";
import { history } from  "../../../helpers"

const getXacNhanDichTe = (status) => {
  switch (status) {
    case true:
      return <CBadge color="success">Đã xác nhận dịch tễ</CBadge>;
    case false:
      return <CBadge color="danger">Chưa xác nhận dịch tễ</CBadge>;
    default:
      return ;
  }
};

const getGioiTinh = (status) => {
  switch (status) {
    case 1:
      return "Nam";
    default:
      return "Nữ";
  }
};

const FORMAT_DATETIME = 'yyyy-MM-DD HH:mm:ss';

function DanhSachDichTePage() {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  let currentDay = new Date();
  const [startDate, setStartDate] = useState(moment(currentDay).add(-1, 'day'));
  const [endDate, setEndDate] = useState(moment(currentDay).add(1, 'hours'));
  const [tinhTrangDichTe, setTinhTrangDichTe] = useState(false);
  const [loading, setLoading] = useState(false);
  let user = JSON.parse(localStorage.getItem("user"));

  const loadData = () => {
    if (!loading) {
      setLoading(true);
      danhSachToKhaiService.getAllDanhSachDichTeByTime(moment(startDate).format(FORMAT_DATETIME), moment(endDate).format(FORMAT_DATETIME), tinhTrangDichTe, user.ma_chot)
        .then((res) => {
          if (res.success && res.data != null) {
            setRows(res.data);
            setLoading(false);
          } else {
            setLoading(false);
            alert("Không có dữ liệu");
          }
        });
    }
  };

  useEffect(() => {
    loadData();
  }, [tinhTrangDichTe]);

  function handleShowRowClick(id) {
    history.push('/kiem-tra-dich-te/' + id);
  }

  function handleChangeStartDate(date){
    setStartDate(date);
  }

  function handleChangeEndDate(date) {
    setEndDate(date);
  }

  function handleChangeTinhTrangDichTe(e) {
    setTinhTrangDichTe(e.target.value);
  }

  function handleBtnSearchClick() {
    loadData();
  }

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            DANH SÁCH KIỂM TRA DỊCH TỄ
          </CCardHeader>
          <CCardBody>
            <CFormGroup row className="my-0 justify-content-md-center">
              <CCol lg="3" xs="12">
                <CFormGroup>
                  <CLabel htmlFor="postal-code">Xác minh dịch tễ</CLabel>
                  <CSelect custom name="select" id="select" onChange={handleChangeTinhTrangDichTe}>
                    <option value="0">Chưa xác nhận dịch tễ</option>
                    <option value="1">Đã xác minh dịch tễ</option>
                  </CSelect>
                </CFormGroup>
              </CCol>
              <CCol lg="3" xs="12">
                <CFormGroup>
                  <CLabel htmlFor="startDate">Từ ngày</CLabel>
                  <DateTime
                    dateFormat="DD/MM/YYYY"
                    timeFormat="HH:mm"
                    value={startDate}
                    onChange={handleChangeStartDate}
                    />
                </CFormGroup>
              </CCol>
              <CCol lg="3" xs="12">
                <CFormGroup>
                  <CLabel htmlFor="endDate">Đến ngày</CLabel>
                  <DateTime
                    dateFormat="DD/MM/YYYY"
                    timeFormat="HH:mm"
                    value={endDate}
                    onChange={handleChangeEndDate}
                    />
                </CFormGroup>
              </CCol>
            </CFormGroup>
            <CFormGroup row className="my-0">
              <CCol md={{ span: 3, offset: 9 }}>
                <CFormGroup>
                  <CButton
                    type="button"
                    size="sm"
                    color="success"
                    onClick={handleBtnSearchClick}
                  >
                    <CIcon name="cil-magnifying-glass" /> Tìm kiếm
                  </CButton>
                </CFormGroup>
              </CCol>
            </CFormGroup>
            <hr className="mt-0" />
            {loading && <em>Loading data...</em>}
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
                columns={[
                  {
                    Header: "Họ tên",
                    id: "ho-ten",
                    accessor: (c) => c.ho_ten,
                    filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["ho-ten"] }),
                    filterAll: true,
                  },
                  {
                    Header: "Số điện thoại",
                    id: "so-dien-thoai",
                    accessor: (c) => c.so_dien_thoai,
                    filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, {
                        keys: ["so-dien-thoai"],
                      }),
                    filterAll: true,
                    Cell: ({ value }) => (
                      <span
                        style={{
                          display: "block",
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        {value}
                      </span>
                    ),
                  },
                  {
                    Header: "Năm sinh",
                    id: "nam-sinh",
                    accessor: (c) => c.nam_sinh,
                    filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["nam-sinh"] }),
                    filterAll: true,
                    Cell: ({ value }) => (
                      <span
                        style={{
                          display: "block",
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        {value}
                      </span>
                    ),
                  },
                  {
                    Header: "Giới tính",
                    id: "gioi-tinh",
                    accessor: (c) => c.gioi_tinh,
                    Cell: ({ value }) => (
                      <span
                        style={{
                          display: "block",
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        {getGioiTinh(value)}
                      </span>
                    ),
                  },
                  {
                    Header: "Trạng thái lấy mẫu",
                    id: "xac-nhan-khai-bao",
                    accessor: (c) => c.xac_nhan_dich_te,
                    Cell: ({ value }) => (
                      <span
                        style={{
                          display: "block",
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        {getXacNhanDichTe(value)}
                      </span>
                    ),
                  },
                  {
                    Header: "Chỉ định xét nghiệm",
                    id: "ten-chi-dinh-xet-nghiem",
                    accessor: (c) => c.ten_chi_dinh_xet_nghiem,
                    filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, {
                        keys: ["ten-chi-dinh-xet-nghiem"],
                      }),
                    filterAll: true
                  },
                  {
                    Header: "Hướng xử lý",
                    id: "ten-huong-xu-ly",
                    filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, {
                        keys: ["ten-huong-xu-ly"],
                      }),
                    filterAll: true,
                    accessor: (c) => c.ten_huong_xu_ly
                  },
                  {
                    Header: "Acctions",
                    filterable: false,
                    accessor: "id",
                    Cell: ({ value }) => (
                      <div style={{ textAlign: "center" }}>
                        <CButton
                          color="warning"
                          onClick={() => handleShowRowClick(value)}
                        >
                          <CIcon size="lg" name="cil-brush" />
                        </CButton>
                        {"  "}
                      </div>
                    ),
                  },
                ]}
                defaultPageSize={10}
                className="-striped -highlight"
              />
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default DanhSachDichTePage;
