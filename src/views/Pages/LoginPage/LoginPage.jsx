/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CCardHeader,
  CCardFooter,
  CInputGroupText,
  CFormText,
  CRow
} from '@coreui/react';
  import CIcon from '@coreui/icons-react'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userAction, alertAction } from '../../../actions';
import Background from '../../../assets/background.gif';

function LoginPage() {
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const { username, password } = inputs;
  const loggingIn = useSelector(state => state.authentication.loggingIn);
  const alert = useSelector(state => state.alert);
  const dispatch = useDispatch();
  const location = useLocation();

  // reset login status
  useEffect(() => { 
    dispatch(userAction.logout()); 
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
    if(alert.message){
      dispatch(alertAction.clear());
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (username && password) {
        // get return url from location state or default to home page
      const { from } = location.state || { from: { pathname: "/" } };
        dispatch(userAction.login(username, password, from));
    }
}

  return (
    <div className="c-app c-default-layout flex-row align-items-center" style={{backgroundImage : "url(" + Background + ")"}}>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
              <CCardGroup>
                  <CCard style={{ textAlign: "center", color: "white"}}>
                      <CCardHeader style={{ backgroundColor : "#337ab7" }}>
                          <h1>VNPT Bình Phước</h1>
                      </CCardHeader>
                      <CCardBody>
                          <CForm name="form" onSubmit={handleSubmit}>
                              <CInputGroup className="mb-3">
                                  <CInputGroupPrepend>
                                      <CInputGroupText>
                                        <CIcon name="cil-user" />
                                      </CInputGroupText>
                                  </CInputGroupPrepend>
                                  <CInput type="text" placeholder="Tài khoản" autoComplete="username" name="username" onChange={handleChange} value={username} />
                                  {submitted && !username &&
                                      <CFormText className="help-block">Vui lòng nhập tài khoản</CFormText>
                                  }
                              </CInputGroup>
                              <CInputGroup className="mb-4" >
                                  <CInputGroupPrepend>
                                    <CInputGroupText>
                                      <CIcon name="cil-lock-locked" />
                                    </CInputGroupText>
                                  </CInputGroupPrepend>  
                                  <CInput type="password" placeholder="Mật khẩu" autoComplete="current-password" name="password" onChange={handleChange} value={password} />
                                  {submitted && !password &&
                                      <CFormText className="help-block">Vui lòng nhập mật khẩu</CFormText>
                                  }
                              </CInputGroup>
                              <CRow>
                                  <CCol xs="12">
                                      {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                      <CButton color="primary" block onClick={handleSubmit} >Đăng nhập</CButton>
                                  </CCol>
                              </CRow>
                          </CForm>
                      </CCardBody>
                      <CCardFooter style={{ backgroundColor : "#337ab7" }}>
                          ©VNPT BÌNH PHƯỚC
                      </CCardFooter>
                  </CCard>
              </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default LoginPage;
