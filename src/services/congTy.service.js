import config from '../configs/config';
import { authHeader, history } from '../helpers';

import axios from 'axios';

export const congTyService = {
    getDanhSachCongTyInKCN,
    getCongTyById,
    cuCongTy,
    deleteCongTy
};

async function getDanhSachCongTyInKCN(ma_khu_cong_nghiep, ma_cong_ty) {
    try {
        return await axios({
            method: 'Get',
            headers: authHeader(),
            url : `${config.apiUrl}/api/khu-cong-nghiep/danh-sach-cong-ty-in-kcn`,
            params: {
              'ma_khu_cong_nghiep' : ma_khu_cong_nghiep,
              'ma_cong_ty' : ma_cong_ty,
            }
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}

async function getCongTyById(ma_cong_ty) {
    try {
        return await axios({
            method: 'Get',
            headers: authHeader(),
            url : `${config.apiUrl}/api/khu-cong-nghiep/thong-tin-cong-ty`,
            params: {
                'ma_cong_ty' : ma_cong_ty
            }
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}

async function cuCongTy(data) {
    try {
    return await axios({
        method: "POST",
        headers: authHeader(),
        url: `${config.apiUrl}/api/khu-cong-nghiep/cu-cong-ty`,
        data: JSON.stringify(data),
    }).then((res) => {
        return res.data;
    });
    } catch (error) {
        return handleError(error);
    }
}

async function deleteCongTy(ma_cong_ty) {
    try {
        return await axios({
            method: 'POST',
            headers: authHeader(),
            url : `${config.apiUrl}/api/khu-cong-nghiep/xoa-cong-ty`,
            params :
            {
                'ma_cong_ty': ma_cong_ty
            }
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
        // history.push('/login');
    }
    return Promise.reject(error);
}
