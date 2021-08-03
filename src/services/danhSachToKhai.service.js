import config from "../configs/config";
import { authHeader, history } from "../helpers";

import axios from "axios";

export const danhSachToKhaiService = {
  getAllDanhSachToKhaiByTime,
  getAllDanhSachDichTeByTime,
  xacNhanToKhaiYTe,
  xacNhanKhongLayMauDichTe,
  updateLayMauXetNghiem,
  deleteTheoDoiCachLy
};

async function getAllDanhSachToKhaiByTime(
  start_date,
  end_date,
  tinhTrangToKhai,
  noi_lay_mau
) {
  try {
    return await axios({
      method: "Get",
      headers: authHeader(),
      url: `${config.apiUrl}/api/to-khai-y-te/danh-sach-to-khai-time`,
      params: {
        start_date: start_date,
        end_date: end_date,
        tinh_trang_to_khai: tinhTrangToKhai,
        noi_lay_mau: noi_lay_mau
      },
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    return handleError(error);
  }
}

async function xacNhanToKhaiYTe(id, noi_lay_mau) {
  try {
    return await axios({
      method: "POST",
      headers: authHeader(),
      url: `${config.apiUrl}/api/to-khai-y-te/xac-nhan-to-khai`,
      params: {
        id: id,
        noi_lay_mau :noi_lay_mau
      },
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    return handleError(error);
  }
}

async function getAllDanhSachDichTeByTime(
  start_date,
  end_date,
  tinhTrangDichTe,
  noi_lay_mau
) {
  try {
    return await axios({
      method: "Get",
      headers: authHeader(),
      url: `${config.apiUrl}/api/dich-te/danh-sach-dich-te-time`,
      params: {
        start_date: start_date,
        end_date: end_date,
        tinh_trang_dich_te: tinhTrangDichTe,
        noi_lay_mau: noi_lay_mau
      },
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    return handleError(error);
  }
}

async function xacNhanKhongLayMauDichTe(id) {
  try {
    return await axios({
      method: "POST",
      headers: authHeader(),
      url: `${config.apiUrl}/api/dich-te/xac-nhan-khong-lay-mau-dich-te`,
      params: {
        id: id,
      },
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    return handleError(error);
  }
}

async function updateLayMauXetNghiem(id, obj) {
  obj.id = id;
  try {
    return await axios({
      method: "POST",
      headers: authHeader(),
      url: `${config.apiUrl}/api/dich-te/update-lay-mau-set-nghiem`,
      data: {
        id: obj.id,
        thoi_gian_lay_mau: obj.thoi_gian_lay_mau,
        noi_lay_mau: obj.noi_lay_mau,
        huong_xu_ly: obj.huong_xu_ly,
        xuly: obj.xuly,
        chi_dinh_xet_nghiem: obj.chi_dinh_xet_nghiem,
        mau_gop: obj.mau_gop,
        ngay_tiep_xuc_lan_cuoi: obj.ngay_tiep_xuc_lan_cuoi,
        so_lan_lay_mau: obj.so_lan_lay_mau,
        ma_cam_ket_nguoi_dan: obj.ma_cam_ket_nguoi_dan,
        thoi_gian_quay_ve: obj.thoi_gian_quay_ve
      },
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    return handleError(error);
  }
}

async function getTheoDoiCachLy(id) {
  try {
    return await axios({
      method: "Get",
      headers: authHeader(),
      url: `${config.apiUrl}/api/theo-doi-cach-ly/get-theo-doi-cach-ly`,
      params: {
        id: id,
      },
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    return handleError(error);
  }
}

async function updateToKhaiYTe(obj, id) {
  obj.id = id;
  try {
    return await axios({
      method: "POST",
      headers: authHeader(),
      url: `${config.apiUrl}/api/theo-doi-cach-ly/cap-nhat-theo-doi`,
      data: {
        id: obj.id,
        ho_ten: obj.ho_ten,
        nam_sinh: obj.nam_sinh,
        gioi_tinh: obj.gioi_tinh,
        so_nha_dich_te: obj.so_nha_dich_te,
        so_nha: obj.so_nha,
        ma_xa: obj.ma_xa,
        ma_huyen: obj.ma_huyen,
        //   'ma_tinh': obj.ma_tinh,
        thoi_gian_lay_mau: obj.thoi_gian_lay_mau,
        noi_lay_mau: obj.noi_lay_mau,
        so_dien_thoai: obj.so_dien_thoai,
        huong_xu_ly: obj.huong_xu_ly,
      },
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    return handleError(error);
  }
}

async function deleteTheoDoiCachLy(id) {
  try {
    return await axios({
      method: "POST",
      headers: authHeader(),
      url: `${config.apiUrl}/api/theo-doi-cach-ly/xoa-theo-theo-doi`,
      params: {
        id: id,
      },
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    return handleError(error);
  }
}

function handleError(error) {
  if (error.isAxiosError && error.response.status === 401) {
    // history.push('/login');
  }
  return Promise.reject(error);
}
