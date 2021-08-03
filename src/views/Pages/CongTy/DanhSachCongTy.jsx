import React, { useEffect, useState } from "react";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CButton,
  CRow,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { matchSorter } from "match-sorter";
import { congTyService } from "../../../services";
import { Loading } from "src/components/Loading/loading";
import ThongTinCongTyPartial  from "./ThongTinCongTyPartial.jsx";

function DanhSachCongTyPage() {
  let user = JSON.parse(localStorage.getItem("user"));
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openPopupPartial, setOpenPopupPartial] = useState(false);
  const [idCongTy, setIdCongTy] = useState(0);

  const loadData = () => {
    if (!loading) {
      setLoading(true);
      congTyService.getDanhSachCongTyInKCN(user.ma_kcn)
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
  }, []);

  const handelDeleteRow =(row) =>
  {
    console.log(row);
    if (window.confirm('Bạn có muốn xóa thông tin khai báo của: '+row.ten_cong_ty +'?'))
    {
      congTyService.deleteCongTy(row.ma_cong_ty)
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
    setIdCongTy(id);
    setOpenPopupPartial(true);
  }

  return (
    <div>
      {loading ? ( <Loading />) : (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader><b>DANH SÁCH CÔNG TY THUỘC KHU CÔNG NGHIÊP</b>
                <div className="card-header-actions">
                <CButton
                  color="info"
                  onClick={() => handleShowRowClick(0)}
                  className="mr-1"
                >
                  Thêm công ty
                </CButton>
              </div>
              </CCardHeader>
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
                        Header: "STT",
                        id: "so-thu-tu",
                        filterMethod: (filter, rows) =>
                          matchSorter(rows, filter.value, { keys: ["so-thu-tu"] }),
                        filterAll: true,
                        width:50,
                        Cell: (props) => (
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
                        Header: "Mã công ty",
                        id: "ma-cong-ty",
                        accessor: (c) => c.ma_cong_ty,
                        width:100,
                        filterMethod: (filter, rows) =>
                          matchSorter(rows, filter.value, { keys: ["ma-cong-ty"] }),
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
                        Header: "Công ty",
                        id: "ten-cong-ty",
                        accessor: (c) => c.ten_cong_ty,
                        filterMethod: (filter, rows) =>
                          matchSorter(rows, filter.value, { keys: ["ten-cong-ty"] }),
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
                        Header: "Khu công nghiệp",
                        id: "ten-khu-cong-nghiep",
                        accessor: (c) => c.ten_khu_cong_nghiep,
                        filterMethod: (filter, rows) =>
                          matchSorter(rows, filter.value, {
                            keys: ["ten-khu-cong-nghiep"],
                          }),
                        filterAll: true,
                        width:300,
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
                        Header: "Số công nhân",
                        id: "so-cong-nhan",
                        accessor: (c) => c.so_cong_nhan,
                        filterMethod: (filter, rows) =>
                          matchSorter(rows, filter.value, {
                            keys: ["so-cong-nhan"],
                          }),
                        filterAll: true,
                        width:100,
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
                        Header: "Tài khoản",
                        id: "username",
                        accessor: (c) => c.username,
                        filterMethod: (filter, rows) =>
                          matchSorter(rows, filter.value, {
                            keys: ["username"],
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
                        Header: "Password",
                        id: "pass-show",
                        accessor: (c) => c.pass_show,
                        filterMethod: (filter, rows) =>
                          matchSorter(rows, filter.value, {
                            keys: ["pass-show"],
                          }),
                        filterAll: true,
                        width:100,
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
                        Header: "Acctions",
                        filterable: false,
                        width:150,
                        accessor: "id",
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
                              onClick={() => handleShowRowClick(props.original.ma_cong_ty)}
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
              <ThongTinCongTyPartial
                propShow={openPopupPartial}
                propOnClose={() => setOpenPopupPartial(!openPopupPartial)}
                keyForEdit={idCongTy}
              ></ThongTinCongTyPartial>
            </CCard>
          </CCol>
        </CRow>
      )}
    </div>
  );
}

export default DanhSachCongTyPage;
