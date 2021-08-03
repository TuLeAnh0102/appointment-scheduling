import TableCommon from "../../Common/Table/table";
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
import ReactTable from "react-table-v6";
// import DateTimePickerInput from 'coreui/lib/components/DateTimePickerInput';
import DateTime from 'react-datetime';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import CIcon from "@coreui/icons-react";
import "react-table-v6/react-table.css";
import { Loading } from "../../../../components/Loading/loading.jsx";
import moment from "moment";
import { columns } from "./ObjectColumns";
import { reportService } from "src/services/reports.service";
import { listChot } from 'src/datamock/commonData';

const FORMAT_DATETIME = 'yyyy-MM-DD HH:mm:ss';


function ThongKeSoLuongPT() {
    let user = JSON.parse(localStorage.getItem("user"));
    const [rows, setRows] = useState([]);
    let currentDay = new Date();
    const [startDate, setStartDate] = useState(moment(currentDay).add(-1, 'day'));
    const [endDate, setEndDate] = useState(currentDay);
    const [chotDichTe, setchotDichTe] = useState(user.ma_chot);
    const [loading, setLoading] = useState(false);
    const [loaiPhuongTien, setLoaiPhuongTien] = useState("0");

    const loadData = () => {
        setLoading(true)
        reportService.thongkesoluongpt(chotDichTe, moment(startDate).format(FORMAT_DATETIME), moment(endDate).format(FORMAT_DATETIME), loaiPhuongTien)
                .then((res) => {
                    if (res.success && res.data) {
                        setRows(res.data);
                        setLoading(false);
                        //console.log(res.data);
                    } else {
                        setLoading(false);
                        setRows([]);
                    }
                }).catch(error => {
                    setLoading(false);
                    console.log(error);
                });
        
    };

    useEffect(() => {
        loadData();
    }, []);

    function handleChangeChotDichTe(e) {
        setchotDichTe(e.target.value);
    }

    function handleBtnSearchClick() {
        loadData();
    }

    function handleChangeLoaiPhuongTien(e) {
        setLoaiPhuongTien(e.target.value)
    }

    function handleChangeStartDate(date) {
        setStartDate(date);
    }

    function handleChangeEndDate(date) {
        setEndDate(date);
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

    return (
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>
                        THÔNG KÊ SỐ LƯỢNG PT
                    </CCardHeader>
                    <CCardBody>

                        {/* TÌM KIẾM */}
                        <CFormGroup row className="my-0">
                            <CCol lg="3" xs="12">
                                <CFormGroup>
                                    <CLabel htmlFor="chot">Chốt</CLabel>
                                    <CSelect custom name="chot" id="select" value={chotDichTe} onChange={handleChangeChotDichTe}>
                                        {
                                            listChot().map(item => {
                                                return (
                                                    <option value={item.id}>Chốt {item.title}</option>
                                                )
                                            })
                                        }
                                        {/* <option value="0">Tất cả</option>
                                        <option value="1">Chốt Phú Sơn, Bù Đăng</option>
                                        <option value="2">Chốt Tân Lập, Đồng Phú</option>
                                        <option value="3">Chốt Thành Tâm, Chơn Thành</option> */}
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                            <CCol lg="3" xs="12">
                                <CFormGroup>
                                    <CLabel htmlFor="loai-phuong-tien">Loại phương tiện</CLabel>
                                    <CSelect custom name="loai-phuong-tien" id="select" onChange={handleChangeLoaiPhuongTien}>
                                        <option value="0">Tất cả</option>
                                        <option value="Xe_May">Xe máy</option>
                                        <option value="Xe_oto">Xe otô</option>
                                        <option value="Xe_Tai">Xe tải</option>
                                        <option value="Xe_Khach">Xe khách</option>
                                        <option value="Xe_Dap">Xe đạp</option>
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
                            <CCol md={{ span: 2, offset: 10 }} xs={{ span: 4, offset: 8 }}>
                                <CFormGroup>
                                    <CButton
                                        type="button"
                                        size="sm"
                                        color="success"
                                        onClick={handleBtnSearchClick}
                                    >
                                        <CIcon name="cil-magnifying-glass" /> Tìm kiếm
                                    </CButton>
                                    {"  "}
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
                            columns={columns}
                            defaultPageSize={10}
                            className="-striped -highlight"
                        />}
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}

export default ThongKeSoLuongPT;
