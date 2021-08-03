import config from '../configs/config';
import { authHeader, history } from '../helpers';

import axios from 'axios';

export const VeBPCService = {
    modifyInfoVeBPC,
    getDanhSachDangKyVeBPC,
    deleteToKhaiDangKy

};
async function modifyInfoVeBPC(obj) {
    try {
        return await axios({
            method: 'POST',
            headers: authHeader(),
            url: `${config.apiUrl}/api/dang-ki-ve-binh-phuoc`,
            data: JSON.stringify(obj)
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}

async function getDanhSachDangKyVeBPC() {
  try {
    return await axios({
      method: "Get",
      headers: authHeader(),
      url: `${config.apiUrl}/api/danh-sach-dang-ki-ve-bp`,
    }).then((res) => {
      return res.data;
    });
  } catch (error) {
    return handleError(error);
  }
}

async function deleteToKhaiDangKy(ma_to_khai) {

  try {
    return await axios({
      method: "POST",
      headers: authHeader(),
      url: `${config.apiUrl}/api/xoa-dang-ki-ve-bpc`,
      params: {
        ma_to_khai: ma_to_khai,
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
