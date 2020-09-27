import {
    all,
    fork,
    put,
    delay,
    takeLatest,
    throttle,
    call,
} from 'redux-saga/effects'
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOG_OUT_FAILURE } from '../types/user'

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

function* watchUserLogin() {
    yield takeLatest(LOGIN_REQUEST, logUserIn)
}

export default function* userSaga() {
    yield all([fork(watchUserLogin)])
}
