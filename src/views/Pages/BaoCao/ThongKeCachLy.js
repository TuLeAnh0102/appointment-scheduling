import React, { useEffect, useState, useRef } from "react";
import {
  CBadge,
  CCard,
  // CCardHeader,
  CRow,
  CButton,
  CCardBody,
  CForm,
  // CModal,
  // CModalBody,
  // CModalHeader,
  // CModalTitle,
  CCol,
  CFormGroup,
  CInputRadio,
  CLabel,
  CContainer,
} from "@coreui/react";
// import Iframe from 'react-iframe';

// import CIcon from "@coreui/icons-react";
// import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
// import { matchSorter } from "match-sorter";

import { useDispatch, useSelector } from "react-redux";
// import { userService } from "../../../services";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Controls from "../../../components/Controls/Controls";
import { alertAction } from "src/actions";
import { theoDoiCachLyService } from "../../../services";
import { commonService } from "../../../services";
import { listGioiTinh, listChot } from "../../../datamock/commonData";
import { Col } from "react-bootstrap";

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

const listTC = [
  { title: "tc_sot", name: "Sốt", value: 1, checked: false },
  { title: "tc_ho", name: "Ho", value: 2, checked: false },
  { title: "tc_kho_tho", name: "Khó thở", value: 3, checked: false },
  { title: "tc_dau_hong", name: "Đau họng", value: 4, checked: false },
  { title: "tc_non", name: "Nôn", value: 5, checked: false },
  { title: "tc_tieu_chay", name: "Tiêu chảy", value: 6, checked: false },
  { title: "tc_xuat_huyet", name: "Xuất huyết", value: 7, checked: false },
  { title: "tc_noi_ban", name: "Nổi ban ngoài da", value: 8, checked: false },
];

const listLSPN = [
  {
    title: "phoi_nhiem_dong_vat",
    name: "Đến trang trại chăn nuôi buôn bán động vật sống/cơ sở giết mổ động vật tiếp xúc dộng vật: ",
    value: 9,
    checked: false,
  },
  {
    title: "cham_soc_nguoi_benh",
    name: "Trực tiếp chăm sóc người bệnh truyền nhiễm",
    value: 10,
    checked: false,
  },
];

function ThongKeCachLyPage(props) {
  const { keyForEdit } = props;
  const [data, setdata] = useState([]);
  const [openPopupPartial, setOpenPopupPartial] = useState(false);
  const [datacheck, setDatacheck] = useState({
    tc_sot: 0,
    tc_ho: 0,
    tc_kho_tho: 0,
    tc_dau_hong: 0,
    tc_non: 0,
    tc_tieu_chay: 0,
    tc_xuat_huyet: 0,
    tc_noi_ban: 0,
  });
  const [datacheckLSPN, setdatacheckLSPN] = useState({
    phoi_nhiem_dong_vat: 0,
    cham_soc_nguoi_benh: 0,
  });
  const refContainer = useRef();

  const isAddMode = keyForEdit === 0 ? true : false;
  const [record, setRecord] = useState({});
  const [dmTinh, setDmTinh] = useState([]);
  const [tinh, setTinh] = useState(70);
  const [dmHuyen, setDmHuyen] = useState([]);
  const [huyen, setHuyen] = useState(null);
  const [dmXa, setDmXa] = useState([]);
  const [xa, setXa] = useState(null);
  const [huong_xl, setHuongXL] = useState(1);
  const dispatch = useDispatch();

  // form validation rules
  const validationSchema = Yup.object().shape({
    ho_ten: Yup.string().required("Vui lòng nhập"),
    nam_sinh: Yup.string().required("Vui lòng nhập"),
    gioi_tinh: Yup.string().required("Vui lòng chọn"),
    so_dien_thoai: Yup.string().required("Vui lòng nhập "),
    cmnd: Yup.string().required("Vui lòng nhập"),

    so_nha_dich_te: Yup.string().required("Vui lòng nhập"),
    lich_su_dich_te: Yup.string().required("Vui lòng nhập"),

    so_nha: Yup.string().required("Vui lòng nhập"),
    ma_xa: Yup.string().required("Vui lòng chọn"),
    ma_huyen: Yup.string().required("Vui lòng chọn "),
    noi_lay_mau: Yup.string().required("Vui lòng chọn"),
  });

  // functions to build form returned by useForm() hook
  const { register, handleSubmit, reset, value, setValue, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  function currentDate() {
    return new Date().getDate();
  }

  function handleHuyenChange(e) {
    commonService.getDanhMucXa(e.target.value).then((res) => {
      if (res.success && res.data != null) {
        setDmXa(res.data);
      }
    });
  }

  useEffect(() => {
    commonService.getDanhMucHuyen(tinh).then((res) => {
      if (res.success && res.data != null) {
        setDmHuyen(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (isAddMode) {
      reset({});
    } else {
      theoDoiCachLyService.getTheoDoiCachLy(keyForEdit).then((res) => {
        if (res.success && res.data != null) {
          commonService.getDanhMucXa(res.data["ma_huyen"]).then((res) => {
            setDmXa(res.data);
          });
          const fields = [
            "ho_ten",
            "gioi_tinh",
            "nam_sinh",
            "quoc_tich",
            "cmnd",
            "so_dien_thoai",
            "so_nha_dich_te",
            "lich_su_dich_te",
            "so_nha",
            "ma_xa",
            "ma_huyen",
            "loai_phuong_tien",
            "so_hieu_phuong_tien",
            "so_ghe_phuong_tien",
            "tc_sot",
            "tc_ho",
            "tc_dau_hong",
            "tc_kho_tho",
            "tc_non",
            "tc_tieu_chay",
            "tc_xuat_huyet",
            "tc_noi_ban",
            "vacxin",
            "phoi_nhiem_dong_vat",
            "cham_soc_nguoi_benh",
            "buoc",
            "noi_lay_mau",
          ];
          fields.forEach((field) => setValue(field, res.data[field]));
          setRecord(res.data);
          setHuyen(res.data["ma_huyen"]);
          setXa(res.data["ma_xa"]);
        }
      });
    }
  }, [keyForEdit]);

  function onSubmit(data) {
    let dataSubmit = { ...data, ...datacheck, ...datacheckLSPN };
    dataSubmit["vacxin"] = refContainer.current.value;
    // return isAddMode ? createRecord(data) : updateRecord(keyForEdit, data);
    return createRecord(dataSubmit);
  }

  function createRecord(data) {
    theoDoiCachLyService.insertTheoDoiCachLy(data).then((res) => {
      reset({});
      if (res["id"] === 1) alert(res["message"]);
      else alert(res["message"]);
    });
    // .catch(dispatch(alertAction.error("Error: không thể thêm mới")));
  }

  function updateRecord(id, data) {
    return theoDoiCachLyService
      .updateTheoDoiCachLy(data, id)
      .then(() => {
        dispatch(
          alertAction.success("Cập nhật thành công", { keepAfterRouteChange: true })
        );
        //history.push('..');
      })
      .catch(
        dispatch(alertAction.error("Error: không thể cập nhật thông tin"))
      );
  }

  function handleValue(event) {
    setHuongXL(event.target.value);
  }

  function handleTC(event) {
    setDatacheck({
      ...datacheck,
      [event.target.name]: event.target.checked ? 1 : 0,
    });
  }

  function handleLSPN(event) {
    setdatacheckLSPN({
      ...datacheckLSPN,
      [event.target.name]: event.target.checked ? 1 : 0,
    });
  }

  function handleReportClick() {
    var innerContents = document.getElementById("InToKhai").innerHTML;
    var tabPrint = window.open("", "", "");
    tabPrint.document.open();
    tabPrint.document.write(
      '<html><head><link rel="stylesheet" type="text/css" href="style.css" /><style>@media print {thead {display: table-header-group;}}</style></head><body onload="window.print()">'
    );
    tabPrint.document.write(innerContents + "</html>");
    tabPrint.document.close();
  }

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardBody className="pt-0 pb-0">
            <CCol xs="12">
              <CRow>
                <CCol xs="10">
                  <h3 style={{ textAlign: "center", margin: "1em" }}>
                    TỜ KHAI Y TẾ
                  </h3>
                </CCol>
              </CRow>
            </CCol>
            <CForm onSubmit={handleSubmit(onSubmit)}>
              <CFormGroup row className="my-0">
                {/*START THÔNG TIN NGƯỜI KHAI */}
                <CCol xs="12">
                  <h3>Thông tin khai báo</h3>
                </CCol>
                <CCol xs="6">
                  <Controls.Input
                    label="Họ tên"
                    name="ho_ten"
                    type="text"
                    register={register}
                    error={errors.ho_ten}
                  />
                </CCol>
                <CCol xs="6">
                  <Controls.Input
                    label="Năm sinh"
                    name="nam_sinh"
                    type="number"
                    error={errors.nam_sinh}
                    register={register}
                  />
                </CCol>
                <CCol xs="6">
                  <Controls.Input
                    label="CMND/CCCD/HC"
                    name="cmnd"
                    type="text"
                    register={register}
                    error={errors.cmnd}
                  />
                </CCol>
                <CCol xs="6">
                  <Controls.Select
                    label="Giới tính"
                    name="gioi_tinh"
                    options={listGioiTinh()}
                    register={register}
                    error={errors.gioi_tinh}
                  />
                </CCol>
                <CCol xs="6">
                  <Controls.Input
                    label="Số điện thoại"
                    name="so_dien_thoai"
                    type="number"
                    register={register}
                    error={errors.so_dien_thoai}
                  />
                </CCol>
                <CCol xs="6">
                  <Controls.Input
                    label="Quốc tịch"
                    name="quoc_tich"
                    type="text"
                    register={register}
                    error={errors.quoc_tich}
                  />
                </CCol>
                {/*END THÔNG TIN NGƯỜI KHAI */}

                {/*START THÔNG TIN DI CHUYỂN */}
                <CCol xs="12">
                  <h3>Thông tin di chuyển</h3>
                </CCol>
                <CCol xs="12">
                  <Controls.Input
                    label="Địa điểm khởi hành"
                    name="so_nha_dich_te"
                    type="text"
                    register={register}
                    error={errors.so_nha_dich_te}
                  />
                </CCol>
                <CCol xs="12">
                  <Controls.Input
                    label="Địa điểm nơi đến"
                    name="lich_su_dich_te"
                    type="text"
                    register={register}
                    error={errors.lich_su_dich_te}
                  />
                </CCol>
                {/* <CCol xs="6">
                  <Controls.Input
                    label="Địa chỉ liên hệ"
                    name="dia_chi_lien_he"
                    type="text"
                    register={register}
                    error={errors.dia_chi_lien_he}
                  />
                </CCol> */}
                <CCol xs="12">
                  <h3>Địa chỉ liên hệ</h3>
                </CCol>

                <CCol xs="6">
                  <Controls.Select
                    label="Huyện/thị xã/Thành phố"
                    name="ma_huyen"
                    onChange={handleHuyenChange}
                    options={dmHuyen}
                    error={errors.ma_huyen}
                    register={register}
                  />
                </CCol>
                <CCol xs="6">
                  <Controls.Select
                    label="Xã, phường, trị trấn"
                    name="ma_xa"
                    options={dmXa}
                    error={errors.ma_xa}
                    register={register}
                  />
                </CCol>
                <CCol xs="6">
                  <Controls.Input
                    label="Số nhà, thôn/ấp/tổ"
                    name="so_nha"
                    type="text"
                    register={register}
                    error={errors.so_nha}
                  />
                </CCol>
                <CCol xs="6">
                  <Controls.Input
                    label="Phương tiện"
                    name="loai_phuong_tien"
                    type="text"
                    register={register}
                    error={errors.loai_phuong_tien}
                  />
                </CCol>
                <CCol xs="6">
                  <Controls.Input
                    label="Số hiệu"
                    name="so_hieu_phuong_tien"
                    type="text"
                    register={register}
                    error={errors.so_hieu_phuong_tien}
                  />
                </CCol>
                <CCol xs="6">
                  <Controls.Input
                    label="Số ghế"
                    name="so_ghe_phuong_tien"
                    type="number"
                    register={register}
                    error={errors.so_ghe_phuong_tien}
                  />
                </CCol>
                {/*END THÔNG TIN DI CHUYỂN */}

                {/* START THÔNG TIN Y TẾ */}
                <CCol xs="12">
                  <h3>Thông tin y tế</h3>
                </CCol>
                <CCol xs="12">
                  <h6>
                    Trong vòng 7 ngày có thấy các dấu hiệu nào sau đây không ?
                  </h6>
                </CCol>
                <Col style={{ margin: "0.5em" }}>
                  <Col>
                    <CRow>
                      {listTC.map((item) => {
                        return (
                          <div className="form-check form-check-inline col-md-4">
                            <input
                              key={item.key}
                              className="form-check-input"
                              type="checkbox"
                              name={item.title}
                              onChange={handleTC}
                              id={item.value}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="inlineRadioSot1"
                            >
                              {item.name}
                            </label>
                          </div>
                        );
                      })}
                    </CRow>
                  </Col>
                </Col>

                <CCol xs="12">
                  <h6>
                    Liệt kê các loại vacxin hoặc chế phẩm y tế đã sử dụng:
                  </h6>
                </CCol>
                <CCol style={{ margin: "0.5em" }}>
                  <textarea
                    rows="4"
                    cols="30"
                    name="comment"
                    id="txt_vacxin"
                    ref={refContainer}
                  />
                </CCol>
                <CCol xs="12">
                  <h6>Lịch sử phơi nhiễm:</h6>
                </CCol>
                <Col style={{ margin: "0.5em" }}>
                  <Col>
                    <CRow>
                      {listLSPN.map((item) => {
                        return (
                          <div className="form-check form-check-inline col-md-12">
                            <input
                              key={item.key}
                              className="form-check-input"
                              type="checkbox"
                              name={item.title}
                              onChange={handleLSPN}
                              id={item.value}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="inlineRadioSot1"
                            >
                              {item.name}
                            </label>
                          </div>
                        );
                      })}
                    </CRow>
                  </Col>
                </Col>

                {/* END THÔNG TIN Y TẾ */}

                {/* START THÔNG TIN CHỐT KHAI BÁO */}

                {/* END THÔNG TIN CHỐT KHAI BÁO */}
                {/* <CCol xs="6" hidden>
                  <Controls.Input
                    label="Thời gian lấy mẫu"
                    name="thoi_gian_lay_mau"
                    type="date"
                    register={register}
                    error={errors.thoi_gian_lay_mau}
                    value={currentDate}
                  /> */}

                <CCol xs="12">
                  <Controls.Select
                    label="Nơi lấy mẫu"
                    name="noi_lay_mau"
                    options={listChot()}
                    register={register}
                    error={errors.noi_lay_mau}
                  />
                </CCol>
              </CFormGroup>
              <div className="form-actions float-right">
                {isAddMode === true ? (
                  <div></div>
                ) : (
                    <CButton
                      color="info"
                      onClick={() => handleReportClick()}
                      className="mr-2"
                    >
                      In tờ khai
                    </CButton>
                )}
                <CButton
                  type="submit"
                  color="success"
                  className="mr-2"
                  style={{ margin: "1em" }}
                >
                  Lưu
                </CButton>
                {/* <CButton color="secondary" onClick={propOnClose}>
                  Thoát
              </CButton> */}
              </div>
            </CForm>
            <hr className="mt-0" />
            <div
              hidden={true}
              id="InToKhai"
              style={{ fontFamily: "arial, sans-serif" }}
            >
              <CRow>
                <CCol xs="12">
                  <h3 style={{ textAlign: "center", margin: "1em" }}>
                    TỜ KHAI Y TẾ ĐỐI VỚI NGƯỜI <br />
                    (Ban hành kèm theo Nghị định số 89/2018/NĐ-CP Ngày
                    25/06/2018 của Chính Phủ)
                  </h3>
                </CCol>
              </CRow>
              <CRow>
                <span>
                  Họ tên (viết chữ in hoa): <b>{record.ho_ten}</b>
                </span>
              </CRow>
              <CRow>
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                  <tr>
                    <td style={{ width: "33%" }}>
                      Năm sinh : <b>{record.nam_sinh}</b>
                    </td>
                    <td style={{ width: "33%" }}>
                      Giới tính : <b>{record.gioi_tinh === 1 ? "Nam" : "Nữ"}</b>
                    </td>
                    <td style={{ width: "33%" }}>
                      Quốc tịch : {record.quoc_tich}
                    </td>
                  </tr>
                </table>
              </CRow>
              <CRow>
                <span>
                  {" "}
                  Số hộ chiếu hoặc giấy thông hành hợp pháp khác:{" "}
                  <b>{record.cmnd}</b>
                </span>
              </CRow>
              <CRow>
                <span>
                  <b>Thông tin đi lại </b>
                </span>
              </CRow>
              <CRow>
                <span> Phương tiện : {record.loai_phuong_tien} </span>
              </CRow>

              <CRow>
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                  <tr>
                    <td style={{ width: "50%" }}>
                      Số hiệu phương tiện : {record.so_hieu_phuong_tien}{" "}
                    </td>
                    <td style={{ width: "50%" }}>
                      Số ghế (nếu có): {record.so_ghe_phuong_tien}{" "}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "50%" }}>
                      Ngày khởi hành : {record.ngay_khoi_hanh_phuong_tien}
                    </td>
                    <td style={{ width: "50%" }}>
                      Ngày nhập cảnh : {record.ngay_nhap_canh_phuong_tien}
                    </td>
                  </tr>
                </table>
              </CRow>
              <CRow>
                <span>Địa điểm khởi hành : {record.so_nha_dich_te}</span>
              </CRow>
              <CRow>
                <span>Địa điểm đến : {record.lich_su_dich_te}</span>
              </CRow>
              <CRow>
                <span>
                  Trong vòng 14 ngày vừa qua, anh/chị có đến quốc gia/vùng lãnh
                  thổ nào không? (nếu có ghi rõ)
                </span>
              </CRow>
              <CRow>
                <span>
                  <b>Địa chỉ liên lạc tại Việt Nam</b>
                </span>
              </CRow>
              <CRow>
                <span>
                  Địa chỉ nơi ở tại Việt Nam : {record.so_nha} , {record.ten_xa}
                  , {record.ten_huyen}, tỉnh Bình Phước
                </span>
              </CRow>
              <CRow>
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                  <tr>
                    <td style={{ width: "50%" }}>
                      Điện thoại : <b>{record.so_dien_thoai}</b>{" "}
                    </td>
                    <td style={{ width: "50%" }}>Email: </td>
                  </tr>
                </table>
              </CRow>
              <CRow>
                <span>
                  Trong vòng 7 ngày (Tính tới thời điểm làm thủ tục xuất cảnh,
                  nhập cảnh, quá cảnh) Anh/Chị có thấy xuất hiện dấu hiệu nào
                  sau đây ko?
                </span>
              </CRow>
              <CRow>
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                  <tr>
                    <th
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      Triệu chứng
                    </th>
                    <th
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      Có
                    </th>
                    <th
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      Không
                    </th>
                    <th
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      Triệu chứng
                    </th>
                    <th
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      Có
                    </th>
                    <th
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      Không
                    </th>
                  </tr>
                  <tr>
                    <td
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "left",
                        padding: "8px",
                      }}
                    >
                      Sốt
                    </td>
                    <td
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      {record.tc_sot === true ? "X" : ""}
                    </td>
                    <td
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      {record.tc_sot === false ? "X" : ""}
                    </td>
                    <td
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "left",
                        padding: "8px",
                      }}
                    >
                      Nôn/buồn nôn
                    </td>
                    <td
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      {record.tc_non === true ? "X" : ""}
                    </td>
                    <td
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      {record.tc_non === false ? "X" : ""}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "left",
                        padding: "8px",
                      }}
                    >
                      Ho
                    </td>
                    <td
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      {record.tc_ho === true ? "X" : ""}
                    </td>
                    <td
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      {record.tc_ho === false ? "X" : ""}
                    </td>
                    <td
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "left",
                        padding: "8px",
                      }}
                    >
                      Tiêu chảy
                    </td>
                    <td
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      {record.tc_tieu_chay === true ? "X" : ""}
                    </td>
                    <td
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      {record.tc_tieu_chay === false ? "X" : ""}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "left",
                        padding: "8px",
                      }}
                    >
                      Khó thở
                    </td>
                    <td
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      {record.tc_kho_tho === true ? "X" : ""}
                    </td>
                    <td
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      {record.tc_kho_tho === false ? "X" : ""}
                    </td>
                    <td
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "left",
                        padding: "8px",
                      }}
                    >
                      Xuất huyết ngoài da
                    </td>
                    <td
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      {record.tc_xuat_huyet === true ? "X" : ""}
                    </td>
                    <td
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      {record.tc_xuat_huyet === false ? "X" : ""}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "left",
                        padding: "8px",
                      }}
                    >
                      Đâu họng
                    </td>
                    <td
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      {record.tc_dau_hong === true ? "X" : ""}
                    </td>
                    <td
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      {record.tc_dau_hong === false ? "X" : ""}
                    </td>
                    <td
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "left",
                        padding: "8px",
                      }}
                    >
                      Nổi ban ngoài da
                    </td>
                    <td
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      {record.tc_noi_ban === true ? "X" : ""}
                    </td>
                    <td
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      {record.tc_noi_ban === false ? "X" : ""}
                    </td>
                  </tr>
                </table>
              </CRow>
              <CRow>
                <span>
                  Liệt kê tên vắc xin hoặc sinh phẩm y tế đã xử dụng :{" "}
                  {record.vacxin}
                </span>
              </CRow>
              <CRow>
                <span>Lịch sử phơi nhiễm: Trong vòng 14 ngày Anh/Chị có</span>
              </CRow>
              <CRow>
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                  <tr>
                    <th
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      Lịch sử phơi nhiễm
                    </th>
                    <th
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      Có
                    </th>
                    <th
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      Không
                    </th>
                  </tr>
                  <tr>
                    <td
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "left",
                        padding: "8px",
                      }}
                    >
                      Đến trang trại chăn nuôi/chợ buôn bán động vật sống/cơ sở
                      giết mổ động vật, tiếp xúc động vật
                    </td>
                    <td
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      {record.phoi_nhiem_dong_vat === true ? "X" : ""}
                    </td>
                    <td
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      {record.phoi_nhiem_dong_vat === false ? "X" : ""}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "left",
                        padding: "8px",
                      }}
                    >
                      Trực tiếp chăm sóc người bệnh truyền nhiễm
                    </td>
                    <td
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      {record.cham_soc_nguoi_benh === true ? "X" : ""}
                    </td>
                    <td
                      style={{
                        border: "1px solid #dddddd",
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      {record.cham_soc_nguoi_benh === false ? "X" : ""}
                    </td>
                  </tr>
                </table>
              </CRow>
              <CRow>
                <span>
                  Tôi cam kết những thông tin trên là đúng sự thật, tôi hiểu
                  rằng nếu cung cấp thông tin sai thông tin có thể dẫn đến những
                  hậu quả nghiêm trọng
                </span>
              </CRow>
              <CRow>
                <table
                  style={{
                    fontFamily: "arial, sans-serif",
                    borderCollapse: "collapse",
                    width: "100%",
                  }}
                >
                  <tr>
                    <td style={{ textAlign: "center", padding: "8px" }}>
                      CÁN BỘ Y TẾ <br /> Ký, ghi rõ họ tên
                    </td>
                    <td style={{ textAlign: "center", padding: "8px" }}>
                      Ngày......Tháng......Năm...... <br /> NGƯỜI KHAI <br />{" "}
                      Ký, ghi rõ họ tên
                    </td>
                  </tr>
                </table>
              </CRow>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default ThongKeCachLyPage;
