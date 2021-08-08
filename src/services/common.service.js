import config from '../configs/config';
import { authHeader, history } from '../helpers';

import axios from 'axios';

export const commonService = {
    getDanhMucTinh,
    getDanhMucHuyen,
    getDanhMucXa,
    getDanhMucHuongXuLy,
    getDanhMucXetNghiem,
    handleError
};
async function getDanhMucTinh() {
    try {
        return await axios({
            method: 'Get',
            headers: authHeader(),
            url : `${config.apiUrl}/api/common/danh-muc-tinh`
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}

async function getDanhMucHuyen(ma_tinh) {
    try {
        return await axios({
            method: 'Get',
            headers: authHeader(),
            url : `${config.apiUrl}/api/common/danh-muc-huyen`,
            params: {
                'ma_tinh' : ma_tinh
            }
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}

async function getAllDanhMucXa(ma_huyen) {

    try {
        return await axios({
            method: 'Get',
            headers: authHeader(),
            url : `${config.apiUrl}/api/common/all-danh-muc-xa`,
            params: {
                'ma_huyen' : ma_huyen
            }
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}

async function getDanhMucXa(ma_huyen) {

    try {
        return await axios({
            method: 'Get',
            headers: authHeader(),
            url : `${config.apiUrl}/api/common/danh-muc-xa`,
            params: {
                'ma_huyen' : ma_huyen
            }
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}

async function getDanhMucHuongXuLy() {
    try {
        return await axios({
            method: 'Get',
            headers: authHeader(),
            url: `${config.apiUrl}/api/common/danh-muc-huong-xu-ly`
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}

async function getDanhMucXetNghiem() {
    try {
        return await axios({
            method: 'Get',
            headers: authHeader(),
            url: `${config.apiUrl}/api/common/danh-muc-xet-nghiem`
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}

function handleError(error) {
    if( error.isAxiosError && error.response.status === 401)
    {
        history.push('/login');
    }
    return Promise.reject(error);
}
