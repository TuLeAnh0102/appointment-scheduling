import { CCol, CContainer, CRow,CFormGroup,CLabel, CFormText,CInput   } from "@coreui/react";
import React from "react";


function KhaiBaoYTePageV2(props) {
    return(
        <CContainer>
            <CRow>
            <CFormGroup>
              <CLabel htmlFor="nf-email">Email</CLabel>
              <input></input>
              <CFormText className="help-block">Please enter your email</CFormText>
            </CFormGroup>
            </CRow>
        </CContainer>
      
     
    );
  }
  
  export default KhaiBaoYTePageV2;
