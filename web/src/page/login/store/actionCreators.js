import * as actionTypes from './actionTypes';

const changeLogin1 = (data) => ({
    type: actionTypes.UPDOWN_STATUS,
    data: data
});

export const changeLogin = (data) => {
    return (dispatch) => {
        dispatch(changeLogin1(data));
    }
};
