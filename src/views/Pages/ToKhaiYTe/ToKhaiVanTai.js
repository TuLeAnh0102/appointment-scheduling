import React, { useEffect, useState } from "react";
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
import Checkbox from "src/components/Controls/Checkbox";
import DiemDen from "src/components/KhaiBaoTaiXe/DiemDen";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { VanTaiService } from "src/services/vantai.service";
import { theoDoiCachLyService } from "../../../services";
import { commonService } from "../../../services";
import Controls from "src/components/Controls/Controls";
import { Loading } from "src/components/Loading/loading";
import Diachi from "src/components/ToKhaiYTe/Diachi";
import ThongTinTaiXe from "src/components/KhaiBaoTaiXe/ThongTinTaiXe";
import ThongTinXe from "src/components/KhaiBaoTaiXe/ThongTinXe";
import { useParams } from "react-router-dom";
import SuccessPageQR from "../GuiToKhaiThanhCong/SuccessPageQR";
import moment from "moment";
import { history } from 'src/helpers/history';
export default function ToKhaiVanTai(props) {

  const zuser_id = useParams().zaloID;
  const [dsDiemDen, setDSDiemDen] = useState([]);
  const { keyForEdit } = props;
  const [isLoadding, setisLoadding] = useState(0);
  const [loai_di_chuyen, setloai_di_chuyen] = useState(1);
  const [dmtinh, setdmTinh] = useState([]);
  const id = useParams().id;
  const [diemdenmacdinh, setdiemdenmacdinh] = useState("");
  const isAddMode = keyForEdit === 0 || keyForEdit === undefined ? true : false;
  const [record, setRecord] = useState({});
  const [success, setsuccess] = useState(false);
  const [loaixeDefault, setloaixeDefault] = useState('')
  const [dataSuccess, setdataSuccess] = useState({})
  const [diaChiTamTru, setdiaChiTamTru] = useState({
    ma_tinh: 70,
    ma_huyen: "",
    ma_xa: "",
  });
  const [diaChiNoidi, setdiaChiNoidi] = useState({
    ma_tinh: 70,
    ma_huyen: "",
    ma_xa: "",
  });

  const summaryNoidi = {
    ten_tinh: "tinh_noi_di",
    ten_huyen: "huyen_noi_di",
    ten_xa: "xa_noi_di",
    ten_so_nha: "so_nha_noi_di",
  };

  const summaryNoiOHienNay = {
    ten_tinh: "tinh_tam_tru",
    ten_huyen: "huyen_tam_tru",
    ten_xa: "xa_tam_tru",
    ten_so_nha: "so_nha_tam_tru",
  };
  // form validation rules
  const validationSchemaGiaoHang = Yup.object().shape({
    ho_ten: Yup.string().required("Vui lòng nhập"),
    nam_sinh: Yup.string().required("Vui lòng nhập"),
    gioi_tinh: Yup.string().required("Vui lòng chọn"),
    so_dien_thoai: Yup.string().required("Vui lòng nhập "),
    cmnd: Yup.string().required("Vui lòng nhập"),
    loai_phuong_tien: Yup.string().required("Vui lòng chọn...."),
    bien_so: Yup.string().required("Vui lòng nhập"),
    so_nguoi: Yup.string().required("Vui lòng nhập"),

    huyen_tam_tru: Yup.string().required("Vui lòng chọn"),
    xa_tam_tru: Yup.string().required("Vui lòng chọn"),
    huyen_noi_di: Yup.string().required("Vui lòng chọn"),
    xa_noi_di: Yup.string().required("Vui lòng chọn "),
  });

  const validationSchemaQuaCanh = Yup.object().shape({
    ho_ten: Yup.string().required("Vui lòng nhập"),
    nam_sinh: Yup.string().required("Vui lòng nhập"),
    // gioi_tinh: Yup.string().required("Vui lòng chọn"),
    so_dien_thoai: Yup.string().required("Vui lòng nhập "),
    cmnd: Yup.string().required("Vui lòng nhập"),
    loai_phuong_tien: Yup.string().required("Vui lòng chọn...."),
    bien_so: Yup.string().required("Vui lòng nhập biển số"),
    so_nguoi: Yup.string().required("Vui lòng nhập"),

    huyen_tam_tru: Yup.string().required("Vui lòng chọn"),
    xa_tam_tru: Yup.string().required("Vui lòng chọn"),
    noi_di: Yup.string().required("Vui lòng nhập"),
    noi_den: Yup.string().required("Vui lòng nhập"),
  });

  // functions to build form returned by useForm() hook
  const { register, handleSubmit, reset, setValue, errors, control } = useForm({
    resolver: yupResolver(
      loai_di_chuyen ? validationSchemaQuaCanh : validationSchemaGiaoHang
    ),
  });

  //ham lay thong tin theo sdt
  const handelSoDienThoaiChange = (event) => {
    var str = event.target.value;
    if (str.length === 10) {
      VanTaiService.getInfoVanTaiBySDT(str).then((res) => {
        if (res.success && res.data != null) {
          //console.log(res.data);
          fillDataToFormKhaiBao(res.data);
        }
      });
    }
  };
  const handleSelectClick = (name, value) => {
    setValue(name, value);
  };
  const handleSelecMulti = (value) => {
    if (value.length > 0) {
      var s = "";
      for (var i = 0; i < value.length; i++) {
        s = s + value[i].value + ",";
      }
      s = s.substring(0, s.length - 1);
    }
    //set ma điểm đến trong tỉnh = array
    setValue("diem_den", s);
  };

  //get danh muc tinh
  useEffect(() => {

    commonService.getDanhMucTinh().then((res) => {
      if (res.success && res.data != null) {
        setdmTinh(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (isAddMode) {
      reset({});
    } else {
      VanTaiService.getToKhaiVanTai(keyForEdit).then((res) => {
        if (res.success && res.data != null) {
          setloai_di_chuyen(res.data["loai_di_chuyen"]);
          fillDataToFormKhaiBao(res.data);
          setRecord(res.data);
        }
      });
    }
  }, [keyForEdit, isAddMode]);

  const handleOptions = (ds) => {
    let ls = [];
    for (const item of ds) {
      let tem = {};
      tem.label = item.ten_diem_den + " - " + item.ten_xa + " - " + item.ten_huyen;
      tem.value = item.ma_diem_den;
      ls.push(tem);
    }
    return ls;
  };

  // get danh sach chot kiem tra giao/nhan hang hoa
  useEffect(() => {
    VanTaiService.getDanhSachDiemKiemTra().then((res) => {
      if (res.success && res.data != null) {
        setDSDiemDen(handleOptions(res.data));
      }
    });
  }, []);

  const fillDataToFormKhaiBao = (res) => {
    const fields = [
      "ho_ten",
      "gioi_tinh",
      "nam_sinh",
      "cmnd",
      "so_dien_thoai",
      "so_nha_tam_tru",
      "bien_so",
      "loai_phuong_tien",
      "so_nguoi",
      "so_nha_noi_di",
      "diem_den_ngoai_ds",
      "noi_den",
      "noi_di",
      "tinh_noi_di",
      "huyen_noi_di",
      "xa_noi_di",
      "tinh_tam_tru",
      "huyen_tam_tru",
      "xa_tam_tru"
    ];
    fields.forEach((field) => {
      setValue(field, res[field]);
    });

    setdiaChiTamTru({
      ma_xa: res["xa_tam_tru"],
      ma_huyen: res["huyen_tam_tru"],
      ma_tinh: res["tinh_tam_tru"],
    });
    setdiaChiNoidi({
      ma_xa: res["xa_noi_di"],
      ma_huyen: res["huyen_noi_di"],
      ma_tinh: res["tinh_noi_di"],
    });
    setdiemdenmacdinh(res["diem_den"]);
    setloaixeDefault(res["loai_phuong_tien"]);

  };
  function onSubmit(data) {
    // giao hang : 0
    // quá cảnh: 1
    let dataSubmit = { ...data, loai_di_chuyen, zalo_user_id: zuser_id };
    return isAddMode
      ? createRecord(dataSubmit, id)
      : updateRecord(keyForEdit, dataSubmit);
  }

  const updateRecord = (id, data) => {
    let dataSubmit = { ...data, id };
    VanTaiService.UpdateKhaiBaoVanTai(dataSubmit).then((res) => {
      //setisLoadding(0);
      if (res["id"] === 1) {
        setisLoadding(0);
        history.go(0);
        alert("Cập nhật thông tin thành công!");
      } else alert(res["message"]);
    });
  };
  function createRecord(data, noi_khai_bao_van_tai) {
    data.bien_so  = data['bien_so'].replace(/[&\/\\#,+()$~%.'":*?<>{}\s]/g, '');
    data.noi_khai_bao_van_tai = noi_khai_bao_van_tai;
    setdataSuccess(data);
    setisLoadding(1); //thêm dòng để chống click liên thêm 2 3 lần
    VanTaiService.PostKhaiBaoVanTai(data).then((res) => {
      //setisLoadding(0);
      reset({});
      if (res["success"]) {
        setisLoadding(0);
        // alert("Khai báo Thông tin thành công!");
        setsuccess(true);
        if (parseInt(zuser_id)) {
          let qr_image = `https://chart.googleapis.com/chart?cht=qr&chl=TKVT_` + res.data.id + `&chs=160x160`
          sendMessToZalo(zuser_id, data.ho_ten, data.so_dien_thoai, getDateTimeNow(), qr_image);
        }

      } else alert(res["message"]);
    });
  }

  const getDateTimeNow = () => {
    let newDate = new Date();
    let date = newDate.getDate();
    if (date < 10) date = "0" + date;
    let month = newDate.getMonth() + 1;
    if (month < 10) month = "0" + month;
    let year = newDate.getFullYear();

    let timenow = (year + "-" + month + "-" + date);
    return timenow;
  };

  const sendMessToZalo = (zuser_id, ho_ten, so_dien_thoai, start_time, qr_image) => {

    theoDoiCachLyService.declare_confirm(zuser_id, ho_ten, so_dien_thoai, start_time, qr_image).then(res => {
      console.log(res);
    })
  }

  const OnTrongNgoaiTinhChange = (e) => {
    if(e.target.name ==='loai_di_chuyen_trong')
    {
      if (e.target.checked) {
        setloai_di_chuyen(0);
        setValue('loai_di_chuyen',0);
      } else {
        setloai_di_chuyen(1);
        setValue('loai_di_chuyen',1);
      }
    }
    else
    {
      if (e.target.checked) {
        setloai_di_chuyen(1);
        setValue('loai_di_chuyen',1);
      } else {
        setloai_di_chuyen(0);
        setValue('loai_di_chuyen',0);
      }
    }

  };

  return (
    <div>
      {isLoadding ? (
        <Loading />
      ) : (
        <div> {success ? <SuccessPageQR data={dataSuccess} /> :
          <CRow>
            <CCol>
              <CCard>
                <CCardBody className="pt-0 pb-0">
                  <CCol xs="12">
                    {keyForEdit ? (
                      <h3></h3>
                    ) : (
                      <h3 style={{ textAlign: "center", margin: "1em" }}>
                        TỜ KHAI VẬN TẢI
                      </h3>
                    )}
                  </CCol>
                  <CForm onSubmit={handleSubmit(onSubmit)}>
                    <CFormGroup row className="my-0">
                      <CCol xs="12">
                        <Checkbox
                          label={"Tôi đi ngang Bình Phước"}
                          name={"loai_di_chuyen_ngoai"}
                          onChange={OnTrongNgoaiTinhChange}
                          value={loai_di_chuyen}
                        />
                      </CCol>
                      <CCol xs="12">
                        <Checkbox
                          label={"Tôi di chuyển trong Bình Phước"}
                          name={"loai_di_chuyen_trong"}
                          onChange={OnTrongNgoaiTinhChange}
                          value={!loai_di_chuyen}
                        />
                      </CCol>
                      <ThongTinTaiXe
                        register={register}
                        errors={errors}
                        onSdtChange={handelSoDienThoaiChange}
                      />
                      <ThongTinXe
                        register={register}
                        errors={errors}
                        loaixemd={loaixeDefault}
                      ></ThongTinXe>

                      <CCol xs="12">
                        <h5>Chỗ ở hiện nay</h5>
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
                        <h5>Địa điểm xuất phát từ: </h5>
                      </CCol>
                      {loai_di_chuyen ? (
                        <CCol xs="12">
                          <Controls.Input
                            name="noi_di"
                            type="text"
                            style={{ fontWeight: "bold", color: "black" }}
                            register={register}
                            error={errors.cmnd}
                          />
                        </CCol>
                      ) : (
                        <Diachi
                          handelOnChange={handleSelectClick}
                          errors={errors}
                          dataTinh={dmtinh}
                          register={register}
                          summary={summaryNoidi}
                          control={control}
                          diachiKhoitao={diaChiNoidi}
                          labelRequired={"(*)"}
                        />
                      )}
                      <CCol xs="12">
                        <h5>Nơi đến: </h5>
                      </CCol>
                      {loai_di_chuyen ? (
                        <CCol xs="12">
                          <Controls.Input
                            name="noi_den"
                            type="text"
                            style={{ fontWeight: "bold", color: "black" }}
                            register={register}
                            error={errors.cmnd}
                          />
                        </CCol>
                      ) : (
                        <>
                          <DiemDen
                            handelOnChange={handleSelecMulti}
                            errors={errors}
                            register={register}
                            control={control}
                            labelRequired={"(*)"}
                            options={dsDiemDen}
                            diemdenmacdinh={diemdenmacdinh}
                          />
                        </>
                      )}
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
                  <div
                    id="InToKhai"
                    hidden={true}
                    style={{
                      fontFamily: "arial, sans-serif",
                      fontSize: "10px",
                    }}
                  >
                    <CRow
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <div className="col-10">
                        <h4
                          style={{ textAlign: "center", marginBottom: "0.5em" }}
                        >
                          CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM <br />
                          Độc lập - Tự Do - Hạnh Phúc
                        </h4>
                      </div>
                      <div className="2">
                        <img
                          src={
                            `https://chart.googleapis.com/chart?cht=qr&chl=TKVT_` +
                            keyForEdit +
                            `&chs=160x160&chld=L|0`
                          }
                          className="qr-code img-thumbnail img-responsive"
                          style={{ width: "70px" }}
                        />
                      </div>
                    </CRow>
                    <CRow>
                      <table
                        style={{ borderCollapse: "collapse", width: "100%" }}
                      ><tbody>
                          <tr>
                            <td style={{ width: "50%" }}>
                              Tôi tên: <b>{record.ho_ten}</b>
                            </td>
                            <td style={{ width: "25%" }}>
                              Năm sinh : <b>{record.nam_sinh}</b>
                            </td>
                            <td style={{ width: "25%" }}></td>
                          </tr>
                        </tbody>
                      </table>
                    </CRow>
                    <CRow>
                      <table
                        style={{ borderCollapse: "collapse", width: "100%" }}
                      ><tbody>
                          <tr>
                            <td style={{ width: "40%" }}>
                              CMND/CCCD/hộ chiếu: <b>{record.cmnd}</b>
                            </td>
                            <td style={{ width: "20%" }}>
                              Giới tính :{" "}
                              <b>{record.gioi_tinh === 1 ? "Nam" : "Nữ"}</b>
                            </td>
                            <td style={{ width: "40%" }}>
                              Số điện thoại : <b>{record.so_dien_thoai}</b>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </CRow>
                    <CRow>Chổ ở hiện nay : {record.str_dia_chi_hien_tai}</CRow>
                    <CRow>
                      <table
                        style={{ borderCollapse: "collapse", width: "100%" }}
                      >
                        <tbody>
                          <tr>
                            <td style={{ width: "50%" }}>
                              Là tài xế xe Biển số : <b>{record.bien_so}</b>
                            </td>
                            <td style={{ width: "50%" }}>
                              Số người trên xe: <b>{record.so_nguoi}</b> Người.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </CRow>
                    {record.loai_di_chuyen === 1 && (
                      <div>
                        <CRow>Địa điểm xuất phát : {record.noi_di}</CRow>
                        <CRow>Nơi đến : {record.noi_den}</CRow>
                        <CRow>
                          <b>
                            Tôi cam kết không đón, trả khách; không dừng đổ xe
                            trên dịa bàn tỉnh Bình Phước và Chấp hành quy định
                            của UBND tỉnh, sở GTVT tỉnh Bình Phước về phòng,
                            chống dịch Covid-19.
                          </b>
                        </CRow>
                        <CRow>
                          Trường hợp bất khả kháng phải thông báo cho Trực ban
                          phòng CSGT - Công an tỉnh qua số điện thoại:{" "}
                          <b>0947809393</b> hoặc Thanh tra giao thông - Sở Giao
                          thông vận tải số điện thoại <b>0913752119</b> để được
                          hướng dẫn xử lý.
                        </CRow>
                      </div>
                    )}
                    {record.loai_di_chuyen === 0 && (
                      <div>
                        <CRow>Địa điểm xuất phát : {record.str_dia_chi_noi_di}</CRow>
                        <CRow>Danh sách địa điểm đến</CRow>
                        <CRow>
                          <table
                            style={{ borderCollapse: "collapse", width: "100%" }}
                          >
                            <tbody>
                              <tr>
                                <th style={{
                                  border: "1px solid #dddddd",
                                  textAlign: "center",
                                  padding: "1px",
                                  width: "10%" }}>
                                  STT
                                </th>
                                <th style={{
                                  border: "1px solid #dddddd",
                                  textAlign: "center",
                                  padding: "1px",
                                  width: "30%" }}>
                                  Tên địa phương đến
                                </th>
                                <th style={{
                                  border: "1px solid #dddddd",
                                  textAlign: "center",
                                  padding: "1px",
                                  width: "60%" }}>
                                  Địa chỉ
                                </th>
                              </tr>
                              {record.ds_diem_den != null && record.ds_diem_den.map((item, i) => {
                                return (
                                  <tr key = {i}>
                                    <td style={{
                                        border: "1px solid #dddddd",
                                        textAlign: "center",
                                        padding: "1px",
                                        width: "10%"
                                      }} >
                                      {i + 1}
                                    </td>
                                    <td style={{
                                      border: "1px solid #dddddd",
                                      textAlign: "center",
                                      padding: "1px",
                                      width: "30%" }}>
                                      {item.ten_diem_den}
                                    </td>
                                    <td style={{
                                      border: "1px solid #dddddd",
                                      textAlign: "left",
                                      padding: "1px",
                                      width: "60%" }}>
                                      {item.dia_chi}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </CRow>
                      </div>
                    )}

                    <CRow>
                      Tôi xin chịu trách nhiệm trước Pháp luật nếu không đúng
                      nội dung đã cam kết.
                    </CRow>
                    <CRow>
                      <table
                        style={{
                          borderCollapse: "collapse",
                          width: "100%",
                        }}
                      >
                        <tbody>
                          <tr>
                            <td
                              style={{
                                textAlign: "left",
                                width: "40%",
                                padding: "1px",
                              }}
                            ></td>
                            <td
                              style={{
                                textAlign: "center",
                                width: "60%",
                                padding: "1px",
                                marginBottom: "10px",
                              }}
                            >
                              {record.ten_chot_van_tai != null &&
                                <span>{record.ten_chot_van_tai} , </span>
                              }
                              {record.ngay_tao != null &&
                                <span>{moment(record.ngay_tao).format("HH")}{" Giờ "}
                                {moment(record.ngay_tao).format("mm")} {" Phút, "}
                                Ngày {moment(record.ngay_tao).format("DD")} Tháng{" "}
                                {moment(record.ngay_tao).format("MM")} Năm{" "}
                                {moment(record.ngay_tao).format("yyyy")} <br /> NGƯỜI KHAI <br />{" "}
                                Ký, ghi rõ họ tên</span>
                              }

                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </CRow>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        }
        </div>
      )}
    </div>
  );
}
