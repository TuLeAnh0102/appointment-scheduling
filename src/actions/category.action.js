import { categoryConstants } from "../constants";
import { categoryService } from "../services";
import { alertAction } from "./alert.action";
import { history } from "../helpers";

export const cateforyAction = {
  getAllDanhMucTinh,
  getAllDanhMucHuyen,
  getAllDanhMucXa,
};
function getAllDanhMucTinh() {
  return async (dispatch) => {
    dispatch(request());
    try {
      const response = await categoryService.getDanhMucTinh();
      if (response.success) {
        dispatch(success(response.data));
        //localStorage.setItem('dmAllTinh', JSON.stringify(response.data));
      } else {
        dispatch(failure(response.message.toString()));
        dispatch(alertAction.error(response.message.toString()));
      }
    } catch (error) {
      dispatch(failure(error.toString()));
      dispatch(alertAction.error(error.toString()));
    }
  };

  function request() {
    return { type: categoryConstants.GETALL_TINH_REQUEST };
  }
  function success(data) {
    return { type: categoryConstants.GETALL_TINH_SUCCESS, data };
  }
  function failure(error) {
    return { type: categoryConstants.GETALL_TINH_FAILURE, error };
  }
}

function getAllDanhMucHuyen() {
  return async (dispatch) => {
    dispatch(request());
    try {
      const response = await categoryService.getAllDanhMucHuyen();
      if (response.success) {
        dispatch(success(response.data));
        //localStorage.setItem('dmAllHuyen', JSON.stringify(response.data));
      } else {
        dispatch(failure(response.message.toString()));
        dispatch(alertAction.error(response.message.toString()));
      }
    } catch (error) {
      dispatch(failure(error.toString()));
      dispatch(alertAction.error(error.toString()));
    }
  };

  function request() {
    return { type: categoryConstants.GETALL_HUYEN_REQUEST };
  }
  function success(data) {
    return { type: categoryConstants.GETALL_HUYEN_SUCCESS, data };
  }
  function failure(error) {
    return { type: categoryConstants.GETALL_HUYEN_FAILURE, error };
  }
}

function getAllDanhMucXa() {
  return async (dispatch) => {
    dispatch(request());
    try {
      const response = await categoryService.getAllDanhMucXa();
      if (response.success) {
        dispatch(success(response.data));
        //localStorage.setItem('dmAllXa', JSON.stringify(response.data));
      } else {
        dispatch(failure(response.message.toString()));
        dispatch(alertAction.error(response.message.toString()));
      }
    } catch (error) {
      dispatch(failure(error.toString()));
      dispatch(alertAction.error(error.toString()));
    }
  };

  function request() {
    return { type: categoryConstants.GETALL_XA_REQUEST };
  }
  function success(data) {
    return { type: categoryConstants.GETALL_XA_SUCCESS, data };
  }
  function failure(error) {
    return { type: categoryConstants.GETALL_XA_FAILURE, error };
  }
}
