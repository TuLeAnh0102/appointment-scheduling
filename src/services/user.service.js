import config from '../configs/config';
import { authHeader } from '../helpers';
import axios from 'axios';
import {commonService} from './common.service';

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
            url : `${config.apiUrl}/api/user/login`,
            params: {
                'username' : username,
                'password': password
            }
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return commonService.handleError(error);
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
            url: `${config.apiUrl}/api/user/getall`
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return commonService.handleError(error);
    }
}

async function getUserById(id) {
    try {
        return await axios({
            method: 'Get',
            headers: authHeader(),
            url: `${config.apiUrl}/api/user/informationUser`,
            params: {
                'id' : id
            }
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return commonService.handleError(error);
    }
}

async function createUser(user) {

    try {
        return await axios({
            method: 'POST',
            headers: authHeader(),
            url: `${config.apiUrl}/api/user/update`,
            data: JSON.stringify(user)
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return commonService.handleError(error);
    }
}

async function updateUser(user) {
    try {
        return await axios({
            method: 'POST',
            headers: authHeader(),
            url: `${config.apiUrl}/api/user/login`,
            body: JSON.stringify(user)
        }).then((res) => {
            return res.data;
        })
    } catch (error) {
        return commonService.handleError(error);
    }
}

