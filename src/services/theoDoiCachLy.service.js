import config from '../configs/config';
import { authHeader, history } from '../helpers';

import axios from 'axios';

export const theoDoiCachLyService = {
    getAllTheoDoiCachLy,
    getTheoDoiCachLy,
    getThongTinCachLytheoSDT,
    updateTheoDoiCachLy,
    insertTheoDoiCachLy,
    deleteTheoDoiCachLy,
    getInfoDangCachLytheoSDT,
    DanhsachDiemPhongToaCovid,
    ThemDiemPhongToaCovid,
    getDiemCovidTheoId,
    getDiemCovidTheoTrangThai,
    getDiemCovidDiemBatDau,
    declare_confirm
};

async function getAllTheoDoiCachLy(pageSize, currentPage) {
    try {
        return await axios({
            method: 'Get',
            headers: authHeader(),
            url: `${config.apiUrl}/api/theo-doi-cach-ly/ds-theo-doi`,
            params: {
                'pageSize': pageSize,
                'currentPage': currentPage
            }
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}

async function getTheoDoiCachLy(id) {
    try {
        return await axios({
            method: 'Get',
            headers: authHeader(),
            url: `${config.apiUrl}/api/theo-doi-cach-ly/get-theo-doi-cach-ly`,
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

async function getThongTinCachLytheoSDT(sdt) {
    try {
        return await axios({
            method: 'Get',
            headers: authHeader(),
            url: `${config.apiUrl}/api/theo-doi-cach-ly/get-thong-tin-theo-sdt`,
            params: {
                'sdt': sdt
            }
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}
async function getInfoDangCachLytheoSDT(sdt) {
    try {
        return await axios({
            method: 'Get',
            headers: authHeader(),
            url: `${config.apiUrl}/api/theo-doi-cach-ly/get-thong-tin-cachly-theo-sdt`,
            params: {
                'sdt': sdt
            }
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}

async function updateTheoDoiCachLy(obj, id) {
    obj.id = id;
    try {
        return await axios({
            method: 'POST',
            headers: authHeader(),
            url: `${config.apiUrl}/api/theo-doi-cach-ly/cap-nhat-theo-doi`,
            data:
            {
                'id': obj.id,
                'ho_ten': obj.ho_ten,
                'nam_sinh': obj.nam_sinh,
                'gioi_tinh': obj.gioi_tinh,
                'so_dien_thoai': obj.so_dien_thoai,
                'quoc_tich': obj.quoc_tich,
                'cmnd': obj.cmnd,

                //'so_nha_dich_te': obj.so_nha_dich_te,


                'ma_xa': obj.ma_xa,
                'ma_huyen': obj.ma_huyen,
                'ma_tinh': obj.ma_tinh,
                'so_nha': obj.so_nha,

                'tinh_bat_dau': obj.tinh_bat_dau,
                'huyen_bat_dau': obj.huyen_bat_dau,
                'xa_bat_dau': obj.xa_bat_dau,
                'so_nha_bat_dau': obj.so_nha_bat_dau,

                'tinh_ket_thuc': obj.tinh_ket_thuc,
                'huyen_ket_thuc': obj.huyen_ket_thuc,
                'xa_ket_thuc': obj.xa_ket_thuc,
                'so_nha_ket_thuc': obj.so_nha_ket_thuc,
                //'thoi_gian_lay_mau': obj.thoi_gian_lay_mau,
                'ngay_khoi_hanh_phuong_tien': obj.ngay_khoi_hanh_phuong_tien,
                'lich_su_dich_te': obj.lich_su_dich_te,
                'loai_phuong_tien': obj.loai_phuong_tien,
                'so_hieu_phuong_tien': obj.so_hieu_phuong_tien,
                'so_ghe_phuong_tien': obj.so_ghe_phuong_tien,
                'tc_sot': obj.tc_sot,
                'tc_ho': obj.tc_ho,
                'tc_kho_tho': obj.tc_kho_tho,
                'tc_dau_hong': obj.tc_dau_hong,
                'tc_non': obj.tc_non,
                'tc_tieu_chay': obj.tc_tieu_chay,
                'tc_xuat_huyet': obj.tc_xuat_huyet,
                'tc_noi_ban': obj.tc_noi_ban,

                'vacxin': obj.vacxin,
                'phoi_nhiem_dong_vat': obj.phoi_nhiem_dong_vat,
                'cham_soc_nguoi_benh': obj.cham_soc_nguoi_benh,
                'buoc': 1,
            }
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}

async function insertTheoDoiCachLy(obj) {
    try {
        return await axios({
            method: 'POST',
            headers: authHeader(),
            url: `${config.apiUrl}/api/theo-doi-cach-ly/them-theo-doi`,
            data: {
                'id': obj.id,
                'ho_ten': obj.ho_ten,
                'nam_sinh': obj.nam_sinh,
                'gioi_tinh': obj.gioi_tinh,
                'so_dien_thoai': obj.so_dien_thoai,
                'quoc_tich': obj.quoc_tich,
                'cmnd': obj.cmnd,

                //'so_nha_dich_te': obj.so_nha_dich_te,


                'ma_xa': obj.ma_xa,
                'ma_huyen': obj.ma_huyen,
                'ma_tinh': obj.ma_tinh,
                'so_nha': obj.so_nha,

                'tinh_bat_dau': obj.tinh_bat_dau,
                'huyen_bat_dau': obj.huyen_bat_dau,
                'xa_bat_dau': obj.xa_bat_dau,
                'so_nha_bat_dau': obj.so_nha_bat_dau,

                'tinh_ket_thuc': obj.tinh_ket_thuc,
                'huyen_ket_thuc': obj.huyen_ket_thuc,
                'xa_ket_thuc': obj.xa_ket_thuc,
                'so_nha_ket_thuc': obj.so_nha_ket_thuc,
                //'thoi_gian_lay_mau': obj.thoi_gian_lay_mau,
                'ngay_khoi_hanh_phuong_tien': obj.ngay_khoi_hanh_phuong_tien,
                'lich_su_dich_te': obj.lich_su_dich_te,
                'loai_phuong_tien': obj.loai_phuong_tien,
                'so_hieu_phuong_tien': obj.so_hieu_phuong_tien,
                'so_ghe_phuong_tien': obj.so_ghe_phuong_tien,
                'tc_sot': obj.tc_sot,
                'tc_ho': obj.tc_ho,
                'tc_kho_tho': obj.tc_kho_tho,
                'tc_dau_hong': obj.tc_dau_hong,
                'tc_non': obj.tc_non,
                'tc_tieu_chay': obj.tc_tieu_chay,
                'tc_xuat_huyet': obj.tc_xuat_huyet,
                'tc_noi_ban': obj.tc_noi_ban,

                'vacxin': obj.vacxin,
                'phoi_nhiem_dong_vat': obj.phoi_nhiem_dong_vat,
                'cham_soc_nguoi_benh': obj.cham_soc_nguoi_benh,
                'buoc': 1,
                'noi_lay_mau': obj.noi_lay_mau
                ,'zalo_user_id': obj.userId
            }
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}

async function declare_confirm(zuser_id, name, phone, start_time, qr_image) {
    try {
        let headers = authHeader();
        headers["Access-Control-Allow-Origin"] = "*";
        return await axios({
            method: 'GET',
            headers: authHeader(),
            url: `${config.apiUrl}/api/van-tai/gui-thong-bao-zalo`,
            // baseURL: 'https://vnptbp-services.herokuapp.com/',
            // url: '/declare_confirm',

            // url: `https://vnptbp-services.herokuapp.com/declare_confirm`,
            // withCredentials: false,
            // headers: {
            //     'Content-Type': 'application/json',
            //     'Access-Control-Allow-Headers': "Access-Control-*, Origin, X-Requested-With, Content-Type, Accept",
            //     'Access-Control-Allow-Origin': '*',
            //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            //     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
            //     'Allow': 'GET, POST, PUT, DELETE, OPTIONS, HEAD'
            // },
            params: {
                'zuser_id': zuser_id,
                'name': name,
                'phone': phone,
                'start_time': start_time,
                'qr_image': qr_image
            },
        }).then((res) => {
            return res.data;
        }).catch(err => {
            return err 
        });
    } catch (error) {
        return handleError(error);
    }

    
}


async function deleteTheoDoiCachLy(lst_id) {
    try {
        return await axios({
            method: 'POST',
            headers: authHeader(),
            url: `${config.apiUrl}/api/theo-doi-cach-ly/xoa-theo-theo-doi`,
            params:
            {
                'lst_id': lst_id
            }
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}

async function DanhsachDiemPhongToaCovid() {
    try {
        return await axios({
            method: "Get",
            headers: authHeader(),
            url: `${config.apiUrl}/api/danh-sach-dia-diem-cach-ly/get-danh-sach-diem-cach-ly`,
        }).then((res) => {
            return res.data;
        });
    } catch (error) {
        return handleError(error);
    }
}

async function ThemDiemPhongToaCovid(id, obj) {

    try {
        return await axios({
            method: "Post",
            headers: authHeader(),
            url: `${config.apiUrl}/api/danh-sach-dia-diem-cach-ly/them-diem-covid`,
            data: {'id': id, ...obj}
        }).then((res) => {
            return res.data;
        });
    } catch (error) {
        return handleError(error);
    }
}

async function getDiemCovidTheoId(id) {
    try {
        return await axios({
            method: "Get",
            headers: authHeader(),
            url: `${config.apiUrl}/api/danh-sach-dia-diem-cach-ly/get-cach-ly-theo-id`,
            params: {
                'id': id
            }
        }).then((res) => {
            return res.data;
        });
    } catch (error) {
        return handleError(error);
    }
}

async function getDiemCovidTheoTrangThai(id_trang_thai) {
    try {
        return await axios({
            method: "Get",
            headers: authHeader(),
            url: `${config.apiUrl}/api/danh-sach-dia-diem-cach-ly/get-danh-sach-diem-phong-toa-theo-trang-thai`,
            params: {
                'id_trang_thai': id_trang_thai
            }
        }).then((res) => {
            return res.data;
        });
    } catch (error) {
        return handleError(error);
    }
}

async function getDiemCovidDiemBatDau(tinh_bat_dau, huyen_bat_dau, xa_bat_dau) {
    try {
        return await axios({
            method: "Get",
            headers: authHeader(),
            url: `${config.apiUrl}/api/danh-sach-dia-diem-cach-ly/get-danh-sach-diem-phong-toa`,
            params: {
                'id_tinh_tp': tinh_bat_dau,
                'id_quan_huyen': huyen_bat_dau,
                'id_phuong_xa': xa_bat_dau
            }
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
