import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      {/* <div style={{marginLeft: '50%'}}>
        <img style={{width: '60px', height: '60px'}} src="logovnpt.jpg"/>
      </div> */}
      <div className="mfs-auto">
        <span className="mr-1">@Bản quyền <b>VNPT Bình Phước</b> &copy; 2021.</span>
        <p className="mr-1">Địa chỉ: 1137 đường Phú Riềng Đỏ, P. Tân Bình,
Thành phố Đồng Xoài, Bình Phước</p>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
