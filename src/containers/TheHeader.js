import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
} from '@coreui/react'

import { 
  TheHeaderDropdown,
}  from './index'
import { commonConstants } from "../constants/common.constants.js";

// routes config
import routes from '../routes'

const TheHeader = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector(state => state.common.sidebarShow);
  const isLoggin = useSelector(state => state.authentication.loggedIn);
  // useEffect(() => {
  //   console.log('isLoggin',isLoggin);
  // }, [isLoggin])

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: commonConstants.SIDEBAR_SHOW, sidebarShow: val})
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: commonConstants.SIDEBAR_SHOW, sidebarShow: val})
  }

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderNav className="d-md-down-none mr-auto">
       
       </CHeaderNav>
       {(isLoggin ===false || isLoggin === undefined)? "": 
        <CHeaderNav className="px-3">
          <TheHeaderDropdown/>
        </CHeaderNav>
       }
      
      <CHeaderBrand className="mx-auto d-lg-none" to="/" style={{ textAlign: "center" }}>
        <h4>UBND Tỉnh Bình Phước</h4>
      </CHeaderBrand>
    </CHeader>
  )
}

export default TheHeader
