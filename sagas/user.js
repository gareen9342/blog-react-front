import {
    all,
    fork,
    put,
    delay,
    takeLatest,
    throttle,
    call,
} from 'redux-saga/effects'
import {
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOG_OUT_FAILURE,
} from '../types/user'
import axios from 'axios'

function logInAPI(body) {
    return axios.post('/user/login')
}
function* logUserIn() {
    try {
        yield delay(1000)
        yield put({
            type: LOGIN_SUCCESS,
        })
    } catch (err) {
        console.error(err)
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data,
        })
    }
}
function signUpAPI(data) {
    console.log(data)
    return axios.post('/user/signup', data)
}
function* signUp(action) {
    try {
        console.log(action)
        yield call(signUpAPI, action.data)
        yield put({
            type: SIGN_UP_SUCCESS,
        })
    } catch (err) {
        console.error(err)
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data,
        })
    }
}
function* watchUserLogin() {
    yield takeLatest(LOGIN_REQUEST, logUserIn)
}
function* watchUserSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp)
}
export default function* userSaga() {
    yield all([fork(watchUserLogin), fork(watchUserSignUp)])
}
