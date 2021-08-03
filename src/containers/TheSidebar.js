import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import { commonConstants } from "../constants/common.constants.js";
import { userAction } from "../actions";

// sidebar nav config
//import navigation from "./_nav";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.common.sidebarShow);
  let user = JSON.parse(localStorage.getItem("user"));
  const _nav = [
    {
      _tag: "CSidebarNavItem",
      name: "Tờ khai y tế",
      to: "/to-khai-y-te",
      icon: "cil-cursor",
    },
    // {
    //   _tag: "CSidebarNavItem",
    //   name: "Đăng ký về Bình Phước",
    //   to: "/dang-ky-ve-bpc",
    //   icon: "cil-user",
    // },
    {
      _tag: "CSidebarNavItem",
      name: "Tờ khai Công Nhân",
      to: "/to-khai-cong-nhan",
      icon: "cil-user",
    },
    {
      _tag: "CSidebarNavItem",
      name: "Tờ khai vận tải",
      to: "/khai-bao-van-tai/0/0",
      icon: "cil-car-alt",
    },
    {
      _tag: "CSidebarNavItem",
      name: "Khai báo sức khỏe",
      to: "/theo-doi-suc-khoe/khai-bao/0",
      icon: "cil-car-alt",
    },

  ];

  const [navigation, setNavigation] = useState([]);
  useEffect(() => {
    console.log(user);
    if (user == null || user === undefined){
      _nav.push({
          _tag: "CSidebarNavItem",
          name: "Đăng nhập",
          to: "/login",
          icon: "cil-cursor",
        });
    } else
    {
      if (
        user.is_lanh_dao === undefined || user.is_lanh_dao == null ||
        user.is_kcn === undefined || user.is_kcn == null ||
        user.is_cong_ty === undefined ||  user.is_cong_ty == null ||
        user.is_chot === undefined || user.is_chot == null ||
        user.is_admin_gtvt === undefined || user.is_admin_gtvt == null ||
        user.is_chot_kb_gtvt === undefined || user.is_chot_kb_gtvt == null) {
        dispatch(userAction.logout());
      }
      if (user.is_chot) {
        _nav.push({
          _tag: "CSidebarNavItem",
          name: "Xác minh tờ khai y tế",
          to: "/danh-sach-to-khai-y-te",
          icon: "cil-location-pin",
        });
        _nav.push({
          _tag: "CSidebarNavItem",
          name: "Kiểm tra dịch tễ",
          to: "/danh-sach-dich-te",
          icon: "cil-star",
        });
        _nav.push({
          _tag: "CSidebarNavDropdown",
          name: "Báo cáo",
          route: "/bao-cao",
          icon: "cil-chart-pie",
          _children: [
            {
              _tag: "CSidebarNavItem",
              name: "Thống kê theo từng chốt",
              to: "/bao-cao/thong-ke-tung-chot",
            },
            {
              _tag: "CSidebarNavItem",
              name: "Thống kê lượt vận tải",
              to: "/bao-cao/thong-ke-luot-van-tai",
            },
            {
              _tag: "CSidebarNavItem",
              name: "Thống kê số lượng PT",
              to: "/bao-cao/thong-ke-so-luong-phuong-tien",
            },
            {
              _tag: 'CSidebarNavItem',
              name: 'Thống kê tài xế qua chốt',
              to: '/bao-cao/thong-ke-tai-xe-qua-chot',
            },
            {
              _tag: 'CSidebarNavItem',
              name: 'Thống kê công nhân',
              to: '/bao-cao/thong-ke-cong-nhan',
            },
          ],
        });
        _nav.push({
          _tag: "CSidebarNavDropdown",
          name: "Báo cáo vận tải",
          route: "/bao-cao-van-tai",
          icon: "cil-chart-pie",
          _children: [
            {
              _tag: "CSidebarNavItem",
              name: "Thống kê chi tiết vận tải",
              to: "/bao-cao-van-tai/thong-ke-chi-tiet",
            },
            {
              _tag: "CSidebarNavItem",
              name: "Thống kê số lượt PT",
              to: "/bao-cao-van-tai/thong-ke-so-luong",
            }
          ],
        });

        _nav.push({
          _tag: "CSidebarNavItem",
          name: "Theo dõi sức khỏe",
          to: "/theo-doi-suc-khoe/danh-sach",
          icon: "cil-location-pin",
        })
      }
      if (user.is_chot_kb_gtvt){
        _nav.push({
          _tag: "CSidebarNavItem",
          name: "Xác minh vận tải",
          icon: "cil-star",
          to: "/van-tai/danh-sach-to-khai-van-tai",
        });
      }
      if (user.is_admin_gtvt){
        _nav.push({
          _tag: "CSidebarNavItem",
          name: "Điểm giao/nhận hàng",
          icon: "cil-star",
          to: "/van-tai/danh-sach-diem-kiem-tra",
        });
      }
      if (user.is_lanh_dao) {
        _nav.push({
          _tag: 'CSidebarNavItem',
          name: 'Danh sách điểm cách ly covid',
          to: '/khai-bao-diem-covid',
          icon: 'cil-menu',
        });

        _nav.push({
          _tag: "CSidebarNavItem",
          name: "Danh mục khu công nghiệp",
          to: "/khu-cong-nghiep/danh-muc-kcn",
          icon: "cil-layers",
        });
      }
      if (user.is_kcn) {
        _nav.push({
          _tag: "CSidebarNavItem",
          name: "Danh sách công ty",
          to: "/khu-cong-nghiep/danh-sach-cong-ty",
          icon: "cil-home",
        });
      }
      if (user.is_cong_ty) {
        _nav.push({
          _tag: "CSidebarNavItem",
          name: "Danh sách công nhân",
          to: "/khu-cong-nghiep/danh-sach-cong-nhan",
          icon: "cil-people",
        });
      }
      if (user.is_admin) {
        _nav.push({
          _tag: 'CSidebarNavItem',
          name: 'Cấu hình hệ thống',
          to: '/cau-hinh-he-thong',
          icon: 'cil-settings',
        });
      }
      if(user.is_so_ldtbxh !== undefined && user.is_so_ldtbxh !== null && user.is_so_ldtbxh)
      {
        _nav.push({
          _tag: "CSidebarNavItem",
          name: "DS người đăng ký về BP",
          to: "/danh-sach-dang-ky-ve-bpc",
          icon: "cil-people",
        });
      }
    }

    setNavigation(_nav);
  }, []);


  return (
    <CSidebar
      show={show}
      onShowChange={(val) =>
        dispatch({ type: commonConstants.SIDEBAR_SHOW, sidebarShow: val })
      }
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <img src="logo.png"></img>
        UBND Tỉnh Bình Phước
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
