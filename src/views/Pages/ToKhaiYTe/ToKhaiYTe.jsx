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
import { alertAction , setInfoHuman} from "src/actions";
import { theoDoiCachLyService } from "../../../services";
import { danhSachToKhaiService } from "../../../services/danhSachToKhai.service";
import { commonService } from "../../../services";
import { listGioiTinh, listChot } from "../../../datamock/commonData";
import { Col } from "react-bootstrap";
import moment from "moment";
import { Loading } from "src/components/Loading/loading";
import { history } from 'src/helpers/history';
import DiaChivaAp from '../../../components/ToKhaiYTe/DiaChivaAp'
// const getStatus = (status) => {
//   switch (status) {
//     case "1":
//       return "success";
//     case "0":
//       return "danger";
//     default:
//       return "primary";
//   }
// };
import GuiToKhaiThanhCong from '../GuiToKhaiThanhCong/GuiToKhaiThanhCong'
import { useParams } from "react-router-dom";
import Select from "react-select";
import MauInToKhai from './MauInTokhai';

const getDateTimeNow = () => {
  let newDate = new Date();
  let date = newDate.getDate();
  if (date < 10) date = "0" + date;
  let month = newDate.getMonth() + 1;
  if (month < 10) month = "0" + month;
  let year = newDate.getFullYear();

  let timenow = ( year + "-" + month + "-" + date);
  return timenow;
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

const listLoaiPhuongTien = [
  { id: "Xe_May", title: "Xe máy" },
  { id: "Xe_oto", title: "Xe otô" },
  { id: "Xe_Tai", title: "Xe tải" },
  { id: "Xe_Khach", title: "Xe khách" },
  { id: "Xe_Dap", title: "Xe đạp" },
];

const listLSPN = [
  {
    title: "phoi_nhiem_dong_vat",
    name: "Đến trang trại chăn nuôi buôn bán động vật sống/cơ sở giết mổ động vật tiếp xúc động vật: ",
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

function ToKhaiYTePage(props) {
  // console.log(useParams());
  const zuser_id = useParams().zaloID
  const { keyForEdit } = props;
  // const [maChot, setMaChot] = useState(0);
  const dispatch = useDispatch();
  const [isLoadding, setisLoadding] = useState(0);
  const [khaobaoSuccess, setkhaobaoSuccess] = useState(0);
  const [btnUpdateAndConfirm, setbtnUpdateAndConfirm] = useState(0);
  const [textButtonSubmit, settextButtonSubmit] = useState('Gửi tờ khai');
  //const [openPopupPartial, setOpenPopupPartial] = useState(false);
  const [datacheck, setDatacheck] = useState({
    ngay_khoi_hanh_phuong_tien: getDateTimeNow(),
    loai_phuong_tien: "",
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
  const isAddMode = keyForEdit === 0 || keyForEdit === undefined ? true : false;
  const [record, setRecord] = useState({});
  //const [quoc_tich, setQuocTich] = useState([]);
  const [sucessPage, setsucessPage] = useState({})

  //set gia tri mac dinh
  const [giatrimacdinh, setGiatriMacDinh] = useState({
    ma_tinh: 70,
    ma_huyen: "",
    ma_xa: "",
    tinh_bat_dau: 70,
    huyen_bat_dau: "",
    xa_bat_dau: "",
    tinh_ket_thuc: 70,
    huyen_ket_thuc: "",
    xa_ket_thuc: "",
    ngayhientai: getDateTimeNow(),
  });

  let user = JSON.parse(localStorage.getItem("user"));

  const [dmtinh, setdmTinh] = useState([]);

  const [dmHuyen, setDmHuyen] = useState([]);
  const [dmXa, setDmXa] = useState([]);
  const [dmHuyenBatDau, setdmHuyenBatDau] = useState([]);
  const [dmXaBatDau, setdmXaBatDau] = useState([]);
  const [dmHuyenKetThuc, setdmHuyenKetThuc] = useState([]);
  const [dmXaKetThuc, setdmXaKetThuc] = useState([]);
  const {id} = useParams().id;
  var btnUpdateConfimclick=0;
  const [urlQR, setUrlQR] = useState('')

  //thêm ấp
  const [diaChiDen, setdiaChiDen] = useState({
    ma_tinh: 70,
    ma_huyen: "",
    ma_xa: "",
    ma_ap: ""
  });
  const summaryNoiden = {
    ten_tinh: "tinh_ket_thuc",
    ten_huyen: "huyen_het_thuc",
    ten_xa: "xa_ket_thuc",
    ten_ap: "ap_ket_thuc",
    ten_so_nha: "so_nha_noi_di",
  };
  const handleSelectClick = (name, value) => {
    setValue(name, value);
  };
  //end thêm ấp
  // form validation rules
  const validationSchema = Yup.object().shape({
    ho_ten: Yup.string().required("Vui lòng nhập"),
    nam_sinh: Yup.string().required("Vui lòng nhập"),
    gioi_tinh: Yup.string().required("Vui lòng chọn"),
    so_dien_thoai: Yup.string().required("Vui lòng nhập "),
    cmnd: Yup.string().required("Vui lòng nhập"),

    //so_nha_dich_te: Yup.string().required("Vui lòng nhập"),
    //noi_lay_mau: Yup.string().required("Vui lòng chọn"),
    loai_phuong_tien: Yup.string().required("Vui lòng chọn "),
    //lich_su_dich_te: Yup.string().required("Vui lòng nhập"),

    so_nha: Yup.string().required("Vui lòng nhập"),
    ma_xa: Yup.string().required("Vui lòng chọn"),
    ma_huyen: Yup.string().required("Vui lòng chọn "),

    //tinh_bat_dau: Yup.string().required("Vui lòng chọn"),
    huyen_bat_dau: Yup.string().required("Vui lòng chọn"),
    xa_bat_dau: Yup.string().required("Vui lòng chọn "),

    //tinh_ket_thuc: Yup.string().required("Vui lòng chọn"),
    huyen_ket_thuc: Yup.string().required("Vui lòng chọn"),
    xa_ket_thuc: Yup.string().required("Vui lòng chọn "),
  });

  // functions to build form returned by useForm() hook
  const { register, handleSubmit, reset, setValue, errors,control } = useForm({
    resolver: yupResolver(validationSchema),
  });
  //ham lay thong tin theo sdt
  const handelSoDienThoaiChange =(event) =>{
    var str = event.target.value;
    if (str.length >= 10 && str.length < 12)
    {
      theoDoiCachLyService.getThongTinCachLytheoSDT(str).then((res) => {
        if (res.success && res.data != null) {
          fillDataToFormKhaiBao(res);
        }
      });
      // commonService.getDanhMucHuyen(70).then(res =>{
      //   if (res.success && res.data != null) {
      //     setdmHuyenBatDau(res.data);
      //     setdmHuyenKetThuc(res.data)
      //   }
      // })
    }
  }
  const updateAndConfirm =( id, data, ma_chot) =>
  {
    setisLoadding(1);
    theoDoiCachLyService.updateTheoDoiCachLy(data, id)
      .then((res) => {
        if (res["id"] === 1) {
          //alert("Cập nhật thông tin thành công! ");
         // history.go(0);
        danhSachToKhaiService.xacNhanToKhaiYTe(id, ma_chot)
        .then((res) => {
            setisLoadding(0);
            if (res.success) {
                alert("Cập nhật và Xác minh tờ khai y tế thành công");
                history.push('/danh-sach-to-khai-y-te');
            }else{
              alert("Không thể xác nhận tờ khai y tế")
            }
          });
        } else alert(res["message"]);

      });
  }
  const handleChange = (event) => {
    setDatacheck({
      ...datacheck,
      [event.target.name]: event.target.value,
    });
  };
  function handleTinhChange(e) {
    setGiatriMacDinh({
      ...giatrimacdinh,
      [e.target.name]: e.target.value,
    });
  }
  function handleHuyenChange(e) {
    setGiatriMacDinh({
      ...giatrimacdinh,
      [e.target.name]: e.target.value,
    });
  }
  function handleXaChange(e) {
    setGiatriMacDinh({
      ...giatrimacdinh,
      [e.target.name]: e.target.value,
    });
  }
  //get danh muc tinh
  useEffect(() => {
    commonService.getDanhMucTinh().then((res) => {
      if (res.success && res.data != null) {
        setdmTinh(res.data);
      }
    });
    const script = document.createElement("script");

    script.src = "https://zjs.zdn.vn/zalo/Zalo.Extensions.min.js";
    script.async = true;

    document.body.appendChild(script);

  }, []);

  //get danh muc tinh
  // useEffect(() => {
  //   // if(props.match.params.id !== null || props.match.params.id !== undefined)
  //   // {
  //   //   console.log(props.match.params.id);
  //   //   setMaChot(props.match.params.id);
  //   // }
  // }, []);
  //diem lien he
  useEffect(() => {
    commonService.getDanhMucHuyen(giatrimacdinh.ma_tinh).then((res) => {
      if (res.success && res.data != null) {
        setDmHuyen(res.data);
      }
    });
  }, [giatrimacdinh.ma_tinh]);

  useEffect(() => {
    if (giatrimacdinh.ma_huyen) {
      commonService.getDanhMucXa(giatrimacdinh.ma_huyen).then((res) => {
        if (res.success && res.data != null) {
          setDmXa(res.data);
        }
      });
    }
  }, [giatrimacdinh.ma_huyen]);
  //diem bat dau
  useEffect(() => {
    commonService.getDanhMucHuyen(giatrimacdinh.tinh_bat_dau).then((res) => {
      if (res.success && res.data != null) {
        setdmHuyenBatDau(res.data);
      }
    });
  }, [giatrimacdinh.tinh_bat_dau]);

  useEffect(() => {
    if (giatrimacdinh.huyen_bat_dau) {
      commonService.getDanhMucXa(giatrimacdinh.huyen_bat_dau).then((res) => {
        if (res.success && res.data != null) {
          setdmXaBatDau(res.data);
        }
      });
    }
  }, [giatrimacdinh.huyen_bat_dau]);
  //diemket thuc
  useEffect(() => {
    commonService.getDanhMucHuyen(giatrimacdinh.tinh_ket_thuc).then((res) => {
      if (res.success && res.data != null) {
        setdmHuyenKetThuc(res.data);
      }
    });
  }, [giatrimacdinh.tinh_ket_thuc]);

  useEffect(() => {
    if (giatrimacdinh.huyen_ket_thuc) {
      commonService.getDanhMucXa(giatrimacdinh.huyen_ket_thuc).then((res) => {
        if (res.success && res.data != null) {
          setdmXaKetThuc(res.data);
        }
      });
    }
  }, [giatrimacdinh.huyen_ket_thuc]);

  const fillDataToFormKhaiBao =(res) =>
  {
    const fields = [
      "ho_ten",
      "gioi_tinh",
      "nam_sinh",
      "quoc_tich",
      "cmnd",
      "so_dien_thoai",
      "so_nha",
      "ma_xa",
      "ma_huyen",
      "ma_tinh",
      "lich_su_dich_te",
      "loai_phuong_tien",
      "so_hieu_phuong_tien",
      "so_ghe_phuong_tien",
      "tinh_bat_dau",
      "huyen_bat_dau",
      "xa_bat_dau",
      "so_nha_bat_dau",
      "tinh_ket_thuc",
      "huyen_ket_thuc",
      "xa_ket_thuc",
      "so_nha_ket_thuc",
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
      //"noi_lay_mau",
    ];
    var tc_obj = {};
    var lspn_obj = {};
    fields.forEach((field) => {
      if (field.includes("tc_")) {
        tc_obj[field] = res.data[field]?1:0;
      }
      if (field === "vacxin") {
        refContainer.current.value = res.data[field] ? res.data[field] : "" ;
      }
      if (
        field === "phoi_nhiem_dong_vat" ||
        field === "cham_soc_nguoi_benh"
      ) {
        lspn_obj[field] = res.data[field]?1:0;
      }
      else {
        setValue(field, res.data[field]);
      }
    });
    setDatacheck({ ...tc_obj });
    setdatacheckLSPN({ ...lspn_obj });
    let tem = {}
      tem['ma_tinh'] = res.data["ma_tinh"]
      tem['ma_huyen'] = res.data["ma_huyen"]
      tem['ma_xa'] = res.data["ma_xa"]
      tem['tinh_bat_dau'] = res.data["tinh_bat_dau"] ? res.data["tinh_bat_dau"]  : 70
      tem['huyen_bat_dau'] = res.data["huyen_bat_dau"]
      tem['xa_bat_dau'] = res.data["xa_bat_dau"]
      tem['tinh_ket_thuc'] = res.data["tinh_ket_thuc"] ? res.data["tinh_ket_thuc"] : 70
      tem['huyen_ket_thuc'] = res.data["huyen_ket_thuc"]
      tem['xa_ket_thuc'] = res.data["xa_ket_thuc"]
      tem['ngayhientai'] = moment(res.data["ngay_khoi_hanh_phuong_tien"]).format("yyyy-MM-DD")
    setGiatriMacDinh(tem);
    let infohuman = {};
    infohuman['sdt'] = res.data["so_dien_thoai"];
    infohuman['hoten'] = res.data["ho_ten"];
    dispatch(setInfoHuman(infohuman));
  }

  function handleUrlQR(){
    setUrlQR(keyForEdit);
  }

  useEffect(() => {
    if (isAddMode) {
      reset({});
    } else {
      handleUrlQR();
      settextButtonSubmit('Lưu tạm');
      setbtnUpdateAndConfirm(1);
      theoDoiCachLyService.getTheoDoiCachLy(keyForEdit).then((res) => {
        if (res.success && res.data != null) {
          fillDataToFormKhaiBao(res);
          setRecord(res.data)
        }
      });
    }
  }, [keyForEdit, isAddMode]);

  function onSubmit(data) {
    let dataSubmit = { ...data, ...datacheck, ...datacheckLSPN };
    handleDataSubmit(dataSubmit);

    if(btnUpdateConfimclick===1)
    {
      let user = JSON.parse(localStorage.getItem("user"));
      let ma_chot = 0;
      if(user.ma_chot && user.ma_chot)
      {
        ma_chot = user.ma_chot;
      }
      return updateAndConfirm( keyForEdit, dataSubmit, ma_chot);
    }
    else
    {
      return isAddMode ? createRecord(dataSubmit) : updateRecord(keyForEdit, dataSubmit);
    }

    //return createRecord(dataSubmit);
  }

  function handleDataSubmit(dataSubmit){
    dataSubmit["vacxin"] = refContainer.current.value;
    setNoiLayMau(dataSubmit);
    setsucessPage(dataSubmit);
  }

  function setNoiLayMau(data){
    if(localStorage.getItem('user')){
      data['noi_lay_mau'] = JSON.parse(localStorage.getItem('user')).ma_chot;
    }else{
      data['noi_lay_mau'] = id;
    }
  }

  function createRecord(data) {
    data.userId = zuser_id;
    setisLoadding(1);//thêm dòng để chống click liên thêm 2 3 lần
    theoDoiCachLyService.insertTheoDoiCachLy(data).then((res) => {
      setisLoadding(0);
      reset({});
      setGiatriMacDinh({
        ma_tinh: 70,
        ma_huyen: "",
        ma_xa: "",
        tinh_bat_dau: 70,
        huyen_bat_dau: "",
        xa_bat_dau: "",
        tinh_ket_thuc: 70,
        huyen_ket_thuc: "",
        xa_ket_thuc: "",
        ngayhientai: getDateTimeNow(),
      });
      setDatacheck({
        ngay_khoi_hanh_phuong_tien: getDateTimeNow(),
        loai_phuong_tien: "",
        tc_sot: 0,
        tc_ho: 0,
        tc_kho_tho: 0,
        tc_dau_hong: 0,
        tc_non: 0,
        tc_tieu_chay: 0,
        tc_xuat_huyet: 0,
        tc_noi_ban: 0,
      });
      setdatacheckLSPN({
        phoi_nhiem_dong_vat: 0,
        cham_soc_nguoi_benh: 0,
      });
      if (res.success) {
        setisLoadding(0);
        setkhaobaoSuccess(1);
        // if (+zuser_id){
        //   let qr_image = `https://chart.googleapis.com/chart?cht=qr&chl=TKYT_` + res.data.id + `&chs=160x160`
        //   sendMessToZalo(zuser_id, data.ho_ten, data.so_dien_thoai, getDateTimeNow(), qr_image);
        //   // alert("Khai báo Y Tế thành công. Vui lòng đến gặp nhân viên Y Tế để xác nhận thông tin!");
        // }
      } else alert(res["message"]);
    });
  }

  const sendMessToZalo = (zuser_id, ho_ten, so_dien_thoai, start_time, qr_image) => {
    theoDoiCachLyService.declare_confirm(zuser_id, ho_ten, so_dien_thoai, start_time, qr_image).then(res => {
      console.log(res);
    })
  }

  function updateRecord(id, data) {
    return theoDoiCachLyService
      .updateTheoDoiCachLy(data, id)
      .then((res) => {
        if (res["id"] === 1) {
          alert("Cập nhật thông tin thành công! ");
          history.go(0);
        } else alert(res["message"]);

      })
      .catch(
        console.log("Lỗi cập nhật thông tin!")
      );
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

  function chiDinhDichTe(ma_chi_dinh, time) {
    let strResult = "";
    switch (ma_chi_dinh) {
      case "1":
        strResult =
          "Tự theo dõi sức khỏe trong vòng 21 ngày , kể từ ngày " +
          moment(time).format("DD") +
          " tháng " +
          moment(time).format("MM") +
          " năm " +
          moment(time).format("YYYY") +
          ". Trong thời gian này phải thực hiện nghiêm thông điệp 5K của Bộ Y Tế, liên hệ ngay với Trạm Y Tế cấp xã (qua điện thoại) khi có dấu hiệu nghi ngờ mắc Covic 19 (sốt, ho, đau họng,...)";
        break;
      case "2":
        strResult =
          "Cách ly tại nhà, nơi lưu trú trong vòng 21 ngày, kể từ ngày " +
          moment(time).format("DD") +
          " tháng " +
          moment(time).format("MM") +
          " năm " +
          moment(time).format("YYYY") +
          ", liên hệ ngay với trạm y tế xã (qua điện thoại) khi có dấu hiệu nghi ngờ mắc Covic 19 (sốt, ho, đau họng,...)";
        break;
      case "3":
        strResult =
          "Cách ly tập trung trong vòng 21 ngày, kể từ ngày " +
          moment(time).format("DD") +
          " tháng " +
          moment(time).format("MM") +
          " năm " +
          moment(time).format("YYYY") +
          ", làm theo hướng dẫn của nhân viên y tế tại chốt";
        break;
      case "4":
        strResult =
          "Giữ liên lạc qua số điện thoại đã khai báo. Nhân viên chốt kiểm dịch sẽ liên hệ ông/bà khi có kết quả xét nghiệm ";
        break;
      case "5":
        strResult =
          "Theo dõi sức khỏe tại nhà, nơi lưu trú trong vòng 7 ngày, kể từ ngày " +
          moment(time).format("DD") +
          " tháng " +
          moment(time).format("MM") +
          " năm " +
          moment(time).format("YYYY") +
          ", liên hệ ngay với trạm y tế xã (qua điện thoại) khi có dấu hiệu nghi ngờ mắc Covic 19 (sốt, ho, đau họng,...)";
        break;
      case "6":
        strResult =
          "Cách ly tại nhà, nơi lưu trú trong vòng 14 ngày, kể từ ngày " +
          moment(time).format("DD") +
          " tháng " +
          moment(time).format("MM") +
          " năm " +
          moment(time).format("YYYY") +
          ", liên hệ ngay với trạm y tế xã (qua điện thoại) khi có dấu hiệu nghi ngờ mắc Covic 19 (sốt, ho, đau họng,...)";
        break;
      case "7":
        strResult =
          "Cách ly tại nhà, nơi lưu trú trong vòng 7 ngày, kể từ ngày " +
          moment(time).format("DD") +
          " tháng " +
          moment(time).format("MM") +
          " năm " +
          moment(time).format("YYYY") +
          ", liên hệ ngay với trạm y tế xã (qua điện thoại) khi có dấu hiệu nghi ngờ mắc Covic 19 (sốt, ho, đau họng,...)";
        break;
      case "8":
        strResult =
          "Cách ly tập trung trong vòng 14 ngày, kể từ ngày " +
          moment(time).format("DD") +
          " tháng " +
          moment(time).format("MM") +
          " năm " +
          moment(time).format("YYYY") +
          ", làm theo hướng dẫn của nhân viên y tế tại chốt";
        break;
      default:
      // code block
    }
    return strResult;
  }

  function convertTimeFullVN(time) {
    let resultTime = moment(time);
    return (
      resultTime.format("HH") +
      " giờ " +
      resultTime.format("mm") +
      " phút, ngày " +
      resultTime.format("DD") +
      " tháng " +
      resultTime.format("MM") +
      " năm " +
      resultTime.format("YYYY")
    );
  }

  const getContext = () => {
    window.ZaloExtensions.getContext({ "oaId": '1852635313062286479' },
      function success(thread_context) {
        alert(JSON.stringify(thread_context));

      },
      function error(err) {
        alert('aaaa')
      });
  }


  return (
    <div>
      {isLoadding? <Loading/> :
        <div>
        {khaobaoSuccess ? (
          <GuiToKhaiThanhCong data={sucessPage} />
        ) : (
          <CRow>
            <CCol>
              <CCard>
                <CCardBody className="pt-0 pb-0">
                  <CCol xs="12">
                    <h3 style={{ textAlign: "center", margin: "1em" }}>
                      TỜ KHAI Y TẾ
                    </h3>

                  </CCol>
                  <CForm onSubmit={handleSubmit(onSubmit)}>
                    <CFormGroup row className="my-0">
                      {/*START THÔNG TIN NGƯỜI KHAI */}
                      <CCol xs="12">
                        <h3>Thông tin khai báo</h3>
                            {/* <button onClick={sendMessToZalo('4825777684790044142', '1', '1','1')} >Click</button> */}
                      </CCol>
                          <CCol lg="6" xs="12">
                        <Controls.Input
                          key="so_dien_thoai"
                          label="Số điện thoại"
                          name="so_dien_thoai"
                          type="number"
                          onChange={handelSoDienThoaiChange}
                          style={{ fontWeight: "bold", color: "black" }}
                          register={register}
                          error={errors.so_dien_thoai}
                        />
                      </CCol>
                          <CCol lg="6" xs="12">
                        <Controls.Input
                          key="cmnd"
                          label="CMND/CCCD/HC"
                          name="cmnd"
                          type="text"
                          style={{ fontWeight: "bold", color: "black" }}
                          register={register}
                          error={errors.cmnd}
                        />
                      </CCol>
                          <CCol lg="6" xs="12">
                        <Controls.Input
                          label="Họ tên"
                          name="ho_ten"
                          key="ho_ten"
                          type="text"
                          style={{ fontWeight: "bold", color: "black" }}
                          register={register}
                          error={errors.ho_ten}
                        />
                      </CCol>
                          <CCol lg="6" xs="12">
                        <Controls.Input
                          label="Năm sinh"
                          name="nam_sinh"
                          key="nam_sinh"
                          type="number"
                          style={{ fontWeight: "bold", color: "black" }}
                          error={errors.nam_sinh}
                          register={register}
                        />
                      </CCol>

                      <CCol xs="6">
                        <Controls.Select
                          label="Giới tính"
                          name="gioi_tinh"
                          key="gioi_tinh"
                          options={listGioiTinh()}
                          register={register}
                          error={errors.gioi_tinh}
                        />
                      </CCol>
                      <CCol xs="6">
                        <Controls.Input
                          label="Quốc tịch"
                          name="quoc_tich"
                          key="quoc_tich"
                          type="text"
                          defaultValue="Việt Nam"
                          register={register}
                          error={errors.quoc_tich}
                        />
                      </CCol>
                      <CCol xs="12">
                        <h5>Địa chỉ liên hệ</h5>
                      </CCol>
                          <CCol lg="6" xs="12">
                        <Controls.Select
                          label="Tỉnh/Tp"
                          name="ma_tinh"
                          onChange={handleTinhChange}
                          options={dmtinh}
                          idDefault={giatrimacdinh.ma_tinh}
                          error={errors.ma_tinh}
                          register={register}
                        />
                      </CCol>

                          <CCol lg="6" xs="12">
                        <Controls.Select
                          label="Quận/Huyện/TX"
                          name="ma_huyen"
                          onChange={handleHuyenChange}
                          options={dmHuyen}
                          idDefault={giatrimacdinh.ma_huyen}
                          error={errors.ma_huyen}
                          register={register}
                        />
                      </CCol>
                          <CCol lg="6" xs="12">
                        <Controls.Select
                          label="Xã/Phường/TT"
                          name="ma_xa"
                          onChange={handleXaChange}
                          options={dmXa}
                          idDefault={giatrimacdinh.ma_xa}
                          error={errors.ma_xa}
                          register={register}
                        />
                      </CCol>
                          <CCol lg="6" xs="12">
                        <Controls.Input
                          label="Số nhà,thôn/ấp/tổ"
                          name="so_nha"
                          type="text"
                          style={{ fontWeight: "bold", color: "black" }}
                          register={register}
                          error={errors.so_nha}
                        />
                      </CCol>
                      {/*END THÔNG TIN NGƯỜI KHAI234 */}

                      {/*START THÔNG TIN DI CHUYỂN */}
                      <CCol xs="12">
                        <h3>Thông tin di chuyển</h3>
                      </CCol>
                      <CCol xs="12">
                        <h5>Thông tin đi lại</h5>
                      </CCol>
                          <Col lg="6" xs="6">
                        <Controls.Input
                          label="Ngày khởi hành"
                          name="ngay_khoi_hanh_phuong_tien"
                          key="ngay_khoi_hanh_phuong_tien"
                          type="date"
                          onChange={handleChange}
                          defaultValue={giatrimacdinh.ngayhientai}
                          register={register}
                          error={errors.ngay_khoi_hanh_phuong_tien}
                        />
                      </Col>

                          <CCol lg="6" xs="6">
                        <Controls.Select
                          label="Loại phương tiện"
                          name="loai_phuong_tien"
                          key="loai_phuong_tien"
                          onChange={handleChange}
                          options={listLoaiPhuongTien}
                          error={errors.loai_phuong_tien}
                          register={register}
                        />
                      </CCol>
                      <CCol xs="6">
                        <Controls.Input
                          label="Biển số"
                          name="so_hieu_phuong_tien"
                          type="text"
                          style={{ fontWeight: "bold", color: "black" }}
                          register={register}
                          error={errors.so_hieu_phuong_tien}
                        />
                      </CCol>
                      <CCol xs="6">
                        <Controls.Input
                          label="Số ghế(nếu có)"
                          name="so_ghe_phuong_tien"
                          type="number"
                          style={{ fontWeight: "bold", color: "black" }}
                          register={register}
                          error={errors.so_ghe_phuong_tien}
                        />
                      </CCol>
                      <CCol xs="12">
                        <h5>Địa điểm khởi hành</h5>
                      </CCol>
                          <CCol lg="6" xs="12">
                        <Controls.Select
                          label="Tỉnh/Tp"
                          name="tinh_bat_dau"
                          onChange={handleTinhChange}
                          options={dmtinh}
                          idDefault={giatrimacdinh.tinh_bat_dau}
                          error={errors.tinh_bat_dau}
                          register={register}
                        />
                      </CCol>
                          <CCol lg="6" xs="12">
                        <Controls.Select
                          label="Quận/Huyện/TX"
                          name="huyen_bat_dau"
                          onChange={handleHuyenChange}
                          options={dmHuyenBatDau}
                          idDefault={giatrimacdinh.huyen_bat_dau}
                          error={errors.huyen_bat_dau}
                          register={register}
                        />
                      </CCol>
                          <CCol lg="6" xs="12">
                        <Controls.Select
                          label="Xã/phường"
                          name="xa_bat_dau"
                          options={dmXaBatDau}
                          idDefault={giatrimacdinh.xa_bat_dau}
                          error={errors.xa_bat_dau}
                          onChange={handleXaChange}
                          register={register}
                        />
                      </CCol>
                          <Col lg="6" xs="12">
                        <Controls.Input
                          label="Số nhà,thôn/ấp/tổ"
                          name="so_nha_bat_dau"
                          key="so_nha_bat_dau"
                          type="text"
                          style={{ fontWeight: "bold", color: "black" }}
                          register={register}
                          error={errors.so_nha_bat_dau}
                        />
                      </Col>
                      <CCol xs="12">
                        <h5>Địa điểm đến</h5>
                      </CCol>
                      <CCol lg="6" xs="12">
                        <Controls.Select
                          label="Tỉnh/Tp"
                          name="tinh_ket_thuc"
                          key="tinh_ket_thuc"
                          onChange={handleTinhChange}
                          options={dmtinh}
                          idDefault={giatrimacdinh.tinh_ket_thuc}
                          error={errors.tinh_ket_thuc}
                          register={register}
                        />
                      </CCol>
                      <CCol lg="6" xs="12">
                        <Controls.Select
                          label="Quận/Huyện/TX"
                          name="huyen_ket_thuc"
                          key="huyen_ket_thuc"
                          onChange={handleHuyenChange}
                          options={dmHuyenKetThuc}
                          idDefault={giatrimacdinh.huyen_ket_thuc}
                          error={errors.huyen_ket_thuc}
                          register={register}
                        />
                      </CCol>
                          <CCol lg="6" xs="12">
                        <Controls.Select
                          label="Xã/phường"
                          name="xa_ket_thuc"
                          key="xa_ket_thuc"
                          onChange={handleXaChange}
                          options={dmXaKetThuc}
                          idDefault={giatrimacdinh.xa_ket_thuc}
                          error={errors.xa_bat_dau}
                          register={register}
                        />
                      </CCol>
                          <Col lg="6" xs="12">
                        <Controls.Input
                          label="Số nhà,thôn/ấp/tổ"
                          name="so_nha_ket_thuc"
                          key="so_nha_ket_thuc"
                          type="text"
                          style={{ fontWeight: "bold", color: "black" }}
                          register={register}
                          error={errors.so_nha_ket_thuc}
                        />
                      </Col>
                      {/* <DiaChivaAp
                        handelOnChange={handleSelectClick}
                        errors={errors}
                        dataTinh={dmtinh}
                        register={register}
                        summary={summaryNoiden}
                        control={control}
                        diachiKhoitao={diaChiDen}
                        labelRequired={"(*)"}
                      /> */}

                      <CCol xs="12">
                        <h3>Thông tin y tế</h3>
                      </CCol>
                      <Col xs="12">
                        <Controls.Input
                          label="Trong vòng 14 ngày qua anh/chị có đến tỉnh/vùng/quốc gia nào không? (Nếu có ghi rõ):"
                          name="lich_su_dich_te"
                          key="lich_su_dich_te"
                          type="text"
                          style={{ fontWeight: "bold", color: "black" }}
                          register={register}
                        />
                      </Col>
                      <CCol xs="12">
                        <span>
                          Trong vòng 7 ngày có thấy các dấu hiệu nào sau đây không
                          ?
                        </span>
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
                        <span>
                          Liệt kê các loại vacxin hoặc chế phẩm y tế đã sử dụng:
                        </span>
                      </CCol>
                      <CCol
                        xs="12"
                        style={{ margin: "0.5em", boxSizing: "border-box" }}
                      >
                        <textarea
                          rows="3"
                          name="comment"
                          id="txt_vacxin"
                          ref={refContainer}
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            width: "100%",
                          }}
                        />
                      </CCol>
                      <CCol xs="12">
                        <span>Lịch sử phơi nhiễm:</span>
                      </CCol>
                      <Col style={{ margin: "0.5em" }}>
                        <Col>
                          <CRow>
                            {listLSPN.map((item) => {
                              return (
                                <Col xs="12" key={item.value}>
                                  <input
                                    key={item.value}
                                    className="form-check-input"
                                    type="checkbox"
                                    name={item.title}
                                    onChange={handleLSPN}
                                    id={item.value}
                                    checked={datacheckLSPN[item.title]}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="inlineRadioSot1"
                                  >
                                    {item.name}
                                  </label>
                                </Col>
                              );
                            })}
                          </CRow>
                        </Col>
                      </Col>
                    </CFormGroup>
                    <div className="form-actions float-right">
                      <CButton
                        onClick ={() => (btnUpdateConfimclick = 0)}
                        type="submit"
                        color={btnUpdateAndConfirm? "secondary" :"success"}
                        value ="btnLuu"
                        className="mr-2"
                        style={{ margin: "1em" }}
                      >
                        {textButtonSubmit}
                      </CButton>
                      {
                        btnUpdateAndConfirm? <CButton
                          type="submit"
                          color="success"
                          value="btnUpdateConfirm"
                          className="mr-2"
                          style={{ margin: "1em" }}
                          onClick ={() => (btnUpdateConfimclick = 1)}
                        >
                          Lưu và xác nhận thông tin
                        </CButton> : ""
                      }
                    </div>
                  </CForm>
                  {/* code in to chỉ định kiểm dịch */}
                  <div
                    id="InToKhai"
                    hidden={true}
                    style={{ fontFamily: "arial, sans-serif", fontSize: "10px"}}
                  >
                        <CRow style={{ display: "flex", justifyContent: "space-around"}}>
                          <div className="col-9">
                            <h5 style={{ textAlign: "center", marginBottom: "0.5em" }}>
                              TỜ KHAI Y TẾ <br />
                              (Ban hành kèm theo Nghị định số 89/2018/NĐ-CP Ngày
                              25/06/2018 của Chính Phủ)
                            </h5>
                          </div>
                          <div className="3">
                            <img src={`https://chart.googleapis.com/chart?cht=qr&chl=https%3A%2F%2Fkiemdich.binhphuoc.gov.vn%2F%23%2Fthong-tin-to-khai%2F` + keyForEdit + `&chs=160x160&chld=L|0`}
                              className="qr-code img-thumbnail img-responsive" style={{width: "70px"}}/>
                          </div>
                    </CRow>
                    <CRow>
                      <table
                        style={{ borderCollapse: "collapse", width: "100%" }}
                      >
                        <tr>
                            <td style={{ width: "50%" }}>
                            Họ tên: <b>{record.ho_ten}</b>
                          </td>
                              <td style={{ width: "25%" }}>
                                Năm sinh : <b>{record.nam_sinh}</b>
                              </td>
                              <td style={{ width: "25%" }}>
                            Điện thoại : <b>{record.so_dien_thoai}</b>{" "}
                          </td>


                        </tr>
                      </table>
                    </CRow>
                    <CRow>
                      <table
                        style={{ borderCollapse: "collapse", width: "100%" }}
                      >
                        <tr>
                              <td style={{ width: "50%" }}>
                                CMND/CCCD/hộ chiếu:{" "} <b>{record.cmnd}</b>
                              </td>
                              <td style={{ width: "25%" }}>
                                Giới tính :{" "}
                                <b>{record.gioi_tinh === 1 ? "Nam" : "Nữ"}</b>
                              </td>
                          <td style={{ width: "25%" }}>
                                Quốc tịch : <b>{record.quoc_tich}</b>
                          </td>

                        </tr>
                      </table>
                    </CRow>

                    <CRow>
                      <span>
                        <b>Thông tin đi lại </b>
                      </span>
                    </CRow>
                    <CRow>
                      <table
                        style={{ borderCollapse: "collapse", width: "100%" }}
                      >
                        <tr>
                          <td style={{ width: "33%" }}>
                            Phương tiện : {record.loai_phuong_tien}{" "}
                          </td>
                          <td style={{ width: "33%" }}>
                            Số hiệu phương tiện : {record.so_hieu_phuong_tien}{" "}
                          </td>
                          <td style={{ width: "33%" }}>
                            Số ghế (nếu có): {record.so_ghe_phuong_tien}{" "}
                          </td>
                        </tr>
                      </table>
                    </CRow>
                    <CRow>
                      <table
                        style={{ borderCollapse: "collapse", width: "100%" }}
                      >
                        <tr>
                          <td style={{ width: "50%" }}>
                            Ngày khởi hành :{" "}
                            {(record.ngay_khoi_hanh_phuong_tien === undefined && record.ngay_khoi_hanh_phuong_tien === null)
                              ? ""
                              : moment(record.ngay_khoi_hanh_phuong_tien).format(
                                  "DD/MM/yyyy"
                                )}
                          </td>
                          <td style={{ width: "50%" }}>
                            Ngày nhập cảnh : {record.ngay_nhap_canh_phuong_tien}
                          </td>
                        </tr>
                      </table>
                    </CRow>
                    <CRow>
                      <span>
                        Địa điểm khởi hành : {record.str_dia_chi_bat_dau}
                      </span>
                    </CRow>
                    <CRow>
                      <span>Địa điểm đến : {record.str_dia_chi_ket_thuc}</span>
                    </CRow>
                    <CRow>
                      <span>
                        Trong vòng 14 ngày vừa qua, anh/chị có đến quốc gia/vùng
                        lãnh thổ nào không? (nếu có ghi rõ) :{" "}
                        {record.lich_su_dich_te}
                      </span>
                    </CRow>
                    <CRow>
                      <span>
                        <b>Địa chỉ liên lạc tại Việt Nam</b>
                      </span>
                    </CRow>
                    <CRow>
                      <span>
                        Địa chỉ nơi ở tại Việt Nam : {record.str_dia_chi_lien_he}
                      </span>
                    </CRow>
                    <CRow>
                      <span>
                        Trong vòng 7 ngày anh/Chị có thấy xuất hiện dấu hiệu nào
                        sau đây ko?
                      </span>
                    </CRow>
                    <CRow>
                      <table
                        style={{ borderCollapse: "collapse", width: "100%" }}
                      >
                        <tr>
                          <th
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "1px",
                              width: "30%",
                            }}
                          >
                            Triệu chứng
                          </th>
                          <th
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "1px",
                              width: "10%",
                            }}
                          >
                            Có
                          </th>
                          <th
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "1px",
                              width: "10%",
                            }}
                          >
                            Không
                          </th>
                          <th
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "1px",
                              width: "30%",
                            }}
                          >
                            Triệu chứng
                          </th>
                          <th
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "1px",
                              width: "10%",
                            }}
                          >
                            Có
                          </th>
                          <th
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "1px",
                              width: "10%",
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
                              padding: "1px",
                            }}
                          >
                            Sốt
                          </td>
                          <td
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "1px",
                            }}
                          >
                            {record.tc_sot === true ? "X" : ""}
                          </td>
                          <td
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "1px",
                            }}
                          >
                            {record.tc_sot === false ? "X" : ""}
                          </td>

                          <td
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "left",
                              padding: "1px",
                            }}
                          >
                            Ho
                          </td>
                          <td
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "1px",
                            }}
                          >
                            {record.tc_ho === true ? "X" : ""}
                          </td>
                          <td
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "1px",
                            }}
                          >
                            {record.tc_ho === false ? "X" : ""}
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "left",
                              padding: "1px",
                            }}
                          >
                            Khó thở
                          </td>
                          <td
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "1px",
                            }}
                          >
                            {record.tc_kho_tho === true ? "X" : ""}
                          </td>
                          <td
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "1px",
                            }}
                          >
                            {record.tc_kho_tho === false ? "X" : ""}
                          </td>
                          <td
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "left",
                              padding: "1px",
                            }}
                          >
                            Đau họng
                          </td>
                          <td
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "1px",
                            }}
                          >
                            {record.tc_dau_hong === true ? "X" : ""}
                          </td>
                          <td
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "1px",
                            }}
                          >
                            {record.tc_dau_hong === false ? "X" : ""}
                          </td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "left",
                              padding: "1px",
                            }}
                          >
                            Nôn/buồn nôn
                          </td>
                          <td
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "1px",
                            }}
                          >
                            {record.tc_non === true ? "X" : ""}
                          </td>
                          <td
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "1px",
                            }}
                          >
                            {record.tc_non === false ? "X" : ""}
                          </td>
                          <td
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "left",
                              padding: "1px",
                            }}
                          >
                            Tiêu chảy
                          </td>
                          <td
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "1px",
                            }}
                          >
                            {record.tc_tieu_chay === true ? "X" : ""}
                          </td>
                          <td
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "1px",
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
                              padding: "1px",
                            }}
                          >
                            Xuất huyết ngoài da
                          </td>
                          <td
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "1px",
                            }}
                          >
                            {record.tc_xuat_huyet === true ? "X" : ""}
                          </td>
                          <td
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "1px",
                            }}
                          >
                            {record.tc_xuat_huyet === false ? "X" : ""}
                          </td>
                          <td
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "left",
                              padding: "1px",
                            }}
                          >
                            Nổi ban ngoài da
                          </td>
                          <td
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "1px",
                            }}
                          >
                            {record.tc_noi_ban === true ? "X" : ""}
                          </td>
                          <td
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "1px",
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
                      <span>
                        Lịch sử phơi nhiễm: Trong vòng 14 ngày Anh/Chị có
                      </span>
                    </CRow>
                    <CRow>
                      <table
                        style={{ borderCollapse: "collapse", width: "100%" }}
                      >
                        <tr>
                          <th
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "1px",
                            }}
                          >
                            Lịch sử phơi nhiễm
                          </th>
                          <th
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "1px",
                            }}
                          >
                            Có
                          </th>
                          <th
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "1px",
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
                              padding: "1px",
                            }}
                          >
                            Đến trang trại chăn nuôi/chợ buôn bán động vật sống/cơ
                            sở giết mổ động vật, tiếp xúc động vật
                          </td>
                          <td
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "1px",
                            }}
                          >
                            {record.phoi_nhiem_dong_vat === true ? "X" : ""}
                          </td>
                          <td
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "1px",
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
                              padding: "1px",
                            }}
                          >
                            Trực tiếp chăm sóc người bệnh truyền nhiễm
                          </td>
                          <td
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "1px",
                            }}
                          >
                            {record.cham_soc_nguoi_benh === true ? "X" : ""}
                          </td>
                          <td
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "1px",
                            }}
                          >
                            {record.cham_soc_nguoi_benh === false ? "X" : ""}
                          </td>
                        </tr>
                      </table>
                    </CRow>
                    <CRow>
                      <table
                        style={{
                          borderCollapse: "collapse",
                          width: "100%",
                        }}
                      >
                        <tr>
                          <td
                            style={{
                              textAlign: "left",
                              width: "60%",
                              padding: "1px",
                            }}
                          >
                            Tôi cam kết những thông tin trên là đúng sự thật, tôi
                            hiểu rằng nếu cung cấp thông tin sai thông tin có thể
                            dẫn đến những hậu quả nghiêm trọng
                            <br />
                            {(record.ma_cam_ket_nguoi_dan !== undefined && record.ma_cam_ket_nguoi_dan !== null) && (
                              <span>
                                Tôi sẽ thực hiện :{" "}
                                <b>{record.ten_cam_ket_nguoi_dan}</b>
                              </span>
                            )}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              width: "40%",
                              padding: "1px",
                              marginBottom: "10px",
                            }}
                          >
                            Ngày {moment().format("DD")} Tháng{" "}
                            {moment().format("MM")} Năm {moment().format("yyyy")}{" "}
                            <br /> NGƯỜI KHAI <br /> Ký, ghi rõ họ tên
                          </td>
                        </tr>
                      </table>
                    </CRow>
                    <br/>
                    <br/>
                    <hr className="mt-0" />
                    <CRow>
                      <CCol xs="12">
                        <h4 style={{ textAlign: "center", margin: "2px" }}>
                          CHỈ ĐỊNH DỊCH TỄ VÀ LẤY MẪU XÉT NGHIỆM <br />
                        </h4>
                      </CCol>
                    </CRow>
                    <CRow>
                      <table
                        style={{ borderCollapse: "collapse", width: "100%" }}
                      >
                        <tr>
                          <th
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "1px",
                            }}
                          >
                            Chỉ định xét nghiệm
                          </th>
                          <th
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "1px",
                            }}
                          >
                            Chỉ định dịch tễ
                          </th>
                          <th
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "1px",
                            }}
                          >
                            Nhân viên chỉ định xác nhận
                          </th>
                          {record.chi_dinh_xet_nghiem !== 1 && (
                            <th
                              style={{
                                border: "1px solid #dddddd",
                                textAlign: "center",
                                padding: "1px",
                              }}
                            >
                              Nhân viên lấy mẫu xác nhận
                            </th>
                          )}
                          {record.xuly == 3 && (
                            <th
                              style={{
                                border: "1px solid #dddddd",
                                textAlign: "center",
                                padding: "1px",
                              }}
                            >
                              Lãnh đạo xác nhận
                            </th>
                          )}
                        </tr>
                        <tr>
                          <td
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "10px",
                            }}
                          >
                            {record.ten_chi_dinh_xet_nghiem}
                          </td>
                          <td
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "10px",
                            }}
                          >
                            {record.ten_huong_xu_ly}
                          </td>
                          <td
                            style={{
                              border: "1px solid #dddddd",
                              textAlign: "center",
                              padding: "10px",
                            }}
                          ></td>
                          {record.chi_dinh_xet_nghiem !== 1 && (
                            <td
                              style={{
                                border: "1px solid #dddddd",
                                textAlign: "center",
                                padding: "10px",
                              }}
                            ></td>
                          )}
                          {(record.xuly == 3 || record.xuly == 8) && (
                            <td
                              style={{
                                border: "1px solid #dddddd",
                                textAlign: "center",
                                padding: "10px",
                              }}
                            ></td>
                          )}
                        </tr>
                      </table>
                    </CRow>
                    <hr
                      className="mt-0"
                      style={{ textAlign: "center", marginTop: "10px" }}
                    />
                    <CRow>
                      <CCol xs="12">
                        <h4 style={{ textAlign: "center", margin: "0.5em" }}>
                          CHỐT KIỂM DỊCH XÁC NHẬN <br />
                        </h4>
                      </CCol>
                    </CRow>
                    <CRow>
                      {record.chi_dinh_xet_nghiem === 1 && (
                        <div>
                          <span>
                            Ông/bà : <b>{record.ho_ten}</b> đã khai báo y tế và
                            điều tra dịch tễ tại <b>{user.ten_chot} </b> vào lúc{" "}
                            <b>{" "}{convertTimeFullVN(record.ngay_kiemtra_dichte)}</b>.
                            <br />
                          </span>

                          <table
                            style={{
                              borderCollapse: "collapse",
                              width: "100%",
                            }}
                          >
                            <tr>
                              <td style={{
                                  textAlign: "left",
                                  width: "70%",
                                  padding: "1px",
                                }}
                              >
                                Yêu cầu ông/bà <b>{record.ho_ten}</b> sau khi trở về địa phương thực hiện :
                                <br />
                                <b>
                                  {chiDinhDichTe(
                                    record.xuly,
                                    record.ngay_kiemtra_dichte
                                  )}
                                </b>
                              </td>
                              <td
                                style={{
                                  textAlign: "center",
                                  verticalAlign: "top",
                                  width: "30%",
                                  padding: "1px",
                                }}
                              >
                                CÁN BỘ Y TẾ <br /> Ký, ghi rõ họ tên
                              </td>
                            </tr>
                          </table>
                        </div>
                      )}
                      {(record.chi_dinh_xet_nghiem === 2 ||
                        record.chi_dinh_xet_nghiem === 3) && (
                        <div>
                          <span>
                            {" "}
                          Ông/bà : {record.ho_ten} đã được lấy mẫu xét nghiệm
                          SARS-CoV-2 và điều tra dịch tễ tại{" "}
                          <b>{user.ten_chot}</b> vào lúc{" "}
                          <b> {convertTimeFullVN(record.ngay_kiemtra_dichte)}</b>.
                          <br />
                          Thời gian dự kiến có kết quả xét nghiệm : {}
                          <br />
                          </span>

                          <table
                            style={{
                              borderCollapse: "collapse",
                              width: "100%",
                            }}
                          >
                            <tr>
                              <td style={{
                                  textAlign: "left",
                                  width: "70%",
                                  padding: "1px",
                                }}
                              >
                                Yêu cầu ông/bà {record.ho_ten} sau khi lấy mẫu, trở về địa phương thực hiện :
                                <br />
                                <b>
                                  {chiDinhDichTe(
                                    record.xuly,
                                    record.ngay_kiemtra_dichte
                                  )}
                                </b>
                              </td>
                              <td
                                style={{
                                  textAlign: "center",
                                  width: "30%",
                                  verticalAlign: "top",
                                  padding: "1px",
                                }}
                              >
                                CÁN BỘ Y TẾ <br /> Ký, ghi rõ họ tên
                              </td>
                            </tr>
                          </table>
                        </div>
                      )}
                      {record.chi_dinh_xet_nghiem === 4 && (
                        <div>
                          <span>
                          {" "}
                          Ông/bà : {record.ho_ten} đã được lấy mẫu test nhanh
                          SARS-CoV-2 và điều tra dịch tễ tại{" "}
                          <b>{user.ten_chot}</b> vào lúc{" "}
                          <b> {convertTimeFullVN(record.ngay_kiemtra_dichte)}</b>.
                          <br />
                          Yêu cầu ông/bà {record.ho_ten} sau khi lấy mẫu thực hiện:
                          </span>

                          <table
                            style={{
                              borderCollapse: "collapse",
                              width: "100%",
                            }}
                          >
                            <tr>
                              <td style={{
                                  textAlign: "left",
                                  width: "70%",
                                  verticalAlign: "top",
                                  padding: "1px",
                                }}
                              >
                                <b>
                                  {chiDinhDichTe(
                                    record.xuly,
                                    record.ngay_kiemtra_dichte
                                  )}
                                </b>
                              </td>
                              <td
                                style={{
                                  textAlign: "center",
                                  width: "30%",
                                  verticalAlign: "top",
                                  padding: "1px",
                                }}
                              >
                                CÁN BỘ Y TẾ <br /> Ký, ghi rõ họ tên
                              </td>
                            </tr>
                            <tr>
                              <td colspan="2" style={{
                                  textAlign: "center",
                                  width: "70%",
                                  verticalAlign: "top",
                                  padding: "1px",
                                }}
                              >
                                <b>
                                  BIÊN LAI THU TIỀN
                                </b>
                              </td>
                            </tr>
                          </table>
                          <table
                            style={{
                              borderCollapse: "collapse",
                              width: "100%",
                            }}
                          >
                            <tr>
                              <td style={{
                                  textAlign: "left",
                                  width: "30%",
                                  verticalAlign: "top",
                                  padding: "1px",
                                }}
                              >
                                  Họ tên: <b>{record.ho_ten}</b>
                              </td>
                              <td style={{
                                  textAlign: "left",
                                  width: "20%",
                                  verticalAlign: "top",
                                  padding: "1px",
                                }}
                              >
                                Năm sinh: <b>{record.nam_sinh}</b>
                              </td>
                              <td style={{
                                  textAlign: "left",
                                  width: "20%",
                                  verticalAlign: "top",
                                  padding: "1px",
                                }}
                              >
                                <b>
                                  Giới tính: <b>{record.gioi_tinh === 1 ? "Nam" : "Nữ"}</b>
                                </b>
                              </td>
                              <td style={{
                                  width: "30%",
                                  padding: "1px",
                                }}
                              >
                                <b>

                                </b>
                              </td>
                            </tr>
                            <tr>
                              <td colspan="4"
                                style={{
                                  textAlign: "left",
                                  verticalAlign: "top",
                                  padding: "1px",
                                }}
                              >
                                Địa chỉ: : {record.str_dia_chi_lien_he}
                              </td>
                            </tr>
                            <tr>
                              <td colspan="4">
                                Thu tiền test nhanh kháng nguyên Sars-CoV-2
                              </td>
                            </tr>
                            <tr>
                              <td colspan="4" style={{
                                  textAlign: "left",
                                  verticalAlign: "top",
                                  padding: "1px",
                                }}>
                                Số tiền : 238.000 đ (Hai trăm ba mươi tám ngàn đồng)
                              </td>
                            </tr>

                          </table>
                        </div>
                      )}
                    </CRow>
                  </div>
                  {/* hết code in to chỉ định kiểm dịch */}
                  {/* code in tờ cam kết  */}
                      <MauInToKhai record={record}/>
                  {/* code in tờ cam kết */}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        )}
      </div>
      }
    </div>

  );
}

export default ToKhaiYTePage;
