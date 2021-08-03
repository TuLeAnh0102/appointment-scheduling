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
    CInput
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

function ThongKeTaiXeQuaChot() {
    let user = JSON.parse(localStorage.getItem("user"));
    const [rows, setRows] = useState([]);
    const [chotDichTe, setchotDichTe] = useState(user.ma_chot);
    const [loading, setLoading] = useState(false);
    const [dsSDT, setDSSDT] = useState('');
    const loadData = () => {
        // setLoading(true)
        if (!loading) {
            let param = dsSDT.replace(/\s/g, '')
            console.log(dsSDT.replace(/\s/g, ''));
            reportService.ThongKeTaiXeQuaChot(param).then(res => {
                console.log(res);
                setRows(res.data)
            })
        }
    };

    useEffect(() => {
        loadData();
        console.log(moment().format());
    }, []);

    function handleBtnSearchClick() {
        loadData();
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

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>
                        THÔNG KÊ TÀI XẾ QUA CHỐT
                    </CCardHeader>
                    <CCardBody>
                        
                        <CFormGroup row className="my-0">
                            <CCol lg="8" xs="12">
                                <CLabel > Danh sách số điện thoại: </CLabel>
                                <CInput type="text" placeholder="danh sách số điện thoại" onChange={e => setDSSDT(e.target.value)} value={dsSDT} />
                            </CCol>
                            
                            <CCol lg="4" xs="12" style={{ paddingTop: '10px' }}>
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
                        {loading && <Loading />}
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

export default ThongKeTaiXeQuaChot;
