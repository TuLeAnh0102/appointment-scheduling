import React, { useEffect, useState, useRef } from "react";
import {
    CCard,
    CRow,
    CButton,
    CCardBody,
    CForm,
    CCol,
    CFormGroup,
    CCardHeader
} from "@coreui/react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { history } from "src/helpers";
import { VanTaiService } from '../../../services/vantai.service';
import { matchSorter } from "match-sorter";
import CIcon from '@coreui/icons-react';
import DiemKiemTra from "./ChotKiemTra";
import { Loading } from "src/components/Loading/loading";


export default function DanhSachDiemKiemTra() {
    const [isLoading, setLoading] = useState(0);
    const [row, setRow] = useState({});
    const [rows, setRows] = useState([]);
    const [openPopupPartial, setOpenPopupPartial] = useState(false);
    const [ma_chot, setMaChot] = useState(0);
    const loadData = () => {
            setLoading(1);
            VanTaiService
                .getDanhSachDiemKiemTra()
                .then((res) => {
                    if (res.success && res.data) {
                        setRows(res.data);
                    } else {

                        alert("Không có dữ liệu");
                    }
                    setLoading(0);
                });
    };


    useEffect(() => {
        loadData();
    }, [openPopupPartial]);

    function handleShowRowClick(row) {
        setRow(row);
        setMaChot(row.ma_diem_den);
        setOpenPopupPartial(true);
    }

    const handelDeleteRow = (row) => {
        console.log(row);
        if (window.confirm('Bạn có muốn xóa điểm kiểm tra ' + row.so_nha_den +'?')) {
            console.log(row.ma_chot);
            VanTaiService.XoaDiemKiemTra(row.ma_chot).then(res => {
                console.log(res);
                if(res.id === 1){
                    alert(res.message);
                    loadData();
                }
            })
        } else {
            return false;
        }
    }

    const styleValue = value => {
        return(
            <div style={{textAlign: 'center'}}>{value}</div>
        )
    }

    const handleBtnAddClick = () => {
        setOpenPopupPartial(true)
    }

    return (
        <div>
            {isLoading ? <Loading/> : (
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>DANH SÁCH ĐIỂM KIỂM TRA GIAO/NHẬN HÀNG HÓA</CCardHeader>
                            <CCardBody>
                                <CFormGroup row className="my-0">
                                    <CCol md={{ span: 3, offset: 9 }} xs={{ span: 4, offset: 8 }}>
                                        <CFormGroup>
                                            <CButton
                                                type="button"
                                                size="sm"
                                                color="success"
                                                onClick={handleBtnAddClick}
                                            >
                                                Thêm mới
                                            </CButton>
                                        </CFormGroup>
                                    </CCol>
                                </CFormGroup>
                                <hr className="mt-0" />

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
                                                Header: "Tên chợ",
                                                id: "ten-cho",
                                                accessor: (c) => c.ten_diem_den,
                                                filterMethod: (filter, rows) =>
                                                    matchSorter(rows, filter.value, { keys: ["ten-cho"] }),
                                                filterAll: true,
                                                Cell: ({ value }) => styleValue(value)
                                            },

                                            {
                                                Header: "Acctions",
                                                filterable: false,
                                                accessor: "id",
                                                Cell: (props) => (
                                                    <div style={{ textAlign: "center" }}>

                                                        {/* <CButton
                                                            color="success"
                                                            onClick={() => handleBtnAddClick()}
                                                        >

                                                            <CIcon size="lg" name='cil-plus'/>
                                                        </CButton>
                                                        {"  "} */}
                                                        <CButton
                                                            color="warning"
                                                            onClick={() => handleShowRowClick(props.original)}
                                                        >
                                                            <CIcon size="lg" name="cil-brush" />
                                                        </CButton>
                                                        {"  "}
                                                        <CButton
                                                            color="danger"
                                                            onClick={() => handelDeleteRow(props.original)}
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
                                <DiemKiemTra
                                    row={row}
                                    propShow={openPopupPartial}
                                    propOnClose={() => setOpenPopupPartial(!openPopupPartial)}
                                    keyForEdit={ma_chot}
                                ></DiemKiemTra>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            )}
        </div>

);
}

