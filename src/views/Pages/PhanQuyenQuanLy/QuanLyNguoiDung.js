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

import { useDispatch, useSelector } from "react-redux";
import { userService } from "../../../services";

const getStatus = (status) => {
  switch (status) {
    case "1":
      return "success";
    case "0":
      return "danger";
    default:
      return "primary";
  }
};

function QuanLyNguoiDungPage() {
  const [data, setdata] = useState([]);
  const [openPopupPartial, setOpenPopupPartial] = useState(false);
  const [keyForEdit, setKeyForEdit] = useState(0);

  useEffect(() => {
    userService.getAllUser().then((res) => {
      if (res.success && res.data != null) {
        setdata(res.data);
      }
    });
  }, []);

  function handleEditRowClick(ma_xe_kc) {
    setKeyForEdit(ma_xe_kc);
    setOpenPopupPartial(true);
  }

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            DANH SÁCH XE
            <div className="card-header-actions">
              <CButton
                color="info"
                onClick={() => handleEditRowClick(0)}
                className="mr-1"
              >
                Thêm mới
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            {/* {data.loading && <em>Loading users...</em>}
            {data.error && (
              <span className="text-danger">ERROR: {data.error}</span>
            )} */}
            {data && (
              <ReactTable
                data={data}
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
                    Header: "Tài khoản",
                    id: "username",
                    accessor: (c) => c.username,
                    filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, { keys: ["username"] }),
                    filterAll: true,
                  },
                  {
                    Header: "Họ và tên",
                    id: "ten-nguoi-dung",
                    accessor: (c) => c.ten_nguoi_dung,
                    filterMethod: (filter, rows) =>
                      matchSorter(rows, filter.value, {
                        keys: ["ten-nguoi-dung"],
                      }),
                    filterAll: true,
                  },
                  {
                    Header: "Di động",
                    id: "di-dong",
                    accessor: (c) => c.di_dong,
                  },
                  {
                    Header: "STT",
                    id: "stt-nguoi-dung",
                    accessor: (c) => c.stt_nguoi_dung,
                  },
                  {
                    Header: "Trạng thái",
                    accessor: "trang_thai",
                    id: "trang-thai",
                    Cell: ({ value }) => (
                      <>
                        <CBadge color={getStatus(value)}>{value}</CBadge>
                      </>
                    ),
                  },
                  {
                    Header: "Acctions",
                    filterable: false,
                    accessor: "ma_xe_kc",
                    Cell: (cell) => (
                      <div style={{ textAlign: "center" }}>
                        <CButton
                          color="warning"
                          onClick={() =>
                            handleEditRowClick(cell.row.ma_nguoi_dung_kc)
                          }
                        >
                          <CIcon size="lg" name="cil-brush" />
                        </CButton>
                        {"  "}
                        <CButton
                          color="danger"
                          onClick={() => {
                            handleEditRowClick(cell.row.ma_nguoi_dung_kc);
                          }}
                          to="/xe/thong-tin-xe"
                        >
                          <CIcon size="lg" name="cil-delete" />
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

          {/* <EditCauHinhXePartial
                        propShow={openPopupPartial}
                        propOnClose={() => setOpenPopupPartial(!openPopupPartial)}
                        keyForEdit = {keyForEdit}
                    ></EditCauHinhXePartial> */}
        </CCard>
      </CCol>
    </CRow>
  );
}

export default QuanLyNguoiDungPage;
