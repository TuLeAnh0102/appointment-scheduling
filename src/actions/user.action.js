
import { userConstants } from '../constants';
import { userService } from '../services';
import { alertAction } from './alert.action';
import { history } from '../helpers';

export const userAction = {
    login,
    logout,
    createUser,
    getAllUser,
    getUserById
    // delete: _delete
};

function login(username, password) {
    return async dispatch => {
        dispatch(request({ username }));
        try {
            const response = await userService.login(username, password);
            if (response.success)
            {
                dispatch(success(response.data));
                localStorage.setItem('user', JSON.stringify(response.data));
                history.push('/');
            } else {
                dispatch(failure(response.message.toString()));
                dispatch(alertAction.error(response.message.toString()));
            }
        } catch (error) {
            dispatch(failure(error.toString()));
            dispatch(alertAction.error(error.toString()));
        } 
        function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
        function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
        function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
    }
}

function logout() {
    userService.logout();
    history.push('/login');
    return { type: userConstants.LOGOUT };
}

function createUser(user) {
    return async dispatch => {
        dispatch(request(user));
        try {
            const response = await userService.createUser(user);
            if (response.success)
            {
                dispatch(success());
                dispatch(alertAction.success('Create successful'));
            } else {
                dispatch(failure(response.message.toString()));
                dispatch(alertAction.error(response.message.toString()));
            }
        } catch (error) {
            dispatch(failure(error.toString()));
            dispatch(alertAction.error(error.toString()));
        }
        
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAllUser() {
    return async dispatch => {
        dispatch(request());

        try {
            const response = await userService.getAllUser();
            if (response.success)
            {
                dispatch(success(response.data));
            } else {
                dispatch(failure(response.message.toString()));
                dispatch(alertAction.error(response.message.toString()));
            }
        } catch (error) {
            dispatch(failure(error.toString()));
            dispatch(alertAction.error(error.toString()));
        }
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(data) { return { type: userConstants.GETALL_SUCCESS, data } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
 }

 function getUserById(ma_nhan_vien_kc) {
    return async dispatch => {
        dispatch(request());

        try {
            const response = await userService.getUserById(ma_nhan_vien_kc);
            if (response.success)
            {
                dispatch(success(response.data));
            } else {
                dispatch(failure(response.message.toString()));
                dispatch(alertAction.error(response.message.toString()));
            }
        } catch (error) {
            dispatch(failure(error.toString()));
            dispatch(alertAction.error(error.toString()));
        }
    };

    function request() { return { type: userConstants.GETBYID_REQUEST } }
    function success(data) { return { type: userConstants.GETBYID_SUCCESS, data } }
    function failure(error) { return { type: userConstants.GETBYID_FAILURE, error } }
 }
