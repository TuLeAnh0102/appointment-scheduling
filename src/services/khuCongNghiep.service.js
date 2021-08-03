import config from '../configs/config';
import { authHeader, history } from '../helpers';

import axios from 'axios';

export const khuCongNghiepService = {
    getAllKhuCongNghiep,
    getKhuCongNghiep
};

async function getAllKhuCongNghiep() {
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

async function getKhuCongNghiep(id) {
    try {
        return await axios({
            method: 'Get',
            headers: authHeader(),
            url : `${config.apiUrl}/api/khu-cong-nghiep/danh-muc-kcn-in-role`,
            params: {
              'id' : id
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
