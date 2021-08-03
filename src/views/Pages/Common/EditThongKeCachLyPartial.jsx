import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Controls from "../../../components/Controls/Controls";
import {
  CButton,
  CCardBody,
  CForm,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CCol,
  CFormGroup,
  CInputRadio,
  CLabel,
} from "@coreui/react";
import { alertAction } from "src/actions";
import { theoDoiCachLyService } from "../../../services";
import { commonService } from "../../../services";
import { listGioiTinh, listChot } from '../../../datamock/commonData';


const listHuyen = () => [
  { id: "1", title: "Đồng Xoài" },
  { id: "2", title: "Bình Long" },
  { id: "3", title: "Lộc Ninh" },
  { id: "4", title: "Phước Long" },
  { id: "5", title: "Bù Đăng" },
  { id: "6 ", title: "Đồng Phú" },
  { id: "7", title: "Chơn Thành" },
  { id: "8", title: "Bù Đốp" },
  { id: "9", title: "Phú Riềng" },
  { id: "19", title: "Hớn Quản" },
  { id: "20", title: "Bù Gia Mập" },
];

export default function EditThongKeCachLyPartial(props) {
  const { keyForEdit, propShow, propOnClose } = props;
  const isAddMode = keyForEdit === 0 ? true : false;
  const [record, setRecord] = useState({});
  const [dmTinh, setDmTinh] = useState([]);
  const [tinh, setTinh] = useState(70);
  const [dmHuyen, setDmHuyen] = useState([]);
  const [huyen, setHuyen] = useState(null);
  const [xa, setXa] = useState(null);
  const [dmXa, setDmXa] = useState([]);
  const [huong_xl, setHuongXL] = useState(1);
  const dispatch = useDispatch();

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

  function currentDate(){
    return new Date().getDate();
  }

  function handleHuyenChange(e) {
      commonService.getDanhMucXa(e.target.value).then((res) => {
        if (res.success && res.data != null) {
          setDmXa(res.data);
        }
      });
  }

  function handleValueXa(v){
    commonService.getDanhMucXa(v).then((res) => {
      if (res.success && res.data != null) {
        setDmXa(res.data);
      }
    });
  }

  useEffect(() => {
    handleValueXa(huyen)
  }, [xa]);


  useEffect(() => {
    commonService.getDanhMucHuyen(tinh).then((res) => {
      if (res.success && res.data != null) {
        setDmHuyen(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (isAddMode) {
      currentDate();
      reset({});
    } else {
      theoDoiCachLyService.getTheoDoiCachLy(keyForEdit).then((res) => {
        if (res.success && res.data != null) {
          handleValueXa(res.data['ma_huyen']);
          handRadio(res.data['xuly']);
          const fields = [
            "ho_ten",
            "nam_sinh",
            "gioi_tinh",
            "ma_huyen",
            "ma_xa",
            "so_nha",
            "thoi_gian_lay_mau",
            "noi_lay_mau",
            "so_dien_thoai",
            "so_nha_dich_te",
          ];
          // setHuyen(res.data['ma_huyen']);
          // setXa(res.data['ma_xa'])

          fields.forEach((field) => setValue(field, res.data[field]));
          setRecord(res);
        }
      });
    }
  }, [keyForEdit]);

  useEffect(() => {
    if(Object.keys(record).length !== 0){
      handleValueXa(record.data['ma_huyen']);
      // kiemtra();
    }
  }, [record])

  function onSubmit(data) {
    return isAddMode ? createRecord(data) : updateRecord(keyForEdit, data);
  }

  function createRecord(data) {
    data['huong_xu_ly'] = huong_xl;
    theoDoiCachLyService
      .insertTheoDoiCachLy(data)
      .then((res) => {

        alertAction.success("Thêm mới thành công", {
          keepAfterRouteChange: true,
        });
        // history.push('.');
      })
      .catch(dispatch(alertAction.error("Error: không thể thêm mới")));
  }

  function updateRecord(id, data) {
    data['huong_xu_ly'] = huong_xl;
    return theoDoiCachLyService
      .updateTheoDoiCachLy(data,id)
      .then(() => {
        dispatch(
          alertAction.success("Cập nhật thành công!", { keepAfterRouteChange: true })
        );
        //history.push('..');
        propOnClose();
      })
      .catch(
        dispatch(alertAction.error("Error: không thể cập nhật thông tin!"))
    ).then(() => props.propShow = false);
  }

  function handleValue(event){
    setHuongXL(event.target.value);
  }

  function handRadio(value){
    setHuongXL(value);
    // if(huong_xl == document.getElementById(''))
  }

  function kiemtra(event){
    if(event.target.value == huong_xl)
      return true;
    else
      return false;
  }

  return (
    <CModal
      show={propShow}
      closeOnBackdrop={false}
      onClose={propOnClose}
      size="lg"
    >
      <CModalHeader closeButton>
        <CModalTitle>{keyForEdit === 0 ? "Thêm mới" : "Cập nhật"} </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCardBody className="pt-0 pb-0">
          <CForm onSubmit={handleSubmit(onSubmit)}>
            <CFormGroup row className="my-0">
              <CCol xs="12">
                <Controls.Input
                  label="Họ tên"
                  name="ho_ten"
                  type="text"
                  register={register}
                  error={errors.ho_ten}
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row className="my-0">
              <CCol xs="4">
                <Controls.Input
                  label="Năm sinh"
                  name="nam_sinh"
                  type="text"
                  error={errors.nam_sinh}
                  register={register}
                />
              </CCol>
              <CCol xs="4">
                <Controls.Select
                  label="Giới tính"
                  name="gioi_tinh"
                  value ="1"
                  options={listGioiTinh()}
                  register={register}
                  error={errors.gioi_tinh}
                />
              </CCol>
              <CCol xs="4">
                <Controls.Input
                  label="Số điện thoại"
                  name="so_dien_thoai"
                  type="text"
                  register={register}
                  error={errors.so_dien_thoai}
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row className="my-0">
              <CCol xs="12">
                <Controls.Input
                  label="Dịch tễ"
                  name="so_nha_dich_te"
                  type="text"
                  register={register}
                  error={errors.so_nha_dich_te}
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row className="my-0">
              <CCol xs="4">
                <Controls.Input
                  label="Số nhà, thôn/ấp/tổ"
                  name="so_nha"
                  type="text"
                  register={register}
                  error={errors.so_nha}
                />
              </CCol>
              <CCol xs="4">
                <Controls.Select
                  label="Huyện, thị xã, thành phố"
                  name="ma_huyen"

                  onChange={handleHuyenChange}
                  options={listHuyen()}
                  error={errors.ma_huyen}
                  register={register}
                />
              </CCol>
              <CCol xs="4">
                <Controls.Select
                  label="Xã, phường, trị trấn"
                  name="ma_xa"
                  options={dmXa}
                  error={errors.ma_xa}
                  register={register}
                  value={xa}
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row className="my-0" hidden>
              <CCol xs="6">
                <Controls.Input
                  label="Thời gian lấy mẫu"
                  name="thoi_gian_lay_mau"
                  type="date"
                  register={register}
                  error={errors.thoi_gian_lay_mau}

                />
              </CCol>
              <CCol xs="6">
                <Controls.Select
                  label="Nơi lấy mẫu"
                  name="noi_lay_mau"
                  options={listChot()}
                  register={register}
                  error={errors.gioi_tinh}
                />
              </CCol>
            </CFormGroup>
            <CFormGroup>
              <CCol xs="12">
                <CFormGroup variant="custom-radio" inline>
                  <CInputRadio
                    custom
                    id="inline-radio1"
                    name="xuly"
                    value="1"
                    onChange={handleValue}
                    // checked={kiemtra}
                  />
                  <CLabel variant="custom-checkbox" htmlFor="inline-radio1">
                    Tự theo dõi sức khỏe
                  </CLabel>
                </CFormGroup>
                <CFormGroup variant="custom-radio" inline>
                  <CInputRadio
                    custom
                    id="inline-radio2"
                    name="xuly"
                    value="2"
                    onChange={handleValue}
                    // checked={kiemtra}
                  />
                  <CLabel variant="custom-checkbox" htmlFor="inline-radio2">
                    Tự cách ly tại nhà 21 ngày
                  </CLabel>
                </CFormGroup>
                <CFormGroup variant="custom-radio" inline>
                  <CInputRadio
                    custom
                    id="inline-radio3"
                    name="xuly"
                    value="3"
                    onChange={handleValue}
                    // checked={kiemtra}
                  />
                  <CLabel variant="custom-checkbox" htmlFor="inline-radio3">
                    Cách ly tập trung
                  </CLabel>
                </CFormGroup>
              </CCol>
            </CFormGroup>
            <div className="form-actions float-right">
              <CButton type="submit" color="success" className="mr-2">
                Lưu
              </CButton>
              <CButton color="secondary" onClick={propOnClose}>
                Thoát
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CModalBody>
    </CModal>
  );
}
