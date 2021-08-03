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

import CIcon from "@coreui/icons-react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { matchSorter } from "match-sorter";
import { congNhanService, khuCongNghiepService, congTyService } from "../../../services";
import { history } from "../../../helpers";
import { Loading } from "src/components/Loading/loading";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import SelectTr from "src/components/Controls/SelectTr";

const getGioiTinh = (status) => {
  switch (status) {
    case 1:
      return "Nam";
    case 0:
      return "Nữ";
    default:
      return status;
  }
};

const getbluezone = (value) => {
  switch (value) {
    case 1:
      return "Đã cài";
    case 0:
      return "Chưa";
    default:
      return "Chưa";
  }
}

const getVacxin = (value) => {
  switch (value) {
    case 1:
      return "Đã tiêm";
    case 0:
      return "Chưa";
    default:
      return "Chưa";
  }
}

function DanhSachCongNhanPage() {
  let user = JSON.parse(localStorage.getItem("user"));
  let _congTy = 0;
  let _khuCN = 0;

  const [rows, setRows] = useState([]);
  const [khuCN, setKhuCN] = useState(_khuCN);
  const [congTy, setCongTy] = useState(_congTy);
  const [loading, setLoading] = useState(false);
  // const [dmKCN, setDmKCN] = useState([]);
  const [dmKCNmap, setDmKCNmap] = useState([]);
  // const [dmCongTy, setDmCongTy] = useState([]);
  const [dmCongTymap, setDmCongTymap] = useState([]);
  const [ctyhientai, setctyhientai] = useState('')
  const [khucnHientai, setkhucnHientai] = useState('')

  useEffect(() => {
    if (dmCongTymap.length > 0) {
      setctyhientai(dmCongTymap.find(item => item.value === congTy));
    }

  }, [congTy, dmCongTymap])
  useEffect(() => {
    if (dmKCNmap.length > 0) {
      setkhucnHientai(dmKCNmap.find(item => item.value === khuCN));
    }

  }, [khuCN, dmKCNmap])
  const loadData = () => {
    if (!loading) {
      setLoading(true);
      congNhanService
        .getDsCongNhanInCongTy(congTy, khuCN)
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

  function handleBtnExportClick() {
    // constant
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    // export
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, 'Danh sách công nhân' + fileExtension);
  }
  function loadDsKCN(ma_khu_cong_nghiep) {
    khuCongNghiepService.getKhuCongNghiep(ma_khu_cong_nghiep).then((res) => {
      if (res.success && res.data != null) {

        var dmkcmmap = res.data.map(item => {
          return {
            value: item.ma_khu_cong_nghiep,
            label: item.ten_khu_cong_nghiep
          }
        })
        dmkcmmap.unshift({ value: 0, label: 'Tất cả' });
        setDmKCNmap(dmkcmmap);
        // setDmKCN(res.data);
      }
    });
  }
  function loadCongTyInKCN(paraKhuCN, paraCongTy) {
    congTyService.getDanhSachCongTyInKCN(paraKhuCN, paraCongTy).then((res) => {
      if (res.success && res.data != null) {
        var dmctymmap = res.data.map(item => {
          return {
            value: item.ma_cong_ty,
            label: item.ten_cong_ty
          }
        })
        dmctymmap.unshift({ value: 0, label: 'Tất cả' });
        setDmCongTymap(dmctymmap);
        // setDmCongTy(res.data);
      }
    });
  }
  useEffect(() => {
    async function loadInitKhuCN() {
      await setKhuCN(user.ma_kcn);
      await setCongTy(user.ma_cong_ty);
      await loadDsKCN(user.ma_kcn);
      await loadCongTyInKCN(user.ma_kcn, user.ma_cong_ty);
    }
    loadInitKhuCN();
  }, []);

  function handleChangeKCN(e) {
    // setKhuCN(e.target.value);
    // loadCongTyInKCN(khuCN, 0);
    setKhuCN(e.value);
    loadCongTyInKCN(e.value, 0);
  }

  function handleChangeCongTy(e) {
    // setCongTy(e.target.value);
    setCongTy(e.value);
  }

  function handleBtnSearchClick() {
    loadData();
  }

  function handleShowRowClick(id) {
    // console.log(data);
    history.push('/cap-nhat-to-khai-cong-nhan/' + id);
  }

  const handelDeleteRow = async (id) => {
    if (window.confirm('Bạn có muốn xóa ?')) {
      let res = await congNhanService.deleteCongNhanTheoID(id);
      loadData();
    } else {
      return false;
    }
  }

  return (
    <div>
      {loading ? (<Loading />) : (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader><b>DANH SÁCH CÔNG NHÂN</b></CCardHeader>
              <CCardBody>
                <CFormGroup row className="my-0 justify-content-md-center">
                  <CCol lg="3" xs="12">
                    <CFormGroup>
                      <SelectTr
                        nameselect="khu-cong-nghiep"
                        labelSelect="Khu công nghiệp"
                        dataOptions={dmKCNmap}
                        setValueDefault={khucnHientai}
                        handelOnChange={handleChangeKCN}
                        placeholder="Chọn . . ."
                      />
                      {/* <CLabel htmlFor="postal-code">Khu công nghiêp</CLabel>
                      <CSelect
                        custom
                        name="khu-cong-nghiep"
                        id="khu-cong-nghiep"
                        onChange={handleChangeKCN}
                        defaultValue={khuCN}
                      >
                        {(user.ma_kcn == null || user.ma_kcn === undefined || user.ma_kcn === 0) &&
                          <option key="0" value={0}>
                            Tất cả
                          </option>
                        }

                        {dmKCN.map((item) => (
                          <option key={item.ma_khu_cong_nghiep} value={item.ma_khu_cong_nghiep}>
                            {item.ten_khu_cong_nghiep}
                          </option>
                        ))}
                      </CSelect> */}
                    </CFormGroup>
                  </CCol>
                  <CCol lg="3" xs="12">
                    <CFormGroup>
                      <SelectTr
                        nameselect="cong_ty"
                        labelSelect="Công ty"
                        dataOptions={dmCongTymap}
                        setValueDefault={ctyhientai}
                        handelOnChange={handleChangeCongTy}
                        placeholder="Chọn . . ."
                      />
                      {/* <CLabel htmlFor="postal-code">Công ty</CLabel>
                      <CSelect
                        custom
                        name="cong-ty"
                        id="cong-ty"
                        onChange={handleChangeCongTy}
                        defaultValue={congTy}
                      >
                        {(user.ma_cong_ty == null || user.ma_cong_ty === undefined || user.ma_cong_ty === 0) &&
                          <option key="0" value={0}>
                            Tất cả
                          </option>
                        }
                        {dmCongTy.map((item) => (
                          <option key={item.ma_cong_ty} value={item.ma_cong_ty}>
                            {item.ten_cong_ty}
                          </option>
                        ))}
                      </CSelect> */}
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
                        onClick={handleBtnSearchClick}
                      >
                        <CIcon name="cil-magnifying-glass" /> Tìm kiếm
                      </CButton>
                      {" "}
                      <CButton
                        type="button"
                        size="sm"
                        color="info"
                        onClick={handleBtnExportClick}
                      >
                        <CIcon name="cil-print" /> Xuất báo cáo
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
                        Header: "Họ tên",
                        id: "ten-cong-nhan",
                        accessor: (c) => c.ten_cong_nhan,
                        width: 200,
                        filterMethod: (filter, rows) =>
                          matchSorter(rows, filter.value, { keys: ["ten-cong-nhan"] }),
                        filterAll: true,
                        // Cell: ({value}) => (
                        //   <span onClick={() => handleShowRowClick(value)}>
                        //     {value}
                        //   </span>
                        // )
                      },
                      {
                        Header: "Giới tính",
                        id: "gioi-tinh",
                        accessor: (c) => c.gioi_tinh,
                        width: 70,
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
                        Header: "Mã công nhân",
                        id: "so_the",
                        accessor: (c) => c.so_the,
                        width: 150,
                        filterMethod: (filter, rows) =>
                          matchSorter(rows, filter.value, {
                            keys: ["cmnd"],
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
                        Header: "CMND/CCCD",
                        id: "cmnd",
                        accessor: (c) => c.cmnd,
                        width: 150,
                        filterMethod: (filter, rows) =>
                          matchSorter(rows, filter.value, {
                            keys: ["cmnd"],
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
                        Header: "Số điện thoại",
                        id: "so-dien-thoai",
                        width: 150,
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
                        Header: "Số nhà",
                        id: "so_nha_tam_tru",
                        accessor: (c) => c.so_nha_tam_tru,
                        Cell: ({ value }) => (
                          <span
                            style={{
                              display: "block",
                              width: "100%",
                              textAlign: "left",
                            }}
                          >
                            {value}
                          </span>
                        ),
                      },
                      {
                        Header: "Xã",
                        id: "ten_xa",
                        accessor: (c) => c.ten_xa,
                        Cell: ({ value }) => (
                          <span
                            style={{
                              display: "block",
                              width: "100%",
                              textAlign: "left",
                            }}
                          >
                            {value}
                          </span>
                        ),
                      },
                      {
                        Header: "quận, huyện, thị xã",
                        id: "ten_huyen",
                        accessor: (c) => c.ten_huyen,
                        Cell: ({ value }) => (
                          <span
                            style={{
                              display: "block",
                              width: "100%",
                              textAlign: "left",
                            }}
                          >
                            {value}
                          </span>
                        ),
                      },
                      {
                        Header: "Tỉnh/TP",
                        id: "ten_tinh",
                        accessor: (c) => c.ten_tinh,
                        Cell: ({ value }) => (
                          <span
                            style={{
                              display: "block",
                              width: "100%",
                              textAlign: "left",
                            }}
                          >
                            {value}
                          </span>
                        ),
                      },
                      {
                        Header: "Bộ phận",
                        id: "ten_bo_phan",
                        accessor: (c) => c.ten_bo_phan,
                        Cell: ({ value }) => (
                          <span
                            style={{
                              display: "block",
                              width: "100%",
                              textAlign: "left",
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
                        Cell: ({ value }) => (
                          <span
                            style={{
                              display: "block",
                              width: "100%",
                              textAlign: "left",
                            }}
                          >
                            {value}
                          </span>
                        ),
                      },
                      {
                        Header: "Khu Công Nghiệp",
                        id: "khu-cong-nghiep",
                        accessor: (c) => c.ten_khu_cong_nghiep,
                        width: 150,
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
                        Header: "Đã cài bluezone",
                        id: "is_bluezone",
                        accessor: (c) => c.is_bluezone,
                        width: 150,
                        Cell: ({ value }) => (
                          <span
                            style={{
                              display: "block",
                              width: "100%",
                              textAlign: "center",
                            }}
                          >
                            {getbluezone(value)}
                          </span>
                        ),
                      },
                      {
                        Header: "Đã tiêm vacxin",
                        id: "is_vacxin",
                        accessor: (c) => c.is_vacxin,
                        width: 150,
                        Cell: ({ value }) => (
                          <span
                            style={{
                              display: "block",
                              width: "100%",
                              textAlign: "center",
                            }}
                          >
                            {getVacxin(value)}
                          </span>
                        ),
                      },
                      {
                        Header: "Acctions",
                        filterable: false,
                        accessor: "id",
                        Cell: (props) => (
                          <div style={{ textAlign: "center" }}>
                            <CButton
                              color="danger"
                              onClick={() => handelDeleteRow(props.original.ma_cong_nhan)}
                            >
                              <CIcon size="lg" name="cil-delete" />
                            </CButton>
                            {"  "}
                            <CButton
                              color="warning"
                              onClick={() => handleShowRowClick(props.original.ma_cong_nhan)}
                            >
                              <CIcon size="lg" name="cil-brush" />
                            </CButton>
                          </div>
                        ),
                      },
                      // {
                      //   Header: "Truy vết",
                      //   filterable: false,
                      //   accessor: "id",
                      //   width:150,
                      //   Cell: (props) => (
                      //     <div style={{ textAlign: "center" }}>
                      //       <CButton
                      //         color="danger"
                      //       >
                      //         <CIcon size="lg" name="cil-delete" />
                      //       </CButton>
                      //       {"  "}
                      //       <CButton
                      //         color="warning"
                      //         onClick={() => handleShowRowClick(props.value)}
                      //       >
                      //         <CIcon size="lg" name="cil-brush" />
                      //       </CButton>
                      //     </div>
                      //   ),
                      // },
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

export default DanhSachCongNhanPage;
