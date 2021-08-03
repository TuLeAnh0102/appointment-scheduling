import React, { useState, useEffect } from "react";
import {
  CButton,
  CCardBody,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

import { Form, Col, Row } from "react-bootstrap";
import moment from "moment";
import { danhSachToKhaiService, VanTaiService } from "../../../services";
import { history } from "../../../helpers";
import { commonService } from "src/services/common.service";

export default function ThongTinLayMauPartial(props) {
  let user = JSON.parse(localStorage.getItem("user"));
  const initialState = {
    thoi_gian_lay_mau: moment().format("yyyy-MM-DD"),
    noi_lay_mau: user.ma_chot,
    xuly: "1",
    chi_dinh_xet_nghiem: "",
    mau_gop: "",
    ngay_tiep_xuc_lan_cuoi: "",
    so_lan_lay_mau: "",
    ma_cam_ket_nguoi_dan: ""
  };
  const [row, setRow] = useState({});
  const { keyForEdit, propShow, propOnClose } = props;
  const isAddMode = (keyForEdit === 0 || keyForEdit === undefined) ? true : false;
  const [record, setRecord] = useState(initialState);
  const [validated, setValidated] = useState(false);
  const [leaveTime, setLeaveTime] = useState(0);
  const [showTimeLeave, setShowTimeLeave] = useState(false);
  const [dmXL, setdmXL] = useState([]);
  const [dmXN, setdmXN] = useState([])

  function onSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    event.preventDefault();
    const formData = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries());
    setValidated(true);
    updateRecord(keyForEdit, formDataObj)
  }

  // const sendMesZalo = data => {
  //   if (+data.zalo_user_id){
  //     let message = "Anh/chị " + data.ho_ten + " đã hoàn thành kiểm tra dịch tễ vào lúc " +
  //       moment(data.ngay_kiemtra_dichte).format("HH:mm DD-MM-yyyy") + " tại chốt " + getTenChot(data.noi_lay_mau) + ". Anh/chị vui lòng " +
  //       getChiDinhXN(data.xuly) + " theo yêu cầu của nhân viên y tế."
  //       VanTaiService.sendMesZalo(data.zalo_user_id, message).then(res => {
  //         console.log(res);
  //       })
        
  //   }
  // }

  function getTenChot(noi_lay_mau){
    const dsnoi_lay_mau = new Map()
      .set("1", "Chốt Phú Sơn, Bù Đăng")
      .set("2", "Chốt Tân Lập, Đồng Phú")
      .set("3", "Chốt Thành Tâm, Chơn Thành")
      .set("4", "Chốt Minh Long, Chơn Thành")
      .set("5", "Chốt Minh Tâm, Hớn Quản")

      return dsnoi_lay_mau.get(noi_lay_mau) || "";
  }

  function getChiDinhXN(value) {
    switch (parseInt(value)) {
      case 1:
        return "Tự theo dõi sức khỏe";
      case 2:
        return "Tự cách ly tại nhà 21 ngày";
      case 8:
        return "Cách ly tập trung 14 ngày";
      case 5:
        return "Theo dõi sức khỏe tại nhà 7 ngày"
      case 6:
        return "Cách ly tại nhà 14 ngày"
      case 7:
        return "Cách ly tại nhà 7 ngày"
      case 8:
        return "Cách ly tập trung 14 ngày"
      default:
        break;
    }
  }

  function updateRecord(id, data) {
    let a = data.thoi_gian_quay_ve.replace("T", " ");
    data.thoi_gian_quay_ve = a;

    if (data.xuly === undefined) {
      alert("Bạn chưa chọn hướng xử lý dịch tễ")
    } else if (data.chi_dinh_xet_nghiem === undefined) {
      alert("Bạn chưa chọn chỉnh định xét nghiệm")
    } else {
      console.log(data);
      danhSachToKhaiService.updateLayMauXetNghiem(id, data).then((res) => {
        if (res.id) {
          alert("Cập nhật thông tin lấy mẫu thành công");
          history.go(0);
          //propOnClose();
        } else {
          alert("Lỗi : " + res.message);
        }
      });
    }
  }

  function handleChangeValue(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setRecord({
      ...record,
      [name]: value,
    });
  }

  const showInputLeaveTime = (value) => {
    if (value == 2)
      return true
    return false;
  }

  useEffect(() => {
    commonService.getDanhMucHuongXuLy().then(res => {
      if(res.success){
        setdmXL(res.data)
      }
    });
    commonService.getDanhMucXetNghiem().then(res=> {
      if(res.success){
        setdmXN(res.data)
      }
    })
  }, [])

  return (
    <CModal
      show={propShow}
      closeOnBackdrop={false}
      onClose={propOnClose}
      size="lg"
    >
      <CModalHeader closeButton>
        <CModalTitle className="text-center">THÔNG TIN LẤY MẪU</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCardBody className="pt-0 pb-0">
          <Form noValidate validated={validated} onSubmit={onSubmit}>
            <Row className="mb-0">
              <Form.Group
                className="mb-3"
                as={Col}
                md="6"
                id="formGridCheckbox"
              >
                <Form.Label><b>Hướng xử lý dịch tễ</b></Form.Label>
                {
                  dmXL.map(item => {
                    return(
                      <Form.Check
                        required
                        type="radio"
                        name="xuly"
                        label={item.label}
                        value={item.value}
                        onChange={handleChangeValue}
                      />
                    )
                  })
                }

                {/* <Form.Check
                  required
                  type="radio"
                  name="xuly"
                  label="Tự cách ly tại nhà 21 ngày"
                  value="2"
                  onChange={handleChangeValue}
                />
                <Form.Check
                  required
                  type="radio"
                  name="xuly"
                  label="Cách ly tập trung"
                  value="3"
                  onChange={handleChangeValue}
                />
                <Form.Check
                  required
                  type="radio"
                  name="xuly"
                  label="Cách ly tập trung 14 ngày"
                  value="8"
                  onChange={handleChangeValue}
                />
                <Form.Check
                  required
                  type="radio"
                  name="xuly"
                  label="Test nhanh"
                  value="4"
                  onChange={handleChangeValue}
                />
                <Form.Check
                  required
                  type="radio"
                  name="xuly"
                  label="Theo dõi sức khỏe tại nhà 7 ngày"
                  value="5"
                  onChange={handleChangeValue}
                />
                <Form.Check
                  required
                  type="radio"
                  name="xuly"
                  label="Cách ly tại nhà 7 ngày"
                  value="7"
                  onChange={handleChangeValue}
                />
                <Form.Check
                  required
                  type="radio"
                  name="xuly"
                  label="Cách ly tại nhà 14 ngày"
                  value="6"
                  onChange={handleChangeValue}
                /> */}
              </Form.Group>
            </Row>
            <Row className="mb-0">
              <Form.Group
                className="mb-3"
                as={Col}
                md="6"
                id="formGridCheckbox"
              >
                <Form.Label><b>Chỉnh định xét nghiệm</b></Form.Label>
                {
                  dmXN.map(item => {
                    return(
                      <Form.Check
                        required
                        type="radio"
                        name="chi_dinh_xet_nghiem"
                        label={item.label}
                        value={item.value}
                        onChange={handleChangeValue}
                      />
                    )
                  })
                }

                {/* <Form.Check
                  required
                  type="radio"
                  name="chi_dinh_xet_nghiem"
                  label="Lấy mẫu xét nghiệm đơn"
                  value="2"
                  onChange={handleChangeValue}
                />
                <Form.Check
                  required
                  type="radio"
                  name="chi_dinh_xet_nghiem"
                  label="Lấy mẫu xét nghiệm kép"
                  value="3"
                  onChange={handleChangeValue}
                />
                <Form.Check
                  required
                  type="radio"
                  name="chi_dinh_xet_nghiem"
                  label="Lấy mẫu test nhanh"
                  value="4"
                  onChange={handleChangeValue}
                /> */}
              </Form.Group>
            </Row>
            <Row className="mb-0">
              <Form.Group
                className="mb-3"
                as={Col}
                md="6"
                id="formGridCheckbox"
              >
                <Form.Label><b>Người dân cam kết</b></Form.Label>
                <Form.Check

                  type="radio"
                  name="ma_cam_ket_nguoi_dan"
                  label="Cam kết đi thẳng"
                  value="1"
                  onChange={handleChangeValue}
                />
                <Form.Check

                  type="radio"
                  name="ma_cam_ket_nguoi_dan"
                  label="Cam kết kết quay về khi giao hàng xong"
                  value="2"
                  onChange={handleChangeValue}
                />
                <div className="container" hidden>
                  <Form.Group as={Col} md="12">
                    <Form.Label>Thời gian quay về</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      name="thoi_gian_quay_ve"
                      value={record.thoi_gian_quay_ve}
                      onChange={handleChangeValue}
                    />
                    <Form.Control.Feedback type="invalid">
                      Vui lòng nhập ngày giờ lấy mẫu
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>

                <Form.Check

                  type="radio"
                  name="ma_cam_ket_nguoi_dan"
                  label="Cam kết quay đầu trở lại"
                  value="3"
                  onChange={handleChangeValue}
                />
              </Form.Group>

            </Row>
            <Row className="mb-0">
              <Form.Group as={Col} md="6">
                <Form.Label>Ngày giờ lấy mẫu</Form.Label>
                <Form.Control
                  type="date"
                  required
                  name="thoi_gian_lay_mau"
                  value={record.thoi_gian_lay_mau}
                  onChange={handleChangeValue}
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập ngày giờ lấy mẫu
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Nơi lấy mẫu</Form.Label>
                <Form.Control
                  as="select"
                  required
                  name="noi_lay_mau"
                  id="noi-lay-mau"
                  onChange={handleChangeValue}
                >
                  <option value={user.ma_chot}>{user.ten_chot}</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Vui lòng chọn nơi lấy mẫu
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <div className="form-actions float-right">
              <CButton type="submit" color="success" className="mr-2">
                Lưu
              </CButton>
              <CButton color="secondary" onClick={propOnClose}>
                Thoát
              </CButton>
            </div>
          </Form>
        </CCardBody>
      </CModalBody>
    </CModal>
  );
}
