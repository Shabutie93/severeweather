import * as ActionTypes from './ActionTypes';

export const Reports = (state = {
    isLoading: true,
    errMess: null,
    reports: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_REPORTS:
            return { ...state, isLoading: false, errMess: null, reports: action.payload };

        case ActionTypes.REPORTS_LOADING:
            return { ...state, isLoading: true, errMess: null, reports: [] }

        case ActionTypes.REPORTS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };

        default:
            return state;
    }
};