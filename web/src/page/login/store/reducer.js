import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
    Login: false
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.UPDOWN_STATUS:
            return state.set('Login', action.data);
        default:
            return state;
    }
};