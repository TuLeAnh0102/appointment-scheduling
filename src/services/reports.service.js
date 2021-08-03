import config from "../configs/config";
import { authHeader, history } from "../helpers";

import axios from "axios";

export const reportService = {
    thongkeDanhsachTheoDK,
    thongkeLuotVanTai,
    thongkesoluongpt,
    ThongKeTaiXeQuaChot,
    ThongKeCongNhan,
    thongkesoluongpttheotokhaivantai,
    thongkechitietpttheotokhaivantai
}

async function thongkeDanhsachTheoDK(chot, huong_xu_ly, chi_dinh_xet_nghiem, tu_ngay, den_ngay) {
    try {
        return await axios({
            method: "GET",
            headers: authHeader(),
            url: `${config.apiUrl}/api/bao-cao/thong-ke-theo-chot`,
            params: {
                noi_lay_mau: chot,
                huong_xu_ly: huong_xu_ly,
                chi_dinh_xet_nghiem: chi_dinh_xet_nghiem,
                tu_ngay: tu_ngay,
                den_ngay: den_ngay
            }
        }).then(res => {return res.data})
    } catch (error) {
        return handleError(error);
    }
}

async function thongkeLuotVanTai( noi_lay_mau, loai_phuong_tien,start_date, end_date) {
  try {
    return await axios({
      method: "Get",
      headers: authHeader(),
      url: `${config.apiUrl}/api/bao-cao/thong-ke-luot-phuong-tien`,
      params: {
        noi_lay_mau: noi_lay_mau,
        loai_phuong_tien: loai_phuong_tien,
        tu_ngay: start_date,
        den_ngay: end_date
      },
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    return handleError(error);
  }
}

async function thongkesoluongpt(noi_lay_mau, start_date, end_date, loai_phuong_tien) {
  try {
    return await axios({
      method: "Get",
      headers: authHeader(),
      url: `${config.apiUrl}/api/bao-cao/thong-ke-so-luong-phuong-tien`,
      params: {
        noi_lay_mau: noi_lay_mau,
        tu_ngay: start_date,
        den_ngay: end_date,
        loai_phuong_tien: loai_phuong_tien
      },
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    return handleError(error);
  }
}

async function ThongKeTaiXeQuaChot(dsSDT) {
  try {
    return await axios({
      method: "Get",
      headers: authHeader(),
      url: `${config.apiUrl}/api/bao-cao/thong-ke-tai-xe-qua-chot`,
      params: {
        dsSDT: dsSDT
      },
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    return handleError(error);
  }
}

async function ThongKeCongNhan(dsSDT) {
  try {
    return await axios({
      method: "Get",
      headers: authHeader(),
      url: `${config.apiUrl}/api/bao-cao/thong-ke-cong-nhan-theo-sdt`,
      params: {
        dsSDT: dsSDT
      },
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    return handleError(error);
  }
}

async function thongkesoluongpttheotokhaivantai(noi_lay_mau, start_date, end_date, loai_phuong_tien) {
  try {
    return axios({
      method: 'GET',
      headers: authHeader(),
      url: `${config.apiUrl}/api/bao-cao/thong-ke-luot-van-tai`,
      params: {
        noi_lay_mau: noi_lay_mau,
        tu_ngay: start_date,
        den_ngay: end_date,
        loai_phuong_tien: loai_phuong_tien
      }
    }).then(res => {
      return res.data
    })
  } catch (error) {
    
  }
  
}

async function thongkechitietpttheotokhaivantai(noi_lay_mau, start_date, end_date, loai_phuong_tien){
  try {
    return axios({
      method: 'GET',
      headers: authHeader(),
      url: `${config.apiUrl}/api/bao-cao/thong-ke-chi-tiet-van-tai`,
      params: {
        noi_lay_mau: noi_lay_mau,
        tu_ngay: start_date,
        den_ngay: end_date,
        loai_phuong_tien: loai_phuong_tien
      }
    }).then(res => {
      return res.data
    })
  } catch (error) {

  }

}

function handleError(error) {
    if (error.isAxiosError && error.response.status === 401) {
        // history.push('/login');
    }
    return Promise.reject(error);
}
