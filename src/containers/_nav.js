import React, { useEffect } from 'react';
import CIcon from '@coreui/icons-react';

const _nav =[
  {
    _tag: 'CSidebarNavItem',
    name: 'Tờ khai y tế',
    to: '/to-khai-y-te',
    icon: 'cil-menu',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Xác minh tờ khai y tế',
    to: '/danh-sach-to-khai-y-te',
    icon: 'cil-menu',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Kiểm tra dịch tễ',
    to: '/danh-sach-dich-te',
    icon: 'cil-menu',
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Báo cáo',
    route: '/bao-cao',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Thống kê theo từng chốt',
        to: '/bao-cao/thong-ke-tung-chot',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Thống kê lượt vận tải',
        to: '/bao-cao/thong-ke-luot-van-tai',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Thống kê số lượng PT',
        to: '/bao-cao/thong-ke-so-luong-phuong-tien',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Báo cáo tài xế qua chốt',
        to: '/bao-cao/thong-ke-tai-xe-qua-chot',
      },
    ]
  },
  {
	    _tag: 'CSidebarNavItem',
	    name: 'Danh sách điểm cách ly covid',
	    to: '/khai-bao-diem-covid',
	    icon: 'cil-menu',
	  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Tờ khai Công Nhân',
    to: '/to-khai-cong-nhan',
    icon: 'cil-Pencil',
  },
{
    _tag: 'CSidebarNavDropdown',
    name: 'Khu công nghiệp',
    route: '/khu-cong-nghiep',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Danh mục khu công nghiệp',
        to: '/khu-cong-nghiep/danh-muc-kcn',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Danh sách công ty',
        to: '/khu-cong-nghiep/danh-sach-cong-ty',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Danh sách công nhân',
        to: '/khu-cong-nghiep/danh-sach-cong-nhan',
      }
    ]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Tờ khai Công Nhân',
    to: '/to-khai-cong-nhan',
    icon: 'cil-Pencil',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Cấu hình hệ thống',
    to: '/cau-hinh-he-thong',
    icon: 'cil-menu',
  },

];
export default _nav
