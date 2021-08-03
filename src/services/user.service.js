import config from '../configs/config';
import { authHeader, history } from '../helpers';

import axios from 'axios';

export const userService = {
    login,
    logout,
    getAllUser,
    createUser,
    updateUser,
    getUserById
};

async function login (username, password){
    try {
        return await axios({
            method: 'Post',
            headers: authHeader(),
            url : `${config.apiUrl}/api/nhan-vien/login`,
            params: {
                'username' : username,
                'password': password
            }
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}

function logout() {
    localStorage.removeItem('user');
}

async function getAllUser() {
    try {
        return await axios({
            method: 'Get',
            headers: authHeader(),
            url : `${config.apiUrl}/api/nguoi-dung/danh-sach-nguoi-dung`
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}

async function getUserById(ma_nhan_vien_kc) {
    try {
        return await axios({
            method: 'Get',
            headers: authHeader(),
            url : `${config.apiUrl}/api/nhan-vien/thong-tin-nhan-vien`,
            params: {
                'ma_nhan_vien_kc' : ma_nhan_vien_kc
            }
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}

async function createUser(user) {

    try {
        return await axios({
            method: 'POST',
            headers: authHeader(),
            url : `${config.apiUrl}/api/nhan-vien/cap-nhat-thong-tin`,
            data: JSON.stringify(user)
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return handleError(error);
    }
}

async function updateUser(user) {

    try {
        return await axios({
            method: 'POST',
            headers: authHeader(),
            url : `${config.apiUrl}/api/nhan-vien/login`,
            body: JSON.stringify(user)
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
