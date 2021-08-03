import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CForm,
  CFormGroup,
  CInputRadio,
  CLabel
} from "@coreui/react";
import {
  SelectionState,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableBandHeader,
  TableSelection,
} from "@devexpress/dx-react-grid-bootstrap4";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import saveAs from "file-saver";
import { theoDoiCachLyService } from "../../../services";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import EditThongKeCachLyPartial from "../Common/EditThongKeCachLyPartial";
import MauKhaiBaoYTe from "../Common/FormDeclaration";
import { Container } from "react-bootstrap";

const listGioiTinh = () => [
  { id: "1", title: "Nam" },
  { id: "0", title: "Nữ" },
];

const TableComponent = ({ ...restProps }) => (
  <Table.Table {...restProps} className="table-striped table-bordered" />
);

const BandCell = ({
  children,
  tableRow,
  tableColumn,
  column,
  ...restProps
}) => {
  return (
    <TableBandHeader.Cell
      {...restProps}
      column={column}
      className="text-center"
    >
      {children}
    </TableBandHeader.Cell>
  );
};

function KhaiBaoYTePage(props) {
  const { propOnClose } = props;
  // const [columns] = useState([
  //   { name: "stt", title: "STT" },
  //   { name: "ho_ten", title: "Họ và tên" },
  //   { name: "nam_sinh", title: "Năm sinh" },
  //   { name: "gioi_tinh", title: "Giới tính" },
  //   { name: "so_dien_thoai", title: "Số điện thoại" },
  //   { name: "dia_chi_dich_te", title: "Dịch tễ" },
  //   { name: "so_nha", title: "Số nhà, thôn/ấp/tổ" },
  //   { name: "xa", title: "xã, phường, thị trấn" },
  //   { name: "huyen", title: "Huyện, thị xã, thành phố" },
  //   {
  //     name: "thoi_gian_lay_mau",
  //     title: "THỜI GIAN LẤY MẪU(Giờ, ngày/tháng/năm)",
  //   },
  //   { name: "noi_lay_mau", title: "NƠI LẤY MẪU (tại chốt số)" },
  //   { name: "tu_cach_ly_21", title: "tự cách ly tại nhà 21 ngày" },
  //   { name: "theo_doi_tai_nha", title: "theo dõi sức khỏe tại nhà" },
  // ]);

  const initialState = [
    {
      stt: "",
      ho_ten: "",
      nam_sinh: "",
      gioi_tinh: "",
      dia_chi_dich_te: "",
      so_nha: "",
      xa: "",
      huyen: "",
      thoi_gian_lay_mau: "",
      noi_lay_mau: "",
      tu_cach_ly_21: "",
      theo_doi_tai_nha: "",
      so_dien_thoai: "",
    },
  ];

  const [data, setdata] = useState(initialState);

  // const [columnBands] = useState([
  //   {
  //     title: "Nơi sẽ thực hiện cách ly tại nhà, tự theo dõi sức khỏe",
  //     children: [
  //       { columnName: "so_nha" },
  //       { columnName: "xa" },
  //       { columnName: "huyen" },
  //     ],
  //   },
  //   {
  //     title: "Hướng xử lý",
  //     children: [
  //       { columnName: "tu_cach_ly_21" },
  //       { columnName: "theo_doi_tai_nha" },
  //     ],
  //   },
  // ]);

  // const [tableColumnExtensions] = useState([
  //   { columnName: "stt", align: "center", width: 70 },
  //   { columnName: "ho_ten", align: "left" },
  //   { columnName: "nam_sinh", align: "center", width: 100 },
  //   { columnName: "gioi_tinh", align: "center", width: 100 },
  //   { columnName: "so_dien_thoai", align: "center", width: 120 },
  //   { columnName: "dia_chi_dich_te", align: "center" },
  //   { columnName: "so_nha", align: "center" },
  //   { columnName: "xa", align: "center" },
  //   { columnName: "huyen", align: "center" },
  //   { columnName: "thoi_gian_lay_mau", align: "center" },
  //   { columnName: "noi_lay_mau", align: "center" },
  //   { columnName: "tu_cach_ly_21", align: "center" },
  //   { columnName: "theo_doi_tai_nha", align: "center" },
  // ]);

  const [openPopupPartial, setOpenPopupPartial] = useState(true);
  const [keyForEdit, setKeyForEdit] = useState(0);
  const [selection, setSelection] = useState([]);

  function handleEditRowClick() {

      if(selection.length === 0)
        alert("Vui lòng chọn 1 dòng duy nhất để chỉnh sửa");
      else if(selection.length >= 2)
      {
        alert("Vui lòng chọn 1 dòng duy nhất để chỉnh sửa");
      }
      else
      {
        let rowSelectCheck = selection[0];
        setKeyForEdit(data[rowSelectCheck].id);
        setOpenPopupPartial(true);
      }

  }

  function handleAddRowClick() {
    setKeyForEdit(0);
    setOpenPopupPartial(true);
  }

  function handleDeleteRowClick() {
    selection.forEach(element => {

    });
  }

    // form validation rules
    const validationSchema = Yup.object().shape({
      ho_ten: Yup.string().required("Vui lòng nhập họ tên"),
      nam_sinh: Yup.string().required("Vui lòng nhập năm sinh"),
      gioi_tinh: Yup.string().required("Vui lòng chọn giới tính"),
      so_dien_thoai: Yup.string().required("Vui lòng nhập số điện thoại"),
      so_nha: Yup.string().required("Vui lòng nhập số chổ ngồi"),
      ma_xa: Yup.string().required("Vui lòng chọn xã"),
      ma_huyen: Yup.string().required("Vui lòng chọn huyện"),
    });

     // functions to build form returned by useForm() hook
  const { register, handleSubmit, reset, setValue, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    theoDoiCachLyService.getAllTheoDoiCachLy().then((res) => {
      if (res.success && res.data != null) {
        setdata(res.data);
      }
    });
  }, []);

  function onSubmit(data) {
    // return isAddMode ? createRecord(data) : updateRecord(keyForEdit, data);
  }

  function handleHuyenChange() {

  }

  return(
    <Container>
      <MauKhaiBaoYTe/>
    </Container>
  );
}

export default KhaiBaoYTePage;
