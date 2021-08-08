import config from '../configs/config';
import { authHeader } from '../helpers';
import axios from 'axios';
import { commonService } from './common.service';

export const cauhinhhethongService = {
    getLoaiTaiKhoan,
    modifyNhomQuyen,
};
async function getLoaiTaiKhoan() {
    try {
        return await axios({
            method: 'Get',
            headers: authHeader(),
            url : `${config.apiUrl}/api/cau-hinh/get-loai-tai-khoan`
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return commonService.handleError(error);
    }
}
async function modifyNhomQuyen(obj) {
    try {
        return await axios({
            method: 'POST',
            headers: authHeader(),
            url: `${config.apiUrl}/api/cau-hinh/them-them-nhom-quyen`,
            data: JSON.stringify(obj)
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return commonService.handleError(error);
    }
}
