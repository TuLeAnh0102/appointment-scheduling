import config from '../configs/config';
import { authHeader, history } from '../helpers';

import axios from 'axios';

export const congNhanService = {
    modifyInfoCongNhan,
    getDSkhuCongNghiep,
    getDSCongTytheoKCN,
    getThongTinCongNhantheoSDT,
    getDsCongNhanInCongTy,
    getThongTinCongNhantheoID,
    deleteCongNhanTheoID
};
async function modifyInfoCongNhan(obj) {
    try {
        return await axios({
            method: 'POST',
            headers: authHeader(),
            url: `${config.apiUrl}/api/khai-bao-thong-tin/them-thong-tin-cong-nhan`,
            data: JSON.stringify(obj)
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}

async function getDsCongNhanInCongTy(ma_cong_ty, ma_khu_cong_nghiep) {
    try {
        return await axios({
            method: 'Get',
            headers: authHeader(),
            url : `${config.apiUrl}/api/khu-cong-nghiep/danh-sach-cong-nhan-in-cty`,
            params: {
                'ma_cong_ty' : ma_cong_ty,
                'ma_khu_cong_nghiep' : ma_khu_cong_nghiep
            }
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}

async function getThongTinCongNhantheoSDT(so_dien_thoai) {
    try {
        return await axios({
            method: 'Get',
            headers: authHeader(),
            url : `${config.apiUrl}/api/khu-cong-nghiep/thong-tin-theo-sdt`,
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

async function getThongTinCongNhantheoID(id) {
    try {
        return await axios({
            method: 'Get',
            headers: authHeader(),
            url: `${config.apiUrl}/api/khu-cong-nghiep/thong-tin-theo-id`,
            params: {
                'id': id
            }
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}

async function getDSkhuCongNghiep() {
    try {
        return await axios({
            method: 'Get',
            headers: authHeader(),
            url : `${config.apiUrl}/api/khu-cong-nghiep/danh-muc-kcn`,
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}

async function getDSCongTytheoKCN(ma_khu_cong_nghiep) {
    try {
        return await axios({
            method: 'Get',
            headers: authHeader(),
            url : `${config.apiUrl}/api/khu-cong-nghiep/danh-sach-cong-ty-in-kcn`,
            params: {
                'ma_khu_cong_nghiep': ma_khu_cong_nghiep
            }
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}

async function deleteCongNhanTheoID(id_cong_nhan){
    try {
        return await axios({
            method: 'GET',
            headers: authHeader(),
            url: `${config.apiUrl}/api/cong-nhan/xoa`,
            params: {
                id: id_cong_nhan
            }
        })
    } catch (error) {
        return handleError(error)
    }
}

function handleError(error) {
    if (error.isAxiosError && error.response.status === 401) {
        // history.push('/login');
    }
    return Promise.reject(error);
}
