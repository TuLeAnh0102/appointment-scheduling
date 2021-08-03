import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { common } from "./common.reducer.js";
import { setinfohuman} from './infohuman.reducer';
import { category } from "./";

const rootReducer = combineReducers({
    authentication,
    users,
    alert,
    common,
    setinfohuman,

});

export default rootReducer;
