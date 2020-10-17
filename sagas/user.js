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
    LOGIN_FAILURE,
    LOAD_ME_REQUEST,
    LOAD_ME_SUCCESS,
    LOAD_ME_FAILURE,
    LOG_OUT_FAILURE,
    LOG_OUT_SUCCESS,
    LOG_OUT_REQUEST,
} from '../types/user'
import axios from 'axios'

function logInAPI(data) {
    return axios.post('/user/login', data)
}
function* logUserIn(action) {
    try {
        const result = yield call(logInAPI, action.data)
        // console.log(result)
        yield put({
            type: LOGIN_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.error(err)
        yield put({
            type: LOGIN_FAILURE,
            error: err.response.data,
        })
    }
}
function signUpAPI(data) {
    // console.log(data)
    return axios.post('/user/signup', data)
}
function* signUp(action) {
    try {
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

function loadMeAPI() {
    return axios.get('/user')
}
//페이지진입시 사용자 정도 가져오기
function* loadMe() {
    try {
        const result = yield call(loadMeAPI)
        // console.log('result=', result)
        yield put({
            type: LOAD_ME_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.error(err)
        yield put({
            type: LOAD_ME_FAILURE,
            error: err.response.data,
        })
    }
}

//로그아웃
function logOutAPI() {
    return axios.get('/user/logout')
}
function* logOut() {
    try {
        yield call(logOutAPI)
        yield put({
            type: LOG_OUT_SUCCESS,
        })
    } catch (err) {
        console.error(err)
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data,
        })
    }
}
/*

    watch functions

*/
function* watchUserLogin() {
    yield takeLatest(LOGIN_REQUEST, logUserIn)
}
function* watchUserSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp)
}
function* watchUserLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut)
}
function* watchLoadMe() {
    yield takeLatest(LOAD_ME_REQUEST, loadMe)
}
export default function* userSaga() {
    yield all([
        fork(watchUserLogin),
        fork(watchUserSignUp),
        fork(watchLoadMe),
        fork(watchUserLogOut),
    ])
}
