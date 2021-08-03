import React from 'react';

//Danh sách các trường hợp cách ly tại nhà, tự theo doi sức khỏe
const ThongKeTheoTungChotPage = React.lazy(() => import('./views/Pages/BaoCao/ThongKeTheoTungChot/ThongKeTheoTungChot'));
const DanhSachToKhai = React.lazy(() => import('./views/Pages/DanhSachToKhai/DanhSachToKhai'));
const XacNhanThongTinToKhaiPage = React.lazy(() => import('./views/Pages/DanhSachToKhai/XacNhanThongTinToKhaiPage'));
const DanhSachDichTe = React.lazy(() => import('./views/Pages/KiemTraDichTe/DanhSachDichTe'));
const KiemTraDichTe = React.lazy(() => import('./views/Pages/KiemTraDichTe/KiemTraDichTe'));
const ToKhaiYTe = React.lazy(() => import('./views/Pages/ToKhaiYTe/ToKhaiYTe'));
const ToKhaiCongNhan = React.lazy(() => import('./views/Pages/ToKhaiCongNhan/ToKhaiCongNhan'));
const ToKhaiVanTai = React.lazy(() => import('./views/Pages/ToKhaiYTe/ToKhaiVanTai.js'));
const ThongKeLuotVanTaiPage = React.lazy(() => import('./views/Pages/BaoCao/ThongKeTheoVanTai/ThongKeTheoLuotVanTai'));
const ThongKeSoLuongPT = React.lazy(() => import('./views/Pages/BaoCao/ThongKeSoLuongPT/ThongKeSoLuongPT'))
const KhaiBaoDiemCovid = React.lazy(()=> import('./views/Pages/DiemDichCovid/KhaiBaoDiemCovid'));
const DanhMucKhuCongNghiepPage = React.lazy(() => import('./views/Pages/KhuCongNghiep/DanhMucKhuCongNghiep'));
const DanhSachCongTyPage = React.lazy(() => import('./views/Pages/CongTy/DanhSachCongTy'));
const DanhSachCongNhanPage = React.lazy(() => import('./views/Pages/CongNhan/DanhSachCongNhan'));
const CapNhatToKhaiCongNhan = React.lazy(()=> import('./views/Pages/ToKhaiCongNhan/CapNhatToKhaiCongNhan'));
const ThongKeTaiXeQuaChot = React.lazy(() => import('./views/Pages/BaoCao/ThongKeTaiXeQuaChot/ThongKeTaiXeQuaChot'));
const ThongTinToKhai = React.lazy(()=> import('./views/Pages/ThongTinToKhaiCoQR/ThongTinToKhai'));
const ThongKeCongNhanTheoSDT = React.lazy(() => import('./views/Pages/BaoCao/ThongKeCongNhanTheoSDT/ThongKeCongNhanTheoSDT'));
const XacNhanCheckout = React.lazy(() =>import('./views/Pages/XacNhanCheckout/XacNhanCheckout'));
const DanhSachDiemKiemTra = React.lazy(() => import('./views/Pages/ChotVanTai/DanhSachDiemKiemTra'));

const DanhSachToKhaiVanTai = React.lazy(() => import('./views/Pages/DanhSachToKhaiVanTai/DanhSachToKhaiVanTai.jsx'));
const XacNhanThongTinToKhaiVanTai = React.lazy(() => import('./views/Pages/DanhSachToKhaiVanTai/XacNhanThongTinToKhaiVanTai.jsx'));

const ThongKeSoLuongPTTheoToKhaiVanTai = React.lazy(() => import('./views/Pages/BaoCao/ThongKeTheoToKhaiVanTai/ThongKeSoLuotTheoToKhaiVanTai'))
const ThongKeChiTietTheoToKhaiVanTai = React.lazy(() => import('./views/Pages/BaoCao/ThongKeTheoToKhaiVanTai/ThongKeChiTietTheoToKhaiVanTai'))

const TheoDoiSucKhoe = React.lazy(() => import('./views/Pages/TheoDoiSucKhoe/TheoDoiSucKhoe'));
const KhaiBaoSucKhoe = React.lazy(() => import('./views/Pages/TheoDoiSucKhoe/KhaiBaoSucKhoe'));

const DangKyVeBPC = React.lazy(() => import('./views/Pages/ToKhaiYTe/DangKyVeBPC'));
const DanhSachDangKyVeBPCPage = React.lazy(() => import('./views/Pages/DangKiVeBPC/DanhSachDangKiVeBinhPhuoc'))
const CauHinhHeThong = React.lazy(() => import('./views/Pages/CauHinhHeThong/cauhinhhethong'));


const routes = [
  { path: '/', exact: true, name: 'Trang chủ' },
  { path: '/danh-sach-to-khai-y-te', name: 'Danh sách tờ khai y tế', component: DanhSachToKhai},
  { path: '/xac-nhan-thong-tin-to-khai/:id', name: 'Xác nhận thông tin tờ khai', component: XacNhanThongTinToKhaiPage},

  { path: '/danh-sach-dich-te', name: 'Danh sách dich tễ', component: DanhSachDichTe},
  { path: '/kiem-tra-dich-te/:id', name: 'Kiểm tra dịch tễ', component: KiemTraDichTe},
  { path: '/to-khai-y-te/:id/:zaloID', name: 'Khai bao y tế', component: ToKhaiYTe},
  { path: '/thong-tin-to-khai/:id', name: 'Thông tin tờ khai', component: ThongTinToKhai},

  { path: '/bao-cao/thong-ke-luot-van-tai', name: 'Khai bao y tế', component: ThongKeLuotVanTaiPage},
  { path: '/bao-cao/thong-ke-tung-chot', name: 'Thống kê', component: ThongKeTheoTungChotPage },
  { path: '/bao-cao/thong-ke-so-luong-phuong-tien', name: 'Thống kê', component: ThongKeSoLuongPT },
  { path: '/bao-cao/thong-ke-tai-xe-qua-chot', name: 'Thống kê', component: ThongKeTaiXeQuaChot },
  { path: '/bao-cao/thong-ke-cong-nhan', name: 'Thống kê', component: ThongKeCongNhanTheoSDT},

  { path: '/bao-cao-van-tai/thong-ke-so-luong', name: 'Thống kê', component: ThongKeSoLuongPTTheoToKhaiVanTai},
  { path: '/bao-cao-van-tai/thong-ke-chi-tiet', name: 'Thống kê', component: ThongKeChiTietTheoToKhaiVanTai},

  { path: '/khai-bao-diem-covid', name: 'Danh sách điểm nhiễm covid', component: KhaiBaoDiemCovid },
  { path: '/to-khai-cong-nhan', name: 'Khai báo Công nhân', component: ToKhaiCongNhan},
  { path: '/khai-bao-van-tai/:id/:zaloID', name: 'Khai báo Vận Tải', component: ToKhaiVanTai},
  { path: '/cap-nhat-to-khai-cong-nhan/:id', name: 'Cập nhật tờ khai công nhân', component: CapNhatToKhaiCongNhan },
	{ path: '/khu-cong-nghiep/danh-muc-kcn', name: 'Danh sách khu công nghiệp', component: DanhMucKhuCongNghiepPage },
  { path: '/khu-cong-nghiep/danh-sach-cong-ty', name: 'Danh sách công ty', component: DanhSachCongTyPage },
  { path: '/khu-cong-nghiep/danh-sach-cong-nhan', name: 'Danh sách công nhân', component: DanhSachCongNhanPage },

  { path: '/checkout', name: 'Xác mình rời khỏi tỉnh', component: XacNhanCheckout},

  { path: '/van-tai/danh-sach-diem-kiem-tra', name: 'Danh sách điểm kiểm tra', component: DanhSachDiemKiemTra },
  { path: '/van-tai/danh-sach-to-khai-van-tai', name: 'Danh sách tờ khai vận tải', component: DanhSachToKhaiVanTai },
  { path: '/van-tai/xac-nhan-thong-tin-to-khai-van-tai/:id', name: 'Xac', component: XacNhanThongTinToKhaiVanTai },

  { path: '/theo-doi-suc-khoe/danh-sach', name: 'Danh sách', component: TheoDoiSucKhoe },
  { path: '/theo-doi-suc-khoe/khai-bao/:id', name: 'Khai báo', component: KhaiBaoSucKhoe},
  { path: '/dang-ky-ve-bpc', name: 'Cấu hình hệ thống', component: DangKyVeBPC},
  { path: '/danh-sach-dang-ky-ve-bpc', name: 'Cấu hình hệ thống', component: DanhSachDangKyVeBPCPage},


  { path: '/cau-hinh-he-thong', name: 'Cấu hình hệ thống', component: CauHinhHeThong}

];

export default routes;
