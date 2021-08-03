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
  CFormGroup,
  CSelect,
} from "@coreui/react";

import { useDispatch} from "react-redux";
import CIcon from "@coreui/icons-react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { matchSorter } from "match-sorter";
import { VanTaiService } from "../../../services";
import moment from "moment";
import DateTime from 'react-datetime';
import { commonConstants } from "../../../constants";
import { history } from "../../../helpers";
import { Loading } from "src/components/Loading/loading";

const getXacNhanKhaiBao = (status) => {
  switch (status) {
    case true:
      return <CBadge color="success">Đã xác minh tờ khai vận tải</CBadge>;
    default:
      return <CBadge color="danger">Chưa xác minh tờ khai vận tải</CBadge>;
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

function DanhSachToKhaiVanTaiPage() {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  let currentDay = new Date();
  const [startDate, setStartDate] = useState(moment(currentDay).add(-1, 'day'));
  const [endDate, setEndDate] = useState(moment(currentDay).add(1, 'hours'));
  const [tinhTrangToKhai, setTinhTrangToKhai] = useState("0");
  const [loading, setLoading] = useState(false);
  let user = JSON.parse(localStorage.getItem("user"));

  const loadData = () => {
    if (!loading) {
      setLoading(true);
      VanTaiService.getDanhSachVanTaiByTime(moment(startDate).format(FORMAT_DATETIME), moment(endDate).format(FORMAT_DATETIME), tinhTrangToKhai, user.ma_chot_khai_bao_vt)
        .then((res) => {
          if (res.success && res.data != null) {
            setRows(res.data);
            console.log(res.data);
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
  }, [tinhTrangToKhai]);

  const handelDeleteRow =(id) =>
  {
    if (window.confirm('Bạn có muốn xóa thông tin khai báo của: '+id.ho_ten +'?'))
    {
      VanTaiService.deleteToKhaiVanTai(id.id)
      .then((res) => {
        if (res.success) {
          loadData();
          setLoading(false);
        } else {
          setLoading(false);
          alert("Không có dữ liệu");
        }
      });
    } else {
        return false;
    }
  }

  function handleShowRowClick(id) {
    dispatch({ type: commonConstants.SET_TOKHAI_YTE, toKhaiYTe: id });
    history.push("/van-tai/xac-nhan-thong-tin-to-khai-van-tai/" + id);
  }

  function handleChangeStartDate(date){
    setStartDate(date);
  }

  function handleChangeEndDate(date) {
    setEndDate(date);
  }

  function handleChangeTinhTrangToKhai(e) {
    setTinhTrangToKhai(e.target.value);
  }

  function handleBtnSearchClick() {
    loadData();
  }

  return (
    <div>
      {loading ? ( <Loading />) : (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader><b>DANH SÁCH TỜ KHAI VẬN TẢI</b></CCardHeader>
              <CCardBody>
                <CFormGroup row className="my-0 justify-content-md-center">
                  <CCol lg="3" xs="12">
                    <CFormGroup>
                      <CLabel htmlFor="postal-code">Tình trạng xác minh</CLabel>
                      <CSelect
                        custom
                        name="select"
                        id="select"
                        onChange={handleChangeTinhTrangToKhai}
                        defaultValue={tinhTrangToKhai}
                      >
                        <option value="0">Tờ khai chưa xác minh</option>
                        <option value="1">Tờ khai đã xác minh</option>
                      </CSelect>
                    </CFormGroup>
                  </CCol>
                  <CCol lg="3" xs="6">
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
                  <CCol lg="3" xs="6">
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
                  <CCol md={{ span: 3, offset: 9 }} xs={{ span: 4, offset: 8 }}>
                    <CFormGroup>
                      <CButton
                        type="button"
                        size="sm"
                        color="success"
                        onClick={handleBtnSearchClick}s
                      >
                        <CIcon name="cil-magnifying-glass" /> Tìm kiếm
                      </CButton>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                <hr className="mt-0" />
                {loading && <em>Loading users...</em>}
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
                        Header: "STT",
                        id: "stt",
                        // accessor: (c) => c.stt,
                        filterMethod: (filter, rows) =>
                          matchSorter(rows, filter.value, { keys: ["stt"] }),
                        filterAll: true,
                        width: 50,
                        Cell: (props) =>
                        (
                            <span
                              style={{
                                display: "block",
                                width: "100%",
                                textAlign: "center",
                              }}
                            >
                            {props.row._index + 1}
                            </span>
                          ),
                      },
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
                        width:150,
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
                        Header: "Biển số xe",
                        id: "bien-so",
                        accessor: (c) => c.bien_so,
                        filterMethod: (filter, rows) =>
                          matchSorter(rows, filter.value, {
                            keys: ["bien-so"],
                          }),
                        filterAll: true,
                        width:150,
                        Cell: ({ value }) => (
                          <span
                            style={{
                              display: "block",
                              width: "100%",
                              textAlign: "center",
                            }}
                          >
                            {value.toUpperCase()}
                          </span>
                        ),
                      },
                      {
                        Header: "Loại phương tiện",
                        id: "loai-phuong-tien",
                        accessor: (c) => c.loai_phuong_tien,
                        filterMethod: (filter, rows) =>
                          matchSorter(rows, filter.value, {
                            keys: ["loai-phuong-tien"],
                          }),
                        filterAll: true,
                        width:150,
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
                        Header: "Thời gian khai báo",
                        id: "ngay-tao",
                        accessor: (c) => c.ngay_tao,
                        width:200,
                        Cell: ({ value }) => (
                          <span
                            style={{
                              display: "block",
                              width: "100%",
                              textAlign: "center",
                            }}
                          >
                            {moment(value).format("DD/MM/yyyy HH:mm:ss")}
                          </span>
                        ),
                      },
                      {
                        Header: "Trạng thái",
                        id: "xac-nhan-khai-bao",
                        width:200,
                        accessor: (c) => c.is_xac_minh_to_khai,
                        Cell: ({ value }) => (
                          <span
                            style={{
                              display: "block",
                              width: "100%",
                              textAlign: "center",
                            }}
                          >
                            {getXacNhanKhaiBao(value)}
                          </span>
                        ),
                      },
                      {
                        Header: "Acctions",
                        filterable: false,
                        accessor: "id",
                        width:150,
                        Cell: (props) => (
                          <div style={{ textAlign: "center" }}>
                            <CButton
                              color="danger"
                              onClick={() => handelDeleteRow(props.original)}
                            >
                              <CIcon size="lg" name="cil-delete" />
                            </CButton>
                            {"  "}
                            <CButton
                              color="warning"
                              onClick={() => handleShowRowClick(props.value)}
                            >
                              <CIcon size="lg" name="cil-brush" />
                            </CButton>
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
      )}
    </div>
  );
}

export default DanhSachToKhaiVanTaiPage;
