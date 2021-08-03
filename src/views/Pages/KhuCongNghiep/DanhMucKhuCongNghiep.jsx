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
import { khuCongNghiepService } from "../../../services";
import moment from "moment";
import DateTime from 'react-datetime';
import { commonConstants } from "../../../constants";
import { history } from "../../../helpers";
import { Loading } from "src/components/Loading/loading";

const getXacNhanKhaiBao = (status) => {
  switch (status) {
    case true:
      return <CBadge color="success">Đã xác minh tờ khai y tế</CBadge>;
    default:
      return <CBadge color="danger">Chưa xác minh tờ khai y tế</CBadge>;
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

function DanhMucKhuCongNghiepPage() {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [tinhTrangToKhai, setTinhTrangToKhai] = useState("0");
  const [loading, setLoading] = useState(false);
  let user = JSON.parse(localStorage.getItem("user"));

  const loadData = () => {
    if (!loading) {
      setLoading(true);
      khuCongNghiepService.getAllKhuCongNghiep()
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
  }, [tinhTrangToKhai]);

  const handelDeleteRow =(id) =>
  {
    if (window.confirm('Bạn có muốn xóa thông tin khai báo của: '+id.ho_ten +'?'))
    {
      khuCongNghiepService.deleteKhuCongNghiep(id.id)
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
    history.push("/xac-nhan-thong-tin-to-khai/" + id);
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
              <CCardHeader>DANH SÁCH KHU CÔNG NGHIỆP</CCardHeader>
              <CCardBody>
                {loading && <em>Loading danh sách khu công nghiêp...</em>}
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
                        Header: "Tên khu công nghiệp",
                        id: "ten-kcn",
                        accessor: (c) => c.ten_khu_cong_nghiep,
                        filterMethod: (filter, rows) =>
                          matchSorter(rows, filter.value, { keys: ["ten-kcn"] }),
                        filterAll: true,
                      },
                      {
                        Header: "Huyện",
                        id: "huyen",
                        accessor: (c) => c.ten_huyen,
                        filterMethod: (filter, rows) =>
                          matchSorter(rows, filter.value, {
                            keys: ["huyen"],
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
                        Header: "Tỉnh",
                        id: "tinh",
                        accessor: (c) => c.ten_tinh,
                        filterMethod: (filter, rows) =>
                          matchSorter(rows, filter.value, {
                            keys: ["tinh"],
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
                      }
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

export default DanhMucKhuCongNghiepPage;
