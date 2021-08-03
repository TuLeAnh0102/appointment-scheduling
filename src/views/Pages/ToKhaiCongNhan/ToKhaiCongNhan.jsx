import React, { useEffect, useState, useRef } from "react";
import {
  CCard,
  CRow,
  CButton,
  CCardBody,
  CForm,
  CCol,
  CFormGroup,
} from "@coreui/react";
import "react-table-v6/react-table.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { congNhanService } from "src/services/congnhan.service";
import { commonService } from "../../../services";
import Controls from "src/components/Controls/Controls";
import { Loading } from "src/components/Loading/loading";
import Diachi from "src/components/ToKhaiYTe/Diachi";
import ThongTinCaNhan from "src/components/KhaiBaoCongNhan/ThongTinCaNhan";
import ThongTinCongTy from "src/components/KhaiBaoCongNhan/ThongTinCongTy";
import GuiToKhaiThanhCongCN from '../GuiToKhaiThanhCong/GuiToKhaiThanhCongCN'
import { Form, Col, Row } from "react-bootstrap";
export default function ToKhaiCongNhan(props) {
  const { keyForEdit} = props
  const [datacheck, setDatacheck] = useState({
    is_bluezone: 0,
    is_vacxin: 0
  })
  const [isLoadding, setisLoadding] = useState(0);
  const [dataSuccessPage, setdataSuccessPage] = useState({});
  const [khaibaoSuccess, setkhaibaoSuccess] = useState(0);
  const [ma_cong_nhan, setMa_cong_nhan] = useState(0);
  const [dmtinh, setdmTinh] = useState([]);
  const [thongTinCty, setthongTinCty] = useState('');
  const [diaChiTamTru, setdiaChiTamTru] = useState({
    ma_tinh: 70,
    ma_huyen: "",
    ma_xa: "",
  });
  const [diaChiThuongTru, setdiaChiThuongTru] = useState({
    ma_tinh: 70,
    ma_huyen: "",
    ma_xa: "",
  });
  const summaryDiaChiThuongtru =
  {
    ten_tinh: 'ma_tinh_thuong_tru',
    ten_huyen: 'ma_huyen_thuong_tru',
    ten_xa: 'ma_xa_thuong_tru',
    ten_so_nha: 'so_nha_thuong_tru',
  };
  const summaryNoiOHienNay =
  {
    ten_tinh: 'ma_tinh_tam_tru',
    ten_huyen: 'ma_huyen_tam_tru',
    ten_xa: 'ma_xa_tam_tru',
    ten_so_nha: 'so_nha_tam_tru',
  };
  // form validation rules
  const validationSchema = Yup.object().shape({
    ho_ten: Yup.string().required("Vui lòng nhập"),
    nam_sinh: Yup.string().required("Vui lòng nhập"),
    gioi_tinh: Yup.string().required("Vui lòng chọn"),
    so_dien_thoai: Yup.string().required("Vui lòng nhập "),
    cmnd: Yup.string().required("Vui lòng nhập"),
    // so_nha_tam_tru: Yup.string().required("Vui lòng nhập"),
    // so_nha_thuong_tru: Yup.string().required("Vui lòng nhập"),
    ma_xa_thuong_tru: Yup.string().required("Vui lòng chọn"),
    ma_huyen_thuong_tru: Yup.string().required("Vui lòng chọn"),
    ma_huyen_tam_tru: Yup.string().required("Vui lòng chọn"),
    ma_xa_tam_tru: Yup.string().required("Vui lòng chọn "),
    ma_khu_cong_nghiep: Yup.string().required("Vui lòng chọn "),
    ma_cong_ty: Yup.string().required("Vui lòng chọn "),
  });

  // functions to build form returned by useForm() hook
  const { register, handleSubmit, reset, setValue, errors, control } = useForm({
    resolver: yupResolver(validationSchema),
  });
  //ham lay thong tin theo sdt
  const handelSoDienThoaiChange = (event) => {
    var str = event.target.value;
    if (str.length >= 10 && str.length < 12) {
      congNhanService.getThongTinCongNhantheoSDT(str).then((res) => {
        if (res.success && res.data != null) {
          fillDataToFormKhaiBao(res.data);
        }
      });
    }
  }

  const handleSelectClick = (name, value) => {
    setValue(name, value);
  };

  //get danh muc tinh
  useEffect(() => {
    commonService.getDanhMucTinh().then((res) => {
      if (res.success && res.data != null) {
        setdmTinh(res.data);
      }
    });
  }, []);

  // get cong nhan theo id
  useEffect(() => {
    if (keyForEdit) {
      congNhanService.getThongTinCongNhantheoID(keyForEdit).then((res) => {
        if (res.success && res.data != null) {
          // console.log('lllllll',res.data);
          fillDataToFormKhaiBao(res.data);
        }
      });
    }
  }, []);

  const fillDataToFormKhaiBao = (res) => {
    const fields = [
      "ho_ten",
      "gioi_tinh",
      "nam_sinh",
      "cmnd",
      "so_dien_thoai",
      "so_the",
      "so_nha_thuong_tru",
      "so_nha_tam_tru",
      "ma_xa_tam_tru",
      "ma_xa_thuong_tru",
      "ma_huyen_thuong_tru",
      "ma_huyen_tam_tru",
      "ma_cong_ty",
      "ma_khu_cong_nghiep",
      "ten_chu_tro",
      "so_dien_thoai_nhatro",
      "ten_bo_phan",
      "ma_huyen_thuong_tru"
    ];
    fields.forEach((field) => {
      setValue(field, res[field]);
    });
    console.log(res['ma_huyen_thuong_tru']);
    
    setthongTinCty({
      ma_cong_ty: res['ma_cong_ty'],
      ma_khu_cong_nghiep: res['ma_khu_cong_nghiep']
    });

    setdiaChiTamTru({
      ma_xa: res['ma_xa_tam_tru'],
      ma_huyen: res['ma_huyen_tam_tru'],
      ma_tinh: res['ma_tinh_tam_tru']
    });

    setMa_cong_nhan(res['ma_cong_nhan']);
    setdiaChiThuongTru({
      ma_tinh: res['ma_tinh_thuong_tru'],
      ma_huyen: res['ma_huyen_thuong_tru'],
      ma_xa: res['ma_xa_thuong_tru'],
    });
    setDatacheck({
      is_bluezone: res['is_bluezone'],
      is_vacxin: res['is_vacxin']
    })
  }

  function handledatasubmit(data){
    data.is_bluezone = datacheck['is_bluezone'];
    data.is_vacxin = datacheck['is_vacxin'];
    return data;
  }

  function onSubmit(data) {
    let dataSubmit = { ...data, ma_cong_nhan};
    createRecord(handledatasubmit(dataSubmit));
  }

  function updateRecord(data){
    
  }

  function createRecord(data) {
    setisLoadding(1);//thêm dòng để chống click liên thêm 2 3 lần
    setdataSuccessPage(data);
    congNhanService.modifyInfoCongNhan(data).then((res) => {
      //setisLoadding(0);
      reset({});
      setDatacheck({...datacheck, is_bluezone: 0, is_vacxin: 0})
      if (res["id"] === 1) {
        setisLoadding(0);
        alert("Khai báo Thông tin thành công!");
        setkhaibaoSuccess(1);
      } else alert(res["message"]);
    });
  }

  function handleTC(event) {
    setDatacheck({
      ...datacheck,
      [event.target.name]: event.target.checked ? 1 : 0,
    });
  }
  function handlechangevalue(e){
    setDatacheck({
      ...datacheck,
      [e.target.name]: e.target.checked ? 1 : 0,
    });
  }

  const listTC = [
    { title: "is_bluezone", name: "Đã cài đặt bluezone", value: 0, checked: false, id: 1 },
    { title: "is_vacxin", name: "Đã tiêm vacxin covid", value: 1, checked: false, id: 2 },
  ];

  return (
    <div>
      {isLoadding ? <Loading /> :
        <div>
          {khaibaoSuccess ? (
          <GuiToKhaiThanhCongCN data={dataSuccessPage} />
        ) : (
          <CRow>
            <CCol>
              <CCard>
                <CCardBody className="pt-0 pb-0">
                  <CCol xs="12">
                    {
                      keyForEdit ? <h3></h3> : (
                        <h3 style={{ textAlign: "center", margin: "1em" }}>
                          KHAI BÁO Y TẾ CÔNG NHÂN
                        </h3>
                      )
                    }
                  </CCol>
                  <CForm onSubmit={handleSubmit(onSubmit)}>
                    <CFormGroup row className="my-0">
                      <ThongTinCaNhan
                        register={register}
                        errors={errors}
                        onSdtChange={handelSoDienThoaiChange}
                      />
                      <CCol xs="12">
                        <h5>
                          Bạn đã ?
                        </h5>
                      </CCol>
                      <Col style={{ margin: "0.5em" }}>
                        <Col>
                          <CRow>
                            {listTC.map((item) => {
                              return (
                                <CCol xs="6" key={item.value}>
                                  <input
                                    key={item.value}
                                    className="form-check-input"
                                    type="checkbox"
                                    name={item.title}
                                    onChange={handleTC}
                                    id={item.value}
                                    checked={datacheck[item.title]}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="inlineRadioSot1"
                                  >
                                    {item.name}
                                  </label>
                                </CCol>
                              );
                            })}
                          </CRow>
                        </Col>
                      </Col>
                      <CCol xs="12">
                        <h5>Thông tin công ty</h5>
                      </CCol>
                      <ThongTinCongTy
                        register={register}
                        errors={errors}
                        control={control}
                        setValue={setValue}
                        thongtincty={thongTinCty}
                      />
                      <CCol xs="12">
                        <h5>Địa chỉ thường trú</h5>
                      </CCol>
                      <Diachi
                        handelOnChange={handleSelectClick}
                        errors={errors}
                        dataTinh={dmtinh}
                        register={register}
                        summary={summaryDiaChiThuongtru}
                        control={control}
                        diachiKhoitao={diaChiThuongTru}
                        labelRequired={"(*)"}
                      />
                      <CCol xs="12">
                        <h5>Nơi ở hiện nay</h5>
                      </CCol>
                      <Diachi
                        handelOnChange={handleSelectClick}
                        errors={errors}
                        dataTinh={dmtinh}
                        register={register}
                        summary={summaryNoiOHienNay}
                        control={control}
                        diachiKhoitao={diaChiTamTru}
                        labelRequired={"(*)"}
                      />
                      <CCol xs="12">
                        <h5>Thông tin phòng trọ (nếu ở trọ)</h5>
                      </CCol>
                      <CCol lg="6" xs="12">
                        <Controls.Input
                          label="Tên chủ nhà trọ"
                          name="ten_chu_tro"
                          type="text"
                          style={{ fontWeight: "bold", color: "black" }}
                          register={register}
                        />
                      </CCol>
                      <CCol lg="6" xs="12">
                        <Controls.Input
                          label="Số điện thoại chủ nhà trọ"
                          name="so_dien_thoai_nhatro"
                          type="number"
                          style={{ fontWeight: "bold", color: "black" }}
                          register={register}
                        />
                      </CCol>
                    </CFormGroup>
                    <div className="form-actions float-right">
                      <CButton
                        type="submit"
                        color="success"
                        value="btnLuu"
                        className="mr-2"
                        style={{ margin: "1em" }}
                      >
                        {keyForEdit ? "Lưu" : "Gửi thông tin"}
                      </CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>)}
        
        </div>
      }
    </div>

  );
}

