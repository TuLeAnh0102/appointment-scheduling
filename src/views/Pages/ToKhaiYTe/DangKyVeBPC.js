import React, { useEffect, useState, useRef } from "react";
import {
  CCard,
  CRow,
  CButton,
  CCardBody,
  CForm,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
} from "@coreui/react";
import "react-table-v6/react-table.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { VeBPCService } from "src/services/vebinhphuoc.service";
import { commonService } from "../../../services";
import Controls from "src/components/Controls/Controls";
import { Loading } from "src/components/Loading/loading";
import Diachi from "src/components/ToKhaiYTe/Diachi";
import ThongTinCaNhan from "src/components/KhaiBaoCongNhan/ThongTinCaNhan";
import ThongTinNguoiThan from "src/components/KhaiBaoCongNhan/ThongTinNguoiThan";
import DangKyVeBPCThanhCong from "../GuiToKhaiThanhCong/DangKyVeBPCThanhCong";
import { Form, Col, Row } from "react-bootstrap";
import Checkbox from "src/components/Controls/Checkbox";

export default function DangKyVeBPC(props) {
  const { keyForEdit } = props
  const [datacheck, setDatacheck] = useState({
    is_bluezone: 0,
    is_vacxin: 0
  })
  const [isLoadding, setisLoadding] = useState(0);
  const [ma_to_khai, setMa_to_khai] = useState(0);
  const [dmtinh, setdmTinh] = useState([]);
  const [nhom_uu_tien, setnhom_uu_tien] = useState(0);
  const [doi_tuong_covid, setdoi_tuong_covid] = useState('');
  const [text_doi_tuong_covid, settextdoi_tuong_covid] = useState('');
  const [doituongCovidChecked, setdoituongCovidChecked] = useState({
    co_covid: false,
    khong_covid: false
  })
  const [checkBoxChecked, setcheckBoxChecked] = useState({
    nhom_1: false,
    nhom_2: false,
    nhom_3: false
  })
  const [dmtinhFilter, setdmTinhFilter] = useState([
    {
      title: 'Thành Phố Hồ Chí Minh', id: 79,
    },
    {
      title: 'Tỉnh Bình Dương', id: 74,
    },
    {
      title: 'Tỉnh Đồng nai', id: 75,
    }
  ]);
  const [dataSuccessPage, setdataSuccessPage] = useState({});
  const [khaibaoSuccess, setkhaibaoSuccess] = useState(0);
  const [thongTinCty, setthongTinCty] = useState('');
  const [is_xet_nghiem_covid, setis_xet_nghiem_covid] = useState(0);
  const [dang_ky_khach_san, setdang_ky_khach_san] = useState(0);
  const [diaChiTamTru, setdiaChiTamTru] = useState({
    ma_tinh: 79,
    ma_huyen: '',
    ma_xa: '',
  });
  const [diaChiThuongTru, setdiaChiThuongTru] = useState({
    ma_tinh: 70,
    ma_huyen: '',
    ma_xa: '',
  });
  const [diaChiThuongTruNguoithan, setdiaChiThuongTruNguoiThan] = useState({
    ma_tinh: 70,
    ma_huyen: '',
    ma_xa: '',
  });
  const summaryDiaChiThuongtru =
  {
    ten_tinh: 'tinh_thuong_tru_bp',
    ten_huyen: 'huyen_thuong_tru_bp',
    ten_xa: 'xa_thuong_tru_bp',
    ten_so_nha: 'ap_thuong_tru_bp',
  };
  const summaryDiaChiThuongtruNT =
  {
    ten_tinh: 'nguoi_than_tinh_bp',
    ten_huyen: 'nguoi_than_huyen_bp',
    ten_xa: 'nguoi_than_xa_bp',
    ten_so_nha: 'nguoi_than_ap_bp',
  };
  const summaryNoiOHienNay =
  {
    ten_tinh: 'tinh_tam_tru',
    ten_huyen: 'huyen_tam_tru',
    ten_xa: 'xa_tam_tru',
    ten_so_nha: 'ap_tam_tru',
  };
  // form validation rules
  const validationSchema = Yup.object().shape({
    ho_ten: Yup.string().required("Vui lòng nhập"),
    nam_sinh: Yup.string().required("Vui lòng nhập"),
    gioi_tinh: Yup.string().required("Vui lòng chọn"),
    // nhom_uu_tien: Yup.string().required("Vui lòng chọn"),
    hinh_thuc_noi_o: Yup.string().required("Vui lòng chọn"),
    so_dien_thoai: Yup.string().required("Vui lòng nhập "),
    cmnd: Yup.string().required("Vui lòng nhập"),
    ly_do_ve_bpc: Yup.string().required("Vui lòng nhập"),

    nguoi_than_ho_ten: Yup.string().required("Vui lòng nhập"),
    nguoi_than_moi_qh: Yup.string().required("Vui lòng nhập"),
    nguoi_than_nam_sinh: Yup.string().required("Vui lòng nhập"),
    nguoi_than_so_dien_thoai: Yup.string().required("Vui lòng nhập "),
    nguoi_than_cmnd: Yup.string().required("Vui lòng nhập"),

    nguoi_than_xa_bp: Yup.string().required("Vui lòng chọn"),
    nguoi_than_huyen_bp: Yup.string().required("Vui lòng chọn...."),

    xa_thuong_tru_bp: Yup.string().required("Vui lòng chọn"),
    huyen_thuong_tru_bp: Yup.string().required("Vui lòng chọn...."),

    huyen_tam_tru: Yup.string().required("Vui lòng chọn"),
    xa_tam_tru: Yup.string().required("Vui lòng chọn "),
  });

  // functions to build form returned by useForm() hook
  const { register, handleSubmit, reset, setValue, errors, control } = useForm({
    resolver: yupResolver(validationSchema),
  });
  // console.log(errors)
  //ham lay thong tin theo sdt
  const handelSoDienThoaiChange = (event) => {
    // var str = event.target.value;
    // if (str.length >= 10 && str.length < 12) {
    //   congNhanService.getThongTinCongNhantheoSDT(str).then((res) => {
    //     if (res.success && res.data != null) {
    //       console.log(res.data);
    //       fillDataToFormKhaiBao(res.data);
    //     }
    //   });
    // }
  }
  const checkboxCovidChange = (e) => {
    if (e.target.checked) {
      setis_xet_nghiem_covid(1);
    }
    else {
      setis_xet_nghiem_covid(0);
    }
  }

  const checkKhachSanChange = (e) => {
    if (e.target.checked) {
      setdang_ky_khach_san(1);
    }
    else {
      setdang_ky_khach_san(0);
    }
  }

  const handleCheckBox = (e) => {
    if (e.target.name === "nhom_1") {
      setnhom_uu_tien(1);
      setcheckBoxChecked({
        nhom_1: !checkBoxChecked.nhom_1,
        nhom_2: false,
        nhom_3: false
      })
    }
    if (e.target.name === "nhom_2") {
      setnhom_uu_tien(2);
      setcheckBoxChecked({
        nhom_1: false,
        nhom_2: !checkBoxChecked.nhom_2,
        nhom_3: false
      })
    }
    if (e.target.name === "nhom_3") {
      setnhom_uu_tien(3);
      setcheckBoxChecked({
        nhom_1: false,
        nhom_2: false,
        nhom_3: !checkBoxChecked.nhom_3
      })
    }
    if (e.target.checked === false) {
      setnhom_uu_tien(0);
    }
  }
  const handleBoxDoiTuongCovid = (e) => {

    if (e.target.name === "co_covid") {
      setdoi_tuong_covid(1);
      setdoituongCovidChecked({
        co_covid: !doi_tuong_covid.co_covid,
        khong_covid: false
      });
    }
    else
    {
      setdoi_tuong_covid(0);
      setdoituongCovidChecked({
        co_covid: false,
        khong_covid: !doi_tuong_covid.khong_covid
      });
    }
  }
  const handleTextCovidChange = (e) => {
    settextdoi_tuong_covid(e.target.value);
  };
  const handleSelectClick = (name, value) => {
    setValue(name, value);
  };

  //get danh muc tinh
  // useEffect(() => {
  //   commonService.getDanhMucTinh().then((res) => {
  //     if (res.success && res.data != null) {
  //       setdmTinh(res.data);
  //     }
  //   });
  // }, []);

  // get cong nhan theo id
  // useEffect(() => {
  //   if (keyForEdit) {
  //     congNhanService.getThongTinCongNhantheoID(keyForEdit).then((res) => {
  //       if (res.success && res.data != null) {
  //         // console.log('lllllll',res.data);
  //         fillDataToFormKhaiBao(res.data);
  //       }
  //     });
  //   }
  // }, []);

  // const fillDataToFormKhaiBao = (res) => {
  //   const fields = [
  //     "ho_ten",
  //     "gioi_tinh",
  //     "nam_sinh",
  //     "cmnd",
  //     "so_dien_thoai",
  //     "so_the",
  //     "so_nha_thuong_tru",
  //     "so_nha_tam_tru",
  //     "ma_cong_ty",
  //     "ma_khu_cong_nghiep",
  //     "ten_chu_tro",
  //     "so_dien_thoai_nhatro",
  //     "ten_bo_phan",
  //     "huyen_thuong_tru"
  //   ];
  //   fields.forEach((field) => {
  //     setValue(field, res[field]);
  //   });
  //   setdiaChiThuongTru({
  //     ma_tinh: res['tinh_thuong_tru'],
  //     ma_huyen: res['huyen_thuong_tru'],
  //     ma_xa: res['xa_thuong_tru'],
  //   })
  //   setthongTinCty({
  //     ma_cong_ty: res['ma_cong_ty'],
  //     ma_khu_cong_nghiep: res['ma_khu_cong_nghiep']
  //   });

  //   setdiaChiTamTru({
  //     ma_xa: res['xa_tam_tru'],
  //     ma_huyen: res['huyen_tam_tru'],
  //     ma_tinh: res['tinh_tam_tru']
  //   });
  //   //setMa_to_khai(res['ma_to_khai']);

  //   setDatacheck({
  //     is_bluezone: res['is_bluezone'],
  //     is_vacxin: res['is_vacxin']
  //   })
  // }

  // function handledatasubmit(data) {
  //   data.is_bluezone = datacheck['is_bluezone'];
  //   data.is_vacxin = datacheck['is_vacxin'];
  //   return data;
  // }

  function onSubmit(data) {
    let dataSubmit = { ...data, is_xet_nghiem_covid, dang_ky_khach_san, ma_to_khai, nhom_uu_tien,doi_tuong_covid,text_doi_tuong_covid };
    if (nhom_uu_tien === 0 ) {
      return alert("Vui lòng chọn nhóm đối tượng ưu tiên!");
    }
    if (doi_tuong_covid === '' || (doi_tuong_covid===1 && text_doi_tuong_covid ==='')) {
      return alert("Bạn có đang là F0 F1 F2? Nếu có vui long ghi rõ!");
    }
    return createRecord(dataSubmit);
  }


  function createRecord(data) {
    console.log(data);
    setisLoadding(1);//thêm dòng để chống click liên thêm 2 3 lần
    setdataSuccessPage(data);
    VeBPCService.modifyInfoVeBPC(data).then((res) => {
      setisLoadding(0);
      reset({});
      if (res["id"] === 1) {
        // setisLoadding(0);
        setkhaibaoSuccess(1);
        alert("Đăng ký Thông tin thành công!");
      } else alert(res["message"]);
    });
  }

  // function handleTC(event) {
  //   setDatacheck({
  //     ...datacheck,
  //     [event.target.name]: event.target.checked ? 1 : 0,
  //   });
  // }
  // function handlechangevalue(e){
  //   setDatacheck({
  //     ...datacheck,
  //     [e.target.name]: e.target.checked ? 1 : 0,
  //   });
  // }
  const hidenfieldTinh = { display: 'none' };
  const listNoiO = [
    { id: 1, title: "Ở Phòng trọ" },
    { id: 2, title: "Ở Nhà thuê" },
    { id: 3, title: "Ở Ký túc xá/nhà tập thể/nhà ở cho NLĐ" },
    { id: 4, title: "Ở nhà riêng" }
  ];

  return (
    <div>
      {isLoadding ? <Loading /> :
        <div>
          {khaibaoSuccess ? (
            <DangKyVeBPCThanhCong data={dataSuccessPage} />
          ) : (
            <CRow>
              <CCol>
                <CCard>
                  <CCardBody className="pt-0 pb-0">
                    <CCol xs="12">
                      {
                        keyForEdit ? <h3></h3> : (
                          <>
                            <h3 style={{ textAlign: "center", marginTop: "1em", }}>
                              MẪU ĐĂNG KÝ
                            </h3>
                            <h5 style={{ textAlign: "center", fontWeight: 'bold', marginBottom: "1em", }}>
                              Công dân có nguyện vọng về Bình Phước
                            </h5>
                          </>
                        )
                      }
                    </CCol>
                    <CForm onSubmit={handleSubmit(onSubmit)}>
                      <CFormGroup row className="my-0">
                        <ThongTinCaNhan
                          register={register}
                          errors={errors}
                          onSdtChange={handelSoDienThoaiChange}
                          // hidenFieldGioiTinh={hidenfieldTinh}
                          placeholderSdt={'Vui lòng nhập chính xác số điện thoại để liên hệ đưa đón'}
                        />
                        <CCol lg="6" xs="12">
                          <Controls.Input
                            label="Nghề nghiệp:"
                            name="nghe_nghiep"
                            type="text"
                            style={{ fontWeight: "bold", color: "black" }}
                            register={register}
                          />
                        </CCol>
                        {/* <CCol xs="12">
                          <h5>Địa chỉ thường trú tại Bình Phước</h5>
                        </CCol> */}
                        <CCol lg="12" xs="12">
                          {/* <Controls.Select
                            label="Thuộc nhóm đối tượng ưu tiên:"
                            name="nhom_uu_tien"
                            options={listNhomUuTien}
                            register={register}
                            error={errors.gioi_tinh}
                            labelRequired={'(*)'}
                          />
                          <CCol xs="12"> */}
                          <h5 > Thuộc nhóm đối tượng ưu tiên<span style={{ color: 'red' }}>(*)</span></h5>
                          <div style={{ border: 'ridge 1px', }} >
                            <Checkbox
                              label={"Người già, trẻ em, phụ nữ mang thai, Người đi khám chữa bệnh, người thăm thân nhân, công tác; lao động thuộc hộ nghèo, hộ cận nghèo; lao động là thân nhân của người có công cách mạng; lao động đang hưởng chính sách bảo trợ xã hội hàng tháng"}
                              name={"nhom_1"}
                              onChange={handleCheckBox}
                              value={checkBoxChecked.nhom_1}
                              styles={{ marginTop: '10px', marginLeft: '5px', fontWeight: 'normal' }}
                            />
                            <Checkbox
                              label={"Lao động tự do, lao động bị mất việc làm"}
                              name={"nhom_2"}
                              onChange={handleCheckBox}
                              value={checkBoxChecked.nhom_2}
                              styles={{ marginTop: '10px', marginLeft: '5px', fontWeight: 'normal' }}
                            />
                            <Checkbox
                              label={"Học sinh, sinh viên"}
                              name={"nhom_3"}
                              onChange={handleCheckBox}
                              value={checkBoxChecked.nhom_3}
                              styles={{ marginTop: '10px', marginLeft: '5px', fontWeight: 'normal' }}
                            />
                            {!nhom_uu_tien ? <CLabel style={{ color: 'red', fontStyle: 'italic' }}>Chọn 1 trong 3 nhóm trên</CLabel> : ""}
                          </div>
                          {/* </CCol> */}
                        </CCol>

                        <CCol xs="12">
                          <h5>Địa chỉ tạm trú tại nơi đón:</h5>
                        </CCol>
                        <Diachi
                          handelOnChange={handleSelectClick}
                          errors={errors}
                          dataTinh={dmtinhFilter}
                          register={register}
                          summary={summaryNoiOHienNay}
                          control={control}
                          diachiKhoitao={diaChiTamTru}
                          labelRequired={"(*)"}
                          hidenfieldAp={hidenfieldTinh}
                        />

                        <CCol lg="12" xs="12">
                          <Controls.Select
                            label="Hình thức nơi ở tạm trú:"
                            name="hinh_thuc_noi_o"
                            options={listNoiO}
                            register={register}
                            error={errors.hinh_thuc_noi_o}
                            labelRequired={'(*)'}
                          />
                        </CCol>
                        <CCol xs="12">
                          <h5>Địa chỉ thường trú tại Bình Phước</h5>
                        </CCol>
                        <Diachi
                          handelOnChange={handleSelectClick}
                          errors={errors}
                          dataTinh={dmtinhFilter}
                          register={register}
                          summary={summaryDiaChiThuongtru}
                          control={control}
                          diachiKhoitao={diaChiThuongTru}
                          labelRequired={"(*)"}
                          hidenfieldTinh={hidenfieldTinh}
                        />
                        <CCol xs="12" style={{ marginTop: '10px' }}>
                          <h5>Địa điểm đăng ký đón:</h5>
                        </CCol>
                        <CCol lg="12" xs="12">
                          <Controls.Input
                            label="Địa điểm:"
                            name="diem_don"
                            type="text"
                            style={{ fontWeight: "bold", color: "black" }}
                            register={register}
                          />
                        </CCol>
                        <CCol lg="6" xs="12">
                          <CLabel></CLabel>
                          <div style={{ border: 'ridge 1px' }}>
                            <Checkbox
                              label={"Đã xét nghiệm covid-19"}
                              name={"is_xet_nghiem_covid"}
                              styles={{ marginTop: '10px', marginLeft: '5px' }}
                              onChange={checkboxCovidChange}
                              value={is_xet_nghiem_covid}
                            />
                          </div>
                        </CCol>
                        <CCol lg="6" xs="12">
                          <Controls.Input
                            label="Ngày xét nghiệm"
                            name="ngay_xet_nghiem"
                            type="text"
                            style={{ fontWeight: "bold", color: "black" }}
                            register={register}
                          />
                        </CCol>
                        <CCol lg="12" xs="12">
                          <h5> Bản thân có thuộc đối tượng F0, F1 ,F2:<span style={{ color: 'red' }}>(*)</span></h5>
                          <div style={{ border: 'ridge 1px', }} >
                            <div>
                              <label className="container" style={{ display: 'inline', marginTop: '10px', marginLeft: '10px', fontWeight: 'normal' }}>Có (ghi rõ đối tượng nào):
                                <input type="checkbox" name="co_covid" onChange={handleBoxDoiTuongCovid} checked={doituongCovidChecked.co_covid}/>
                                <span className="checkmark"></span>
                              </label>
                              <input type='text' onChange={handleTextCovidChange} style={{fontWeight: 'bold'}}></input>
                            </div>
                            <Checkbox
                              label={"Không"}
                              name={"khong_covid"}
                              onChange={handleBoxDoiTuongCovid}
                              value={doituongCovidChecked.khong_covid}
                              styles={{ marginTop: '10px', marginLeft: '5px', fontWeight: 'normal' }}
                            />
                            {(doi_tuong_covid==='') ? <CLabel style={{ color: 'red', fontStyle: 'italic' }}>Chọn Có khoặc Không, nếu Có ghi rõ!</CLabel> : ""}
                          </div>
                        </CCol>
                        <CCol lg="12" xs="12">
                          <Controls.Input
                            label="Lưu ý về sức khỏe(bệnh mãn tính, dị ứng....):"
                            name="suc_khoe_ca_nhan"
                            type="text"
                            style={{ fontWeight: "bold", color: "black" }}
                            register={register}
                          />
                        </CCol>
                        <ThongTinNguoiThan
                          register={register}
                          errors={errors}
                          onSdtChange={handelSoDienThoaiChange}
                        />
                        <CCol xs="12">
                          <h5>Địa chỉ người thân tại Bình Phước:</h5>
                        </CCol>
                        <Diachi
                          handelOnChange={handleSelectClick}
                          errors={errors}
                          dataTinh={dmtinhFilter}
                          register={register}
                          summary={summaryDiaChiThuongtruNT}
                          control={control}
                          diachiKhoitao={diaChiThuongTruNguoithan}
                          labelRequired={"(*)"}
                          hidenfieldTinh={hidenfieldTinh}
                        />
                        <CCol xs="12">
                          <h5>Lý do đăng ký trở về Bình Phước </h5>
                        </CCol>
                        <CCol lg="12" xs="12">
                          <Controls.Input
                            label="Lý do:"
                            name="ly_do_ve_bpc"
                            type="text"
                            style={{ fontWeight: "bold", color: "black" }}
                            register={register}
                            error={errors.ly_do_ve_bpc}
                            labelRequired={"(*)"}
                          />
                        </CCol>
                        <CCol xs="12"></CCol>
                        <CCol xs="12">
                          <h5>Nội dung đăng ký thêm(nếu có)</h5>
                        </CCol>
                        <CCol lg="12" xs="12">
                          <Controls.Input
                            label="Vật dụng, phương tiện đăng ký vận chuyển về Bình Phước:"
                            name="hang_hoa"
                            type="text"
                            style={{ fontWeight: "bold", color: "black" }}
                            register={register}
                          />
                        </CCol>
                        <CCol xs="12">
                          <div style={{ border: 'ridge 1px' }}>
                            <Checkbox
                              label={"Đăng ký cách ly tại khách sạn có thu phí"}
                              name={"dang_ky_khach_san"}
                              onChange={checkKhachSanChange}
                              value={dang_ky_khach_san}
                              styles={{ marginTop: '10px', marginLeft: '5px' }}
                            />
                          </div>
                        </CCol>
                        <CCol lg="12" xs="12">
                          <Controls.Input
                            label="Yêu cầu khác:"
                            name="yeu_cau_khac"
                            type="text"
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
                          {keyForEdit ? "Lưu" : "Gửi thông tin đăng ký"}
                        </CButton>
                      </div>
                    </CForm>

                  </CCardBody>
                  <CRow className="justify-content-md-center">
                      <CCol lg="12" xs="12" className="text-center">
                        <span>@Design by <b>TTCNTT-VNPT Bình Phước</b> &copy; 2021.</span>
                      </CCol>
                    </CRow>
                </CCard>
              </CCol>
            </CRow>)}
        </div>
      }
    </div>

  );
}

