import { all, fork, put, takeLatest, call } from 'redux-saga/effects'
import {
    UPLOAD_DIARY_REQUEST,
    UPLOAD_DIARY_SUCCESS,
    UPLOAD_DIARY_FAILURE,
    LOAD_DIARIES_REQUEST,
    LOAD_DIARIES_SUCCESS,
    LOAD_DIARIES_FAILURE,
} from '../types/diary'
import axios from 'axios'

function uploadDiaryAPI(data) {
    console.log(data)
    return axios.post('/diary', data)
}
function* uploadDiary(action) {
    try {
        const result = yield call(uploadDiaryAPI, action.data)
        yield put({
            type: UPLOAD_DIARY_SUCCESS,
            data: result.data,
        })
    } catch (error) {
        console.error(error)
        yield put({
            type: UPLOAD_DIARY_FAILURE,
            error: error.response.data,
        })
    }
}

function loadDiariesAPI(lastId) {
    return axios.get(`/diary?lastId=${lastId || 0}`)
}
function* loadDiaries(action) {
    try {
        const result = yield call(loadDiariesAPI, action.lastId)
        yield put({
            type: LOAD_DIARIES_SUCCESS,
            data: result.data,
        })
    } catch (error) {
        console.error(error)
        yield put({
            type: LOAD_DIARIES_FAILURE,
            error: error.response.data,
        })
    }
}
function* watchUploadDiary() {
    yield takeLatest(UPLOAD_DIARY_REQUEST, uploadDiary)
}

function* watchLoadDiaries() {
    yield takeLatest(LOAD_DIARIES_REQUEST, loadDiaries)
}

export default function* diarySaga() {
    yield all([fork(watchUploadDiary), fork(watchLoadDiaries)])
}
