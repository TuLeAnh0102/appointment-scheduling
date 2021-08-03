import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Controls from "../../../components/Controls/Controls";
import {
  CButton,
  CCardBody,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

import { Form, Col, Row } from "react-bootstrap";
import { congTyService, khuCongNghiepService } from "../../../services";
import { history } from "../../../helpers";

export default function ThongTinCongTyPartial(props) {
  const initialState = {
    ma_cong_ty: 0,
    ten_cong_ty: "",
    ma_khu_cong_nghiep: 0,
    ma_nhan_vien_kc:0,
    tai_khoan_cong_ty: "",
    mat_khau_cong_ty: ""
  };
  const { keyForEdit, propShow, propOnClose } = props;
  const isAddMode = keyForEdit === 0 || keyForEdit === undefined ? true : false;
  const [record, setRecord] = useState(initialState);
  const [validated, setValidated] = useState(false);
  const [dmKCN, setDmKCN] = useState([]);

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
    updateRecord(formDataObj);
  }

  function loadDmKhuCongNghiep() {
    khuCongNghiepService.getAllKhuCongNghiep().then((res) => {
      if (res.success && res.data != null) {
        setDmKCN(res.data);
      }
    });
  }

  useEffect(() => {
    async function loadInitData() {
      await loadDmKhuCongNghiep();
      if (isAddMode) {
        await setRecord(initialState);
      } else {
        // await setRecord(initialState);
        await congTyService.getCongTyById(keyForEdit).then((res) => {
          if (res.success && res.data != null) {
            setRecord(res.data);
          }
        });
      }
    }
    loadInitData();
  }, [keyForEdit]);

  function updateRecord(data) {
    return congTyService.cuCongTy(data).then((res) => {
      if (res.success) {
        alert("Cập nhật thông tin công ty thành công");
        history.go(0);
      } else {
        alert("Lỗi : " + res.message);
      }
    });
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

  return (
    <CModal
      show={propShow}
      closeOnBackdrop={false}
      onClose={propOnClose}
      size="lg"
    >
      <CModalHeader closeButton>
        <CModalTitle className="text-center">
          <b>THÔNG TIN CÔNG TY</b>
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCardBody className="pt-0 pb-0">
          <Form noValidate validated={validated} onSubmit={onSubmit}>
            <Row className="mb-0">
              <Form.Group as={Col} md="12">
                <Form.Label>Tên công ty</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="ten_cong_ty"
                  value={record.ten_cong_ty}
                  onChange={handleChangeValue}
                />
                <Form.Control
                  type="text"
                  hidden={true}
                  name="ma_cong_ty"
                  value={record.ma_cong_ty}
                  readOnly
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập tên công ty
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12">
                <Form.Label>Khu Công nghiêp</Form.Label>
                <Form.Control
                  as="select"
                  required
                  name="ma_khu_cong_nghiep"
                  id="ma_khu_cong_nghiep"
                  value={record.ma_khu_cong_nghiep}
                  onChange={handleChangeValue}
                >
                  {dmKCN.map((item) => (
                    <option
                      key={item.ma_khu_cong_nghiep}
                      value={item.ma_khu_cong_nghiep}
                    >
                      {item.ten_khu_cong_nghiep}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Vui lòng chọn khu công nghiệp
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12">
                <Form.Label>Tài khoản đăng nhập</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="tai_khoan_cong_ty"
                  value={record.tai_khoan_cong_ty|| ""}
                  onChange={handleChangeValue}
                />
                <Form.Control
                  type="text"
                  hidden={true}
                  name="ma_nhan_vien_kc"
                  value={record.ma_nhan_vien_kc || 0}
                  readOnly
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng chọn tài khoản công ty
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12">
                <Form.Label>Mật khẩu đăng nhập</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="mat_khau_cong_ty"
                  value={record.mat_khau_cong_ty || ""}
                  onChange={handleChangeValue}
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng chọn tài khoản công ty
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
