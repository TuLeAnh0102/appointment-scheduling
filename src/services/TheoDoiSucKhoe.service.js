import config from '../configs/config';
import { authHeader, history } from '../helpers';

import axios from 'axios';

export const TheoDoiSucKhoeService = {
    TheoDoiSucKhoe,
    Xacthuc,
    DanhSachTinhTrangSucKhoe
}

async function TheoDoiSucKhoe (body){
    try {
        return await axios({
            method: 'Post',
            headers: authHeader(),
            url: `${config.apiUrl}/api/theo-doi-suc-khoe/khai-bao`,
            data: body
        }).then(res => {
            return res.data
        });
    } catch (error) {
        console.log(error);
    }
}

async function Xacthuc (zalo_user_id){
    return await axios({
        method: 'GET',
        headers: authHeader(),
        url: `${config.apiUrl}/api/theo-doi-suc-khoe/xac-thuc`,
        params: {
            'zalo_user_id': zalo_user_id
        }
    }).then(res => {
        return res.data
    });
}

async function  DanhSachTinhTrangSucKhoe (tinh, huyen, xa, tu_ngay, den_ngay ) {
    return axios({
        method: 'GET',
        headers: authHeader(),
        url: `${config.apiUrl}/api/theo-doi-suc-khoe/danh-sach-theo-doi-suc-khoe-dia-phuong`,
        params:{
            'tinh': tinh,
            'huyen': huyen,
            'xa': xa,
            'tu_ngay': tu_ngay,
            'den_ngay': den_ngay
        }
        
    }).then(res => {
        return res.data
    });
}