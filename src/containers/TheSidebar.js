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
      name: "Cấu hình hệ thống",
      to: "/cau-hinh-he-thong",
      icon: "cil-cursor",
    }
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
      if (user.is_chot) {
        // _nav.push({
        //   _tag: "CSidebarNavDropdown",
        //   name: "Báo cáo",
        //   route: "/bao-cao",
        //   icon: "cil-chart-pie",
        //   _children: [
        //     {
        //       _tag: "CSidebarNavItem",
        //       name: "Thống kê theo từng chốt",
        //       to: "/bao-cao/thong-ke-tung-chot",
        //     },
        //     {
        //       _tag: "CSidebarNavItem",
        //       name: "Thống kê lượt vận tải",
        //       to: "/bao-cao/thong-ke-luot-van-tai",
        //     },
        //     {
        //       _tag: "CSidebarNavItem",
        //       name: "Thống kê số lượng PT",
        //       to: "/bao-cao/thong-ke-so-luong-phuong-tien",
        //     },
        //     {
        //       _tag: 'CSidebarNavItem',
        //       name: 'Thống kê tài xế qua chốt',
        //       to: '/bao-cao/thong-ke-tai-xe-qua-chot',
        //     },
        //     {
        //       _tag: 'CSidebarNavItem',
        //       name: 'Thống kê công nhân',
        //       to: '/bao-cao/thong-ke-cong-nhan',
        //     },
        //   ],
        // });
        // _nav.push({
        //   _tag: "CSidebarNavDropdown",
        //   name: "Báo cáo vận tải",
        //   route: "/bao-cao-van-tai",
        //   icon: "cil-chart-pie",
        //   _children: [
        //     {
        //       _tag: "CSidebarNavItem",
        //       name: "Thống kê chi tiết vận tải",
        //       to: "/bao-cao-van-tai/thong-ke-chi-tiet",
        //     },
        //     {
        //       _tag: "CSidebarNavItem",
        //       name: "Thống kê số lượt PT",
        //       to: "/bao-cao-van-tai/thong-ke-so-luong",
        //     }
        //   ],
        // });

        // _nav.push({
        //   _tag: "CSidebarNavItem",
        //   name: "Theo dõi sức khỏe",
        //   to: "/theo-doi-suc-khoe/danh-sach",
        //   icon: "cil-location-pin",
        // })
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
