import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alertAction } from '../src/actions';
import { history } from  './helpers';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import async from "./components/Async";
import './scss/style.scss';
// import {LoginPage} from  './views/Pages/LoginPage';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const HomePage = async(() => import('./containers/TheLayout'));

// Pages
const LoginPage = async(() => import('./views/Pages/LoginPage/LoginPage'));
const Page404 = async(() =>  import('./views/Pages/page404/Page404'));
const Page500 = async(() =>  import('./views/Pages/page500/Page500'));
const ThongTinToKhai = React.lazy(() => import('./views/Pages/ThongTinToKhaiCoQR/ThongTinToKhai'));
const XacNhanCheckout = React.lazy(() => import('./views/Pages/XacNhanCheckout/XacNhanCheckout'));
const DangKyVeBPC = React.lazy(() => import('./views/Pages/ToKhaiYTe/DangKyVeBPC'));
function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();


    useEffect(() => {
        history.listen((location, action) => {
            // dispatch(alertAction.clear());
        });
        // commonService.getDanhMucXa().then(res => {
        //   dispatch(setDmXa(res.data););
        //   dispatch({ type: commonConstants.SET_TOKHAI_YTE, toKhaiYTe: id });
        // })
        // eslint-disable-next-line
    }, []);

    return (
      <>
      {alert.message &&
          <div className={`alert ${alert.type}`}>{alert.message}</div>
      }
      <Router history={history}>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/login" name="Login Page"  component={LoginPage} />
              <Route exact path="/404" name="Page 404"  component={Page404}  />
              <Route exact path="/500" name="Page 500"  component={Page500}  />
              <Route exact path="/dang-ky-ve-bpc" name="Đăng kí về Bình Phước" component={DangKyVeBPC}></Route>
              <PrivateRoute exact path="/danh-sach-to-khai-y-te" component={HomePage} />
              <PrivateRoute exact path="/danh-sach-dich-te" component={HomePage} />
              <PrivateRoute exact path="/kiem-tra-dich-te/:id" component={HomePage} />
              <PrivateRoute exact path="/bao-cao/thong-ke-luot-van-tai" component={HomePage} />
              <PrivateRoute exact path="/bao-cao/thong-ke-tung-chot" component={HomePage} />
              <PrivateRoute exact path="/bao-cao/thong-ke-so-luong-phuong-tien" component={HomePage} />
              <PrivateRoute exact path="/bao-cao/thong-ke-tai-xe-qua-chot" component={HomePage} />
              <PrivateRoute exact path="/bao-cao/thong-ke-cong-nhan" component={HomePage} />

              <PrivateRoute exact path="/bao-cao-van-tai/thong-ke-chi-tiet" component={HomePage} />
              <PrivateRoute exact path="/bao-cao-van-tai/thong-ke-so-luong" component={HomePage} />

              <PrivateRoute exact path="/khai-bao-diem-covid" component={HomePage} />
              <PrivateRoute exact path="/khu-cong-nghiep/danh-muc-kcn" component={HomePage} />
              <PrivateRoute exact path="/khu-cong-nghiep/danh-sach-cong-ty" component={HomePage} />
              <PrivateRoute exact path="/khu-cong-nghiep/danh-sach-cong-nhan" component={HomePage} />

              <Route path="/to-khai-y-te" name="Tờ khai y tế" component={HomePage} />
              <Route path="/to-khai-cong-nhan" name="Tờ khai Công Nhân" component={HomePage} />
              <Route exact path="/khai-bao-van-tai/0" name="Khai báo vận tải" component={HomePage} />
              {/* <Route exact path="/dang-ky-ve-bpc" name="Đăng ký về Bình Phước" component={HomePage} /> */}

              <Route exact path="/theo-doi-suc-khoe/khai-bao" name="Khai báo sức khỏe" component={HomePage} />
              <PrivateRoute exact path="/theo-doi-suc-khoe/danh-sach" name="Khai báo sức khỏe" component={HomePage} />

              <Route path="/" name="Home" component={HomePage} />
              <Route path="/thong-tin-to-khai" name="Thông tin tờ khai" component={ThongTinToKhai} />
              <Route path="/checkout" name="Xác nhận rời khỏi tỉnh" component={XacNhanCheckout} />
              <PrivateRoute exact path="/van-tai/danh-sach-diem-kiem-tra" name="Danh sách điểm kiểm tra" component={HomePage} />

              <PrivateRoute exact path="/van-tai/danh-sach-to-khai-van-tai" name="Danh sách tờ khai vận tải" component={HomePage} />
              <PrivateRoute exact path="/cau-hinh-he-thong" name="Cấu hình hệ thống" component={HomePage} />

              <PrivateRoute exact path="/danh-sach-dang-ky-ve-bpc" name="Danh sách người đăng kí về Bình Phước" component={HomePage} />
            </Switch>
          </React.Suspense>
      </Router>
      </>
    );
}

export { App };
