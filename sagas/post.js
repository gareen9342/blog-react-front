import { all, fork, put, takeLatest, call } from 'redux-saga/effects'
import {
    UPLOAD_POST_REQUEST,
    UPLOAD_POST_SUCCESS,
    UPLOAD_POST_FAILURE,
    LOAD_MAINPOST_REQUEST,
    LOAD_MAINPOST_SUCCESS,
    LOAD_MAINPOST_FAILURE,
} from '../types/post'
import axios from 'axios'

function uploadPostAPI(data) {
    return axios.post('/post', data)
}
function* uploadPost(action) {
    try {
        const result = yield call(uploadPostAPI, action.data)
        console.log(result)
        yield put({
            type: UPLOAD_POST_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.error(err)
        yield put({
            type: UPLOAD_POST_FAILURE,
            error: err.response.data,
        })
    }
}

function loadMainPostAPI() {
    return axios.get('/post')
}
function* loadMainPost(action) {
    try {
        const result = yield call(loadMainPostAPI)
        console.log(result)
        yield put({
            type: LOAD_MAINPOST_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.error(err)
        yield put({
            type: LOAD_MAINPOST_FAILURE,
            error: err.response.data,
        })
    }
}
function* watchUploadPost() {
    yield takeLatest(UPLOAD_POST_REQUEST, uploadPost)
}

function* watchloadMainPost() {
    yield takeLatest(LOAD_MAINPOST_REQUEST, loadMainPost)
}

export default function* postSaga() {
    yield all([fork(watchUploadPost), fork(watchloadMainPost)])
}
