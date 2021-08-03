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
    // DateTimePickerInput
} from "@coreui/react";
import CIcon from '@coreui/icons-react';
import ReactTable from "react-table-v6";
// import DateTimePickerInput from 'coreui/lib/components/DateTimePickerInput';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import "react-table-v6/react-table.css";
import { Loading } from "src/components/Loading/loading";
import { columns } from "./ObjectColumns";
import { theoDoiCachLyService  } from "src/services/theoDoiCachLy.service";
import MauKhaiBaoDiemPhongToa from '../Common/FormDeclarationCovidAddress'
import { matchSorter } from "match-sorter";

function KhaiBaoDiemCovid() {
    const [idRow, setIdRow] = useState(0)
    let user = JSON.parse(localStorage.getItem("user"));
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openPopupDeclaration, setOpenPopupDeclaration] = useState(false);
    const loadData = () => {
        setLoading(true)
        theoDoiCachLyService.DanhsachDiemPhongToaCovid()
            .then((res) => {
                if (res.success && res.data) {
                    setRows(res.data);
                } else {
                    setRows([]);
                }
                setLoading(false);
            }).catch(error => {
                setLoading(false);
                console.log(error);
            });

    };
    const [row, setRow] = useState({})
    const [trangthai, setTrangThai] = useState(1)
    useEffect(() => {
        loadData();
    }, [openPopupDeclaration]);

    function handleAddClick() {
        setIdRow(0)
        setOpenPopupDeclaration(true)
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
        FileSaver.saveAs(data, 'Thống kê lượt vận tải' + fileExtension);
    }

    const styleValueActions = (value) => {
        return (
            <div style={{ textAlign: "center" }}>
                {/* <CButton
                    color="danger"
                // onClick={() => handelDeleteRow(props.original)}
                >
                    <CIcon size="lg" name="cil-delete" />
                </CButton> */}
                {"  "}
                <CButton
                    color="warning"
                    onClick={(e) => handleShowRowClick(value)}
                >
                    <CIcon size="lg" name="cil-brush" />
                </CButton>
            </div>
        )
    }


    const styleValue = (value) => {
        return (
            <div style={{
                display: "block",
                width: "100%",
                textAlign: "center",
            }}>
                <span>{value}</span>
            </div>)
    }

    function handleShowRowClick(row) {
        setIdRow(row.id);
        setRow(row);
        setOpenPopupDeclaration(true);
        
        // console.log(id);
        // dispatch({ type: commonConstants.SET_OPEN_POPUP, setOpenPopup: id });
        // history.push("/xac-nhan-thong-tin-to-khai/" + id);
    }

    async function handleChangeTrangThai(e){
        setTrangThai(e.target.value)
        let tem = await theoDoiCachLyService.getDiemCovidTheoTrangThai(e.target.value);
        // console.log(tem);
        setRows(tem.data)
    }

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>
                        DANH SÁCH ĐIỂM PHONG TỎA COVID
                    </CCardHeader>
                    <CCardBody>
                        <CFormGroup row className="my-0">
                            <CCol lg="3" xs="6">
                                <CFormGroup>
                                    <CLabel htmlFor="postal-code">Trạng thái</CLabel>
                                    <CSelect
                                        custom
                                        name="select"
                                        id="select"
                                        onChange={handleChangeTrangThai}
                                        defaultValue={trangthai}
                                    >
                                        <option value="1">Vùng Covid</option>
                                        <option value="2">Vùng an toàn</option>
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                        
                            <CCol className="text-right">
                                <CFormGroup>
                                    <CButton
                                        type="button"
                                        size="sm"
                                        color="success"
                                        onClick={handleAddClick}
                                    >
                                        {/* <CIcon name="cil-magnifying-glass" />  */}
                                        Thêm mới
                                    </CButton>
                                    
                                    {" "}
                                    <CButton
                                        type="button"
                                        size="sm"
                                        color="info"
                                        onClick={handleBtnExportClick}
                                    >
                                        {/* <CIcon name="cil-magnifying-glass" />  */}
                                        Xuất danh sách
                                    </CButton>
                                </CFormGroup>
                            </CCol>
                        </CFormGroup>
                        {/* KÊT THÚC TÌM KIẾM */}
                        <hr className="mt-0" />
                        {loading && <Loading />}
                        {rows && <ReactTable
                            data={rows}
                            previousText="Previous"
                            nextText="Next"
                            loadingText="Loading..."
                            noDataText="Không có dữ liệu"
                            pageText="Trang"
                            ofText="của"
                            rowsText="dòng"
                            filterable
                            viewIndex
                            defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
                            columns={
                                [
                                    {
                                        Header: "Điểm phong tỏa",
                                        id: "dia_diem_phong_toa",
                                        accessor: (c) => c.dia_diem_phong_toa,
                                        filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, { keys: ["dia_diem_phong_toa"] }),
                                        filterAll: true,
                                        //width: 300,
                                        Cell: ({ value }) => styleValue(value)
                                    },
                                    {
                                        Header: "Phưỡng xã",
                                        id: "phuong-xa",
                                        accessor: (c) => c.ten_xa,
                                        filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, { keys: ["phuong-xa"] }),
                                        filterAll: true,
                                        // width: 200,
                                        Cell: ({ value }) => styleValue(value)
                                    },
                                    {
                                        Header: "Quận huyện",
                                        id: "quan-huyen",
                                        accessor: (c) => c.ten_huyen,
                                        filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, { keys: ["quan-huyen"] }),
                                        filterAll: true,
                                        Cell: ({ value }) => styleValue(value)
                                    },
                                    {
                                        Header: "Tỉnh, TP",
                                        id: "tinh-tp",
                                        accessor: (c) => c.ten_tinh,
                                        filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, { keys: ["tinh-tp"] }),
                                        filterAll: true,
                                        Cell: ({ value }) => styleValue(value)
                                    },
                                    {
                                        Header: "Trạng thái",
                                        id: "trang-thai",
                                        accessor: (c) => c.ten_trang_thai,
                                        filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, { keys: ["trang-thai"] }),
                                        filterAll: true,
                                        Cell: ({ value }) => styleValue(value)
                                    },
                                    {
                                        Header: "Actions",
                                        filterable: false,
                                        id: "actions",
                                        accessor: (c) => c,
                                        filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, {
                                                keys: ["actions"],
                                            }),
                                        filterAll: true,
                                        Cell: ({ value }) => styleValueActions(value)
                                    }
                                ]
                            }
                            defaultPageSize={10}
                            className="-striped -highlight"
                        />}
                        {openPopupDeclaration && <MauKhaiBaoDiemPhongToa
                            propShow={openPopupDeclaration}
                            propOnClose={() => setOpenPopupDeclaration(!openPopupDeclaration)}
                            keyForEdit={idRow}
                            row = {row}
                        />}
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}
export default KhaiBaoDiemCovid;
