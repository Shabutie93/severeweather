import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchReports = () => dispatch => {
    dispatch(reportsLoading());

    return fetch(baseUrl + 'reports')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(reports => dispatch(addReports(reports)))
        .catch(error => dispatch(reportsFailed(error.message)));
};

export const addReports = reports => ({
    type: ActionTypes.ADD_REPORTS,
    payload: reports
});

export const reportsLoading = () => ({
    type: ActionTypes.REPORTS_LOADING
});

export const reportsFailed = errMess => ({
    type: ActionTypes.REPORTS_FAILED,
    payload: errMess
});

export const postFeedback = feedback => () => {
    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(feedback),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error; }             
    )
    .then(response => response.json())
    .then(response => {
        console.log('Feedback:', response);
        alert('Thank you for your feedback!\n' + JSON.stringify(response));
    })
    .catch(error => {
        console.log('Feedback:', error.message);
        alert('Your feedback could not be posted\nError: ' + error.message);
    });
};