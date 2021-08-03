import config from "../configs/config";
import { authHeader, history } from "../helpers";

import axios from "axios";

export const VanTaiService = {
  getDanhSachVanTaiByTime,
  getToKhaiVanTai,
  deleteToKhaiVanTai,
  getDanhSachDiemKiemTra,
  PostKhaiBaoChotKiemTra,
  XoaDiemKiemTra,
  CapNhatDiemKiemTra,
  xacNhanToKhaiVanTai,
  PostKhaiBaoVanTai, //truong
  UpdateKhaiBaoVanTai,//truong
  getInfoVanTaiBySDT,//truong
  sendMesZalo
};
//truong
async function PostKhaiBaoVanTai(body) {
  try {
    return await axios({
      method: "Post",
      headers: authHeader(),
      url: `${config.apiUrl}/api/khai-bao-van-tai`,
      data: body,
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    return handleError(error);
  }
}
async function UpdateKhaiBaoVanTai(body) {
  try {
    return await axios({
      method: "Post",
      headers: authHeader(),
      url: `${config.apiUrl}/api/van-tai/update-khai-bao-van-tai`,
      data: body,
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    return handleError(error);
  }
}

async function getDanhSachDiemKiemTra() {
  try {
    return await axios({
      method: "Get",
      headers: authHeader(),
      url: `${config.apiUrl}/api/van-tai/danh-sach-diem-kiem-tra`,
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    return handleError(error);
  }
}

async function getDanhSachVanTaiByTime(
  start_date,
  end_date,
  xac_nhan_to_khai_van_tai,
  noi_khai_bao_van_tai
) {
  try {
    return await axios({
      method: "Get",
      headers: authHeader(),
      url: `${config.apiUrl}/api/van-tai/danh-sach-to-khai-van-tai-time`,
      params: {
        start_date: start_date,
        end_date: end_date,
        xac_nhan_to_khai_van_tai: xac_nhan_to_khai_van_tai,
        noi_khai_bao_van_tai: noi_khai_bao_van_tai,
      },
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    return handleError(error);
  }
}

async function getToKhaiVanTai(ma_to_khai_van_tai) {
  try {
    return await axios({
      method: "Get",
      headers: authHeader(),
      url: `${config.apiUrl}/api/van-tai/get-to-khai-van-tai`,
      params: {
        ma_to_khai_van_tai: ma_to_khai_van_tai,
      },
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    return handleError(error);
  }
}

async function xacNhanToKhaiVanTai(id, noi_khai_bao_van_tai) {
  try {
    return await axios({
      method: "POST",
      headers: authHeader(),
      url: `${config.apiUrl}/api/van-tai/xac-nhan-to-khai-van-tai`,
      params: {
        id: id,
        noi_khai_bao_van_tai: noi_khai_bao_van_tai
      },
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    return handleError(error);
  }
}


async function deleteToKhaiVanTai(id) {
  try {
    return await axios({
      method: "POST",
      headers: authHeader(),
      url: `${config.apiUrl}/api/van-tai/xoa-to-khai-van-tai`,
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

async function PostKhaiBaoChotKiemTra(body) {
  try {
    return await axios({
      method: "Post",
      headers: authHeader(),
      url: `${config.apiUrl}/api/van-tai/khai-bao-chot-kiem-tra`,
      data: body,
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    return handleError(error);
  }
}

async function XoaDiemKiemTra(id) {
  try {
    return await axios({
      method: "Get",
      headers: authHeader(),
      url: `${config.apiUrl}/api/van-tai/xoa-diem-kiem-tra`,
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

async function CapNhatDiemKiemTra(row) {
  try {
    return await axios({
      method: "Post",
      headers: authHeader(),
      url: `${config.apiUrl}/api/van-tai/cap-nhat-chot-kiem-tra`,
      data: row,
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    return handleError(error);
  }
}

async function sendMesZalo(zalo_user_id, message) {
  try {
    return await axios({
      method: "Get",
      headers: authHeader(),
      url: `${config.apiUrl}/api/van-tai/send-mess-to-zalo`,
      params: {
        zuser_id: zalo_user_id,
        message: message
      }
    })
  } catch (error) {
    return handleError(error);
  }
}

async function getInfoVanTaiBySDT(so_dien_thoai) {
  try {
      return await axios({
          method: 'Get',
          headers: authHeader(),
          url : `${config.apiUrl}/api/van-tai/thong-tin-theo-sdt`,
          params: {
              'so_dien_thoai': so_dien_thoai
          }
      }).then((res) => {
          return res.data;
      })
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
