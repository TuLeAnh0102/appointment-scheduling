import react, {Component} from 'react';
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
import DateTime from 'react-datetime';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { matchSorter } from "match-sorter";

import CIcon from "@coreui/icons-react";
import "react-table-v6/react-table.css";
import { Loading } from "../../../components/Loading/loading";
import moment from "moment";
import { TheoDoiSucKhoeService } from 'src/services/TheoDoiSucKhoe.service';
import { commonService } from 'src/services';
import SelectV1 from "src/components/Controls/SelectV1";
import Select from 'react-select';

const FORMAT_DATETIME = "yyyy-MM-DD HH:mm:ss";
const style = {
    display: "block",
    width: "100%",
    textAlign: "center",
}

const style1 = {
    display: "block",
    width: "100%",
    color: "red",
    fontWeight: "bold"
}
const dsnoi_lay_mau = new Map()
    .set("tc_sot", "Sốt")
    .set("tc_ho", "Ho")
    .set("tc_kho_tho", "Khó thở")
    .set("tc_dau_hong", "Đau họng")
    .set("tc_noi_ban", "Nổi ban")
    .set("tc_non", "Nôn")
    .set("tc_tieu_chay", "Tiêu chảy")
    .set("tc_xuat_huyet", "Xuất huyết")
class TheoDoiSucKhoe extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            rows: [],
            loading: false,
            startDate: moment(new Date()).add(-1, 'day'),
            endDate: new Date(),
            tinh: [],
            huyen: [],
            xa: [],
            optionTinh: {value: 70, label: "Tỉnh Bình Phước"},
            optionHuyen: {value: 0, label: "Tất cả"},
            optionXa: { value: 0, label: "Tất cả"}
        }
    }

    componentDidMount() {
        // this.loadData();
        this.khoiTaoDS();
        this.getTinh();
        this.chonTinhLayHuyen();
    }

    handleData = item => {
        return {
            value: item['id'],
            label: item['title']
        }
    }

    onChangeSelected = (selected, funcChange, defaultSelected ) => {
        if (selected) {
            this.setState({ defaultSelected: selected }, () => {
                funcChange(selected)
            })
        } else {
            funcChange(defaultSelected);
        }
    }

    chonXa = option => {
        if(option){
            this.setState({
                optionXa: option
            }, () => console.log(this.state.optionTinh, this.state.optionHuyen, this.state.optionXa, this.state.startDate, this.state.endDate))
        }
        
    }

    chonHuyenLayXa = (option) => {
        // this.onChangeSelected(option, this.getXa, this.state.optionHuyen);
        // console.log(option);
        if (option) {
            this.setState({ optionHuyen: option }, () => {
                this.getXa(option.value);
            })
        }
    }

    chonTinhLayHuyen = (option) => {
        // this.onChangeSelected(option, this.getHuyen, this.state.optionTinh);
        // console.log(option);
        if(option){
            this.setState({ optionTinh: option}, () => {
                this.getHuyen(option.value)
            })
        }else{
            this.getHuyen(this.state.optionTinh.value);
        }
    }

    getTinh = () => {
        commonService.getDanhMucTinh().then(res => {
            let tem = res.data.map(item => this.handleData(item));
            this.setState({
                tinh: [...tem]
            });
        });
    }

    getHuyen = (tinh) => {
        commonService.getDanhMucHuyen(tinh).then(res => {
            let tem = res.data.map(item => this.handleData(item));
            this.setState({
                huyen: [...tem]
            });
        });
    }

    getXa = (huyen) => {
        commonService.getDanhMucXa(huyen).then(res => {
            let tem = res.data.map(item => this.handleData(item));
            console.log(tem);
            this.setState({
                xa: [...tem]
            });
        });
    }

    tenTC = (tc) => {
        return dsnoi_lay_mau.get(tc) || "";
    }

    showTC = (val) => {
        console.log('dsfsdfdsf', val);
        let listTC = '';
        for (const key in val) {
            if (val.hasOwnProperty.call(val, key)) {
                if(key.indexOf('tc_') != -1 && val[key]){
                    listTC += this.tenTC(key) + " - ";
                }
            }
        }
        return (
            <span>
                {listTC}
            </span>
        )
        
    }

    loadData = (tinh, huyen, xa, tu_ngay, den_ngay) => {
        let self = this;
        TheoDoiSucKhoeService.DanhSachTinhTrangSucKhoe(tinh, huyen, xa, tu_ngay, den_ngay).then(res => {
            self.setState({
                rows: res.data
            })
        })
    }

    handleChangeStartDate = (startDate) => {
        console.log(startDate);
        this.setState({
            startDate: startDate
        })
    }

    handleChangeEndDate = (endDate) => {
        this.setState({
            endDate: endDate
        });
    }

    formatDate(date){
        return moment(date).format(FORMAT_DATETIME)
    }

    handleBtnSearchClick = () => {
        var tinh = 70;
        var huyen = 0;
        var xa = 0;
        var tu_ngay = '';
        var den_ngay = '';
        
        let self = this.state;
        tinh = self.optionTinh.value;
        huyen = self.optionHuyen.value;
        xa = self.optionXa.value;
        tu_ngay = this.formatDate(self.startDate);
        den_ngay = this.formatDate(self.endDate);
        TheoDoiSucKhoeService.DanhSachTinhTrangSucKhoe(tinh, huyen, xa, tu_ngay, den_ngay).then(res => {
            this.setState({
                rows: [...res.data]
            })
        })
    }

    khoiTaoDS = () => {
        let tinh, huyen, xa, tu_ngay, den_ngay;
        let self = this.state;
        tinh = self.optionTinh.value;
        huyen = self.optionHuyen.value;
        xa = self.optionXa.value;
        tu_ngay = this.formatDate(self.startDate);
        den_ngay = this.formatDate(self.endDate);
        this.loadData(tinh, huyen, xa, tu_ngay, den_ngay);
    }

    setValueParams = (tinh, huyen, xa, tu_ngay, den_ngay) => {
        let self = this.state;
        tinh = self.optionTinh.value;
        huyen = self.optionHuyen.value;
        xa = self.optionXa.value;
        tu_ngay = this.formatDate(self.startDate);
        den_ngay = this.formatDate(self.endDate);
    }

    handleBtnExportClick = () => {
        // constant
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';

        // export
        const ws = XLSX.utils.json_to_sheet(this.state.rows);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, 'Thống kê' + fileExtension);
    }


    render() { 
        return ( 
            <div>
                {this.state.loading ? (<Loading />) : (
                    <CRow>
                        <CCol>
                            <CCard>
                                <CCardHeader>DANH SÁCH KHAI BÁO TÌNH TRẠNG SỨC KHỎE</CCardHeader>
                                <CCardBody>
                                    <CFormGroup row className="my-0">
                                        <CCol lg="4" xs="12">
                                            <CFormGroup>
                                                <CLabel htmlFor="city">Tỉnh</CLabel>
                                                <Select
                                                    value={this.state.optionTinh}
                                                    options={this.state.tinh}
                                                    onChange={this.chonTinhLayHuyen}
                                                />
                                            </CFormGroup>
                                        </CCol>
                                        <CCol lg="4" xs="12">
                                            <CFormGroup>
                                                <CLabel htmlFor="postal-code">Huyện</CLabel>
                                                <Select 
                                                    value={this.state.optionHuyen}
                                                    options={this.state.huyen} 
                                                    onChange={this.chonHuyenLayXa}
                                                />
                                            </CFormGroup>
                                        </CCol>
                                        <CCol lg="4" xs="12">
                                            <CFormGroup>
                                                <CLabel htmlFor="postal-code">Xã</CLabel>
                                                <Select
                                                    value={this.state.optionXa}
                                                    options={this.state.xa}
                                                    onChange={this.chonXa}
                                                />
                                            </CFormGroup>
                                        </CCol>
                                    </CFormGroup>
                                    
                                    <CFormGroup row className="my-0">
                                        <CCol lg="4" xs="12">
                                            <CFormGroup>
                                                <CLabel htmlFor="city">Từ ngày</CLabel>
                                                <DateTime
                                                    dateFormat="DD/MM/YYYY"
                                                    timeFormat="HH:mm"
                                                    value={this.state.startDate}
                                                    onChange={this.handleChangeStartDate}
                                                />
                                            </CFormGroup>
                                        </CCol>
                                        <CCol lg="4" xs="12">
                                            <CFormGroup>
                                                <CLabel htmlFor="postal-code">Đến ngày</CLabel>
                                                <DateTime
                                                    dateFormat="DD/MM/YYYY"
                                                    timeFormat="HH:mm"
                                                    value={this.state.endDate}
                                                    onChange={this.handleChangeEndDate}
                                                />
                                            </CFormGroup>
                                        </CCol>
                                        <CCol lg="4" xs="12" style={{ paddingTop: '10px' }}>
                                            <CLabel > {" "}</CLabel>
                                            <CFormGroup >
                                                <CButton
                                                    type="button"
                                                    size="sm"
                                                    color="success"
                                                    className="float-center"
                                                    onClick={this.handleBtnSearchClick}
                                                >
                                                    <CIcon name="cil-magnifying-glass" /> Tìm kiếm
                                                </CButton>
                                                {"  "}
                                                <CButton
                                                    type="button"
                                                    size="sm"
                                                    color="info"
                                                    className="float-center"
                                                    onClick={this.handleBtnExportClick}
                                                >
                                                    <CIcon name="cil-print" /> Xuất báo cáo
                                                </CButton>
                                            </CFormGroup>
                                        </CCol>
                                    </CFormGroup>
                                    <hr className="mt-0" />
                                    {this.state.loading && <em>Loading danh sách ...</em>}
                                    
                                        <ReactTable
                                            data={this.state.rows}
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
                                                    id: "ho-ten",
                                                    accessor: (c) => c.ho_ten,
                                                    filterMethod: (filter, rows) =>
                                                        matchSorter(rows, filter.value, { keys: ["ho-ten"] }),
                                                    filterAll: true,
                                                    width: 200
                                                },
                                                {
                                                    Header: "Năm sinh",
                                                    id: "nam-sinh",
                                                    accessor: (c) => c.nam_sinh,
                                                    filterMethod: (filter, rows) =>
                                                        matchSorter(rows, filter.value, {
                                                            keys: ["nam-sinh"],
                                                        }),
                                                    filterAll: true,
                                                    Cell: ({ value }) => (
                                                        <span
                                                            style={style}
                                                        >
                                                            {value}
                                                        </span>
                                                    ),
                                                    width: 100
                                                },
                                                {
                                                    Header: "Số điện thoại",
                                                    id: "so-dien-thoai",
                                                    accessor: (c) => c.so_dien_thoai,
                                                    filterMethod: (filter, rows) =>
                                                        matchSorter(rows, filter.value, {
                                                            keys: ["so-dien-thoai"],
                                                        }),
                                                    filterAll: true,
                                                    Cell: ({ value }) => (
                                                        <span style={style}>
                                                            {value}
                                                        </span>
                                                    ),
                                                    width: 150
                                                },
                                                {
                                                    Header: "Xã",
                                                    id: "ten-xa",
                                                    accessor: (c) => c.ten_xa,
                                                    filterMethod: (filter, rows) =>
                                                        matchSorter(rows, filter.value, {
                                                            keys: ["ten-xa"],
                                                        }),
                                                    filterAll: true,
                                                    Cell: ({ value }) => (
                                                        <span style={style}>
                                                            {value}
                                                        </span>
                                                    ),
                                                    width: 200
                                                },
                                                {
                                                    Header: "Huyện",
                                                    id: "ten-huyen",
                                                    accessor: (c) => c.ten_huyen,
                                                    filterMethod: (filter, rows) =>
                                                        matchSorter(rows, filter.value, {
                                                            keys: ["ten-huyen"],
                                                        }),
                                                    filterAll: true,
                                                    Cell: ({ value }) => (
                                                        <span
                                                            style={style}>
                                                            {value}
                                                        </span>
                                                    ),
                                                    width: 200
                                                },
                                                {
                                                    Header: "Triệu chứng",
                                                    id: "ten-huyen",
                                                    accessor: (c) => c.ten_huyen,
                                                    filterMethod: (filter, rows) =>
                                                        matchSorter(rows, filter.value, {
                                                            keys: ["ten-huyen"],
                                                        }),
                                                    filterAll: true,
                                                    Cell: (props) => (
                                                        <span style={style1}>
                                                            {this.showTC(props.original)}
                                                        </span>
                                                    ) 
                                                    ,
                                                }
                                            ]}
                                            defaultPageSize={10}
                                            className="-striped -highlight"
                                        />
                                    
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                )}
            </div>
        );
    }
}

export default TheoDoiSucKhoe;