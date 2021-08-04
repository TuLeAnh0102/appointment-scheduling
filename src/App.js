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
const PageCauHinhHeThong = async(() => import('./views/Pages/CauHinhHeThong/cauhinhhethong'));

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
              <PrivateRoute exact path="/" name="Home" component={HomePage} />
              <PrivateRoute exact path="/cau-hinh-he-thong" name="Home" component={HomePage} />
              <Route exact path="/login" name="Login Page"  component={LoginPage} />
              <Route exact path="/404" name="Page 404"  component={Page404}  />
              <Route exact path="/500" name="Page 500"  component={Page500}  />
            </Switch>
          </React.Suspense>
      </Router>
      </>
    );
}

export { App };
