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
import { cauhinhhethongService, congNhanService, khuCongNghiepService, congTyService } from "../../../services";
// import { history } from "../../../helpers";
import { Loading } from "src/components/Loading/loading";
// import * as FileSaver from 'file-saver';
// import * as XLSX from 'xlsx';
// import SelectTr from "src/components/Controls/SelectTr";
import ModalInsert from '../../../components/CauHinhHeThong/ModalInsert'
import ModalSettings from "src/components/CauHinhHeThong/ModalSettings";
import {MdDelete, MdModeEdit, MdSettings} from 'react-icons/md'

// const getGioiTinh = (status) => {
//   switch (status) {
//     case 1:
//       return "Nam";
//     case 0:
//       return "Nữ";
//     default:
//       return status;
//   }
// };

// const getbluezone = (value) => {
//   switch (value) {
//     case 1:
//       return "Đã cài";
//     case 0:
//       return "Chưa";
//     default:
//       return "Chưa";
//   }
// }

// const getVacxin = (value) => {
//   switch (value) {
//     case 1:
//       return "Đã tiêm";
//     case 0:
//       return "Chưa";
//     default:
//       return "Chưa";
//   }
// }

function DanhSachCongNhanPage() {
  // let user = JSON.parse(localStorage.getItem("user"));
  // let _congTy = 0;
  // let _khuCN = 0;
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //state
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setisOpenModal] = useState(false);
  const [isOpenModalSetting, setisOpenModalSetting] = useState(false)
  const [loaiTaiKhoan, setloaiTaiKhoan] = useState([]);
  const [rows, setRows] = useState([
    {
      id_nhom_quyen: 1,
      ten_nhom_quyen:"GTVT",
      id_loai_tai_khoan: 1,
      ten_loai_tai_khoan:'Y Tế'
    }
  ]);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //function
  const handleSettingClick=() =>{
    // setisOpenModal(!isOpenModal)
    setisOpenModalSetting(!isOpenModalSetting)
  }
  // const [khuCN, setKhuCN] = useState(_khuCN);
  // const [congTy, setCongTy] = useState(_congTy);

  // // const [dmKCN, setDmKCN] = useState([]);
  // const [dmKCNmap, setDmKCNmap] = useState([]);
  // // const [dmCongTy, setDmCongTy] = useState([]);
  // const [dmCongTymap, setDmCongTymap] = useState([]);
  // const [ctyhientai, setctyhientai] = useState('')
  // const [khucnHientai, setkhucnHientai] = useState('');

 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    cauhinhhethongService.getLoaiTaiKhoan().then((res) => {
      if (res.success && res.data != null) {
        setloaiTaiKhoan(res.data);
      }
    });
  }, [])
  // useEffect(() => {
  //   if(dmCongTymap.length>0)
  //   { 
  //     setctyhientai(dmCongTymap.find(item => item.value === congTy));
  //   }
    
  // }, [congTy,dmCongTymap])
  // useEffect(() => {
  //   if(dmKCNmap.length>0)
  //   { 
  //     setkhucnHientai(dmKCNmap.find(item => item.value === khuCN));
  //   }
    
  // }, [khuCN,dmKCNmap])
  // const loadData = () => {
  //   if (!loading) {
  //     setLoading(true);
  //     congNhanService
  //       .getDsCongNhanInCongTy(congTy, khuCN)
  //       .then((res) => {
  //         if (res.success && res.data != null) {
  //           setRows(res.data);
  //           setLoading(false);
  //         } else {
  //           setLoading(false);
  //           alert("Không có dữ liệu");
  //         }
  //       });
  //   }
  // };

  // function handleBtnExportClick() {
  //   // constant
  //   const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  //   const fileExtension = '.xlsx';

  //   // export
  //   const ws = XLSX.utils.json_to_sheet(rows);
  //   const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
  //   const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  //   const data = new Blob([excelBuffer], { type: fileType });
  //   FileSaver.saveAs(data, 'Danh sách công nhân' + fileExtension);
  // }
  // function loadDsKCN(ma_khu_cong_nghiep) {
  //   khuCongNghiepService.getKhuCongNghiep(ma_khu_cong_nghiep).then((res) => {
  //     if (res.success && res.data != null) {

  //       var dmkcmmap = res.data.map(item => {
  //         return {
  //           value: item.ma_khu_cong_nghiep,
  //           label: item.ten_khu_cong_nghiep
  //         }
  //       })
  //       dmkcmmap.unshift({ value: 0, label: 'Tất cả' });
  //       setDmKCNmap(dmkcmmap);
  //       // setDmKCN(res.data);
  //     }
  //   });
  // }
  // function loadCongTyInKCN(paraKhuCN, paraCongTy) {
  //   congTyService.getDanhSachCongTyInKCN(paraKhuCN, paraCongTy).then((res) => {
  //     if (res.success && res.data != null) {
  //       var dmctymmap = res.data.map(item => {
  //         return {
  //           value: item.ma_cong_ty,
  //           label: item.ten_cong_ty
  //         }
  //       })
  //       dmctymmap.unshift({ value: 0, label: 'Tất cả' });
  //       setDmCongTymap(dmctymmap);
  //       // setDmCongTy(res.data);
  //     }
  //   });
  // }
  // useEffect(() => {
  //   async function loadInitKhuCN() {
  //     await setKhuCN(user.ma_kcn);
  //     await setCongTy(user.ma_cong_ty);
  //     await loadDsKCN(user.ma_kcn);
  //     await loadCongTyInKCN(user.ma_kcn, user.ma_cong_ty);
  //   }
  //   loadInitKhuCN();
  // }, []);

  // function handleChangeKCN(e) {
  //   // setKhuCN(e.target.value);
  //   // loadCongTyInKCN(khuCN, 0);
  //   setKhuCN(e.value);
  //   loadCongTyInKCN(e.value, 0);
  // }

  // function handleChangeCongTy(e) {
  //   // setCongTy(e.target.value);
  //   setCongTy(e.value);
  // }

  // function handleBtnSearchClick() {
  //   // loadData();
  // }

  // function handleShowRowClick(id) {
  //   // console.log(data);
  //   history.push('/cap-nhat-to-khai-cong-nhan/' + id);
  // }

  // const handelDeleteRow = async (id) => {
  //   if (window.confirm('Bạn có muốn xóa ?')) {
  //     let res = await congNhanService.deleteCongNhanTheoID(id);
  //     loadData();
  //   } else {
  //     return false;
  //   }
  // }

  return (
    <div>
      {loading ? (<Loading />) : (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader><b>CẤU HÌNH HỆ THỐNG</b></CCardHeader>
              <CCardBody>
                <CFormGroup row className="my-0">
                  <CCol >
                    <CFormGroup>
                      <CButton
                        type="button"
                        size="sm"
                        color="success"
                        onClick={() => alert("Chức năng đang phát triển")}
                      >
                        <CIcon name="cil-Pencil" /> Thêm mới
                      </CButton>
                      <ModalInsert
                        isOpen={isOpenModal}
                        dataOptions={loaiTaiKhoan}
                      />
                      <ModalSettings
                        isOpen={isOpenModalSetting}
                        dataOptions={loaiTaiKhoan}
                      />
                      {/* <CButton
                        type="button"
                        size="sm"
                        color="info"
                        onClick={handleBtnExportClick}
                      >
                        <CIcon name="cil-print" /> Xuất báo cáo
                      </CButton> */}
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                <hr className="mt-0" />
                {loading && <em>Loading users...</em>}
                {rows && (
                  <ReactTable
                  style={{fontWeight: 'bold'}}
                    data={rows}
                    previousText="Trở về trang trước"
                    nextText="Trang kế tiếp"
                    loadingText="Loading..."
                    noDataText="Không có dữ liệu"
                    pageText="Trang"
                    ofText="của"
                    rowsText="dòng"
                    filterable
                    defaultFilterMethod={(filter, row) =>
                      String(row[filter.id]) === filter.value
                    }
                    columns={[
                      {
                        Header: () => <div style ={{backgroundColor: '#04AA6D', color: '#ffffff', fontWeight: 'bold', padding: '5px'}}> Số thứ tự</div>,
                        id: "ten-cong-nhan",
                        accessor: (c) => c.ten_cong_nhan,
                        width: 100,
                        filterMethod: (filter, rows) =>
                          matchSorter(rows, filter.value, { keys: ["ten-cong-nhan"] }),
                        filterAll: true,
                        
                      },
                
                      {
                        Header: () => <div style ={{backgroundColor: '#04AA6D', color: '#ffffff', fontWeight: 'bold',padding: '5px'}}> Tên nhóm quyền</div>,
                        id: "ten-nhom-quyen",
    
                        accessor: (c) => c.ten_nhom_quyen,
                        filterMethod: (filter, rows) =>
                          matchSorter(rows, filter.value, {
                            keys: ["ten-nhom-quyen"],
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
                        Header: () => <div style ={{backgroundColor: '#04AA6D', color: '#ffffff', fontWeight: 'bold',padding: '5px'}}> Tên nhóm quyền</div>,
                        id: "ten_loai_tai_khoan",
    
                        accessor: (c) => c.ten_loai_tai_khoan,
                        filterMethod: (filter, rows) =>
                          matchSorter(rows, filter.value, {
                            keys: ["ten_loai_tai_khoan"],
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
                        Header: <div style ={{backgroundColor: '#04AA6D', color: '#ffffff', fontWeight: 'bold',padding: '5px'}}> Chức năng</div>,
                        filterable: false,
                        accessor: "id",
                        Cell: (props) => (
                          <div style={{ textAlign: "center" }}>
                            <CButton
                              color="danger"
                              onClick={() => alert("Chức năng đang phát triển")}
                            >
                              <MdDelete
                              />
                            </CButton>
                            {"  "}
                            <CButton
                              style={{backgroundColor:"#00b300", color: 'white'}}
                              color="#33cc33"
                              onClick={() => alert("Chức năng đang phát triển")}
                            >
                              
                              <MdModeEdit/>
                            </CButton>
                            {"  "}
                            <CButton
                              style={{backgroundColor:"#669999", color: 'white'}}
                              color="#33cc33"
                              onClick={handleSettingClick}
                            >
                              
                              <MdSettings/>
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

export default DanhSachCongNhanPage;
