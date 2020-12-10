import { all, fork, put, takeLatest, call } from 'redux-saga/effects'
import {
    UPLOAD_DIARY_REQUEST,
    UPLOAD_DIARY_SUCCESS,
    UPLOAD_DIARY_FAILURE,
    LOAD_DIARIES_REQUEST,
    LOAD_DIARIES_SUCCESS,
    LOAD_DIARIES_FAILURE,
    // LOAD_MAIN_DIARIES_REQUEST,
    // LOAD_MAIN_DIARIES_SUCCESS,
    // LOAD_MAIN_DIARIES_FAILURE,
    LOAD_SINGLE_DIARY_REQUEST,
    LOAD_SINGLE_DIARY_SUCCESS,
    LOAD_SINGLE_DIARY_FAILURE,
} from '../types/diary'
import axios from 'axios'

function uploadDiaryAPI(data) {
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

// function loadMainDiariesAPI() {
//     return axios.get(`/diary/main`)
// }
// function* loadMainDiaries() {
//     try {
//         const result = yield call(loadMainDiariesAPI)
//         yield put({
//             type: LOAD_MAIN_DIARIES_SUCCESS,
//             data: result.data,
//         })
//     } catch (error) {
//         console.error(error)
//         yield put({
//             type: LOAD_MAIN_DIARIES_FAILURE,
//             error: error.response.data,
//         })
//     }
// }

function loadSingleDairyAPI(diaryId) {
    return axios.get(`/diary/${diaryId}`)
}
function* loadSingleDiary(action) {
    try {
        const result = yield call(loadSingleDairyAPI, action.data)
        yield put({
            type: LOAD_SINGLE_DIARY_SUCCESS,
            data: result.data,
        })
    } catch (error) {
        console.error(error)
        yield put({
            type: LOAD_SINGLE_DIARY_FAILURE,
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

// function* watchLoadMainDiaries() {
//     yield takeLatest(LOAD_MAIN_DIARIES_REQUEST, loadMainDiaries)
// }

function* watchLoadSingleDiary() {
    yield takeLatest(LOAD_SINGLE_DIARY_REQUEST, loadSingleDiary)
}
export default function* diarySaga() {
    yield all([
        fork(watchUploadDiary),
        fork(watchLoadDiaries),
        // fork(watchLoadMainDiaries),
        fork(watchLoadSingleDiary),
    ])
}
