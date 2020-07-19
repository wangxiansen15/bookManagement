import { combineReducers } from "redux-immutable";
import { reducer as Login } from '../page/login/store/index.js';

const reducer = combineReducers({
    login: Login,
});

export default reducer;