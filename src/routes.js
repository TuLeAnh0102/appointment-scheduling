import React from 'react';

const CauHinhHeThong = React.lazy(() => import('./views/Pages/CauHinhHeThong/cauhinhhethong'));
const routes = [
  { path: '/', exact: true, name: 'Trang chủ' },
  { path: '/cau-hinh-he-thong', name: 'Cấu hình hệ thống', component: CauHinhHeThong}
];

export default routes;
