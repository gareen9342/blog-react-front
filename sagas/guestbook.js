import { all, fork, put, takeLatest, call } from 'redux-saga/effects'
import axios from 'axios'
import {
    LOAD_GUESTBOOKS_REQUEST,
    LOAD_GUESTBOOKS_SUCCESS,
    LOAD_GUESTBOOKS_FAILURE,
    POST_GUESTBOOK_FAILURE,
    POST_GUESTBOOK_REQUEST,
    POST_GUESTBOOK_SUCCESS,
    EDIT_GUESTBOOK_REQUEST,
    EDIT_GUESTBOOK_SUCCESS,
    EDIT_GUESTBOOK_FAILURE,
    DELETE_GUESTBOOK_REQUEST,
    DELETE_GUESTBOOK_SUCCESS,
    DELETE_GUESTBOOK_FAILURE,
} from '../types/guestbook'

function loadGuestbooksAPI(pageNum) {
    return axios.get(`/guestbook?page=${pageNum ? pageNum : 1}`)
}

function* loadGuestbooks(action) {
    try {
        const result = yield call(loadGuestbooksAPI, action.pageNum)
        yield put({
            type: LOAD_GUESTBOOKS_SUCCESS,
            data: result.data,
        })
    } catch (error) {
        console.error(error)
        yield put({
            type: LOAD_GUESTBOOKS_FAILURE,
            error: error.response.data,
        })
    }
}

function postGuestbookAPI(data) {
    return axios.post(`/guestbook`, data)
}

function* postGuestbook(action) {
    try {
        const result = yield call(postGuestbookAPI, action.data)
        yield put({
            type: POST_GUESTBOOK_SUCCESS,
            data: result.data,
        })
    } catch (error) {
        console.error(error)
        yield put({
            type: POST_GUESTBOOK_FAILURE,
            error: error.response.data,
        })
    }
}

//
function editGuestbookAPI(data) {
    return axios.patch(`/guestbook`, data)
}

function* editGuestbook(action) {
    try {
        const result = yield call(editGuestbookAPI, action.data)
        yield put({
            type: EDIT_GUESTBOOK_SUCCESS,
            data: result.data,
        })
    } catch (error) {
        console.error(error)
        yield put({
            type: EDIT_GUESTBOOK_FAILURE,
            error: error.response.data,
        })
    }
}
//

function deleteGuestbookAPI(data) {
    return axios.post(`/guestbook/delete`, data)
}

function* deleteGuestbook(action) {
    try {
        const result = yield call(deleteGuestbookAPI, action.data)
        yield put({
            type: DELETE_GUESTBOOK_SUCCESS,
            data: result.data,
        })
    } catch (error) {
        console.error(error)
        yield put({
            type: DELETE_GUESTBOOK_FAILURE,
            error: error.response.data,
        })
    }
}
//

function* watchLoadGuestbooks() {
    yield takeLatest(LOAD_GUESTBOOKS_REQUEST, loadGuestbooks)
}

function* watchPostGuestbook() {
    yield takeLatest(POST_GUESTBOOK_REQUEST, postGuestbook)
}

function* watchEditGuestbook() {
    yield takeLatest(EDIT_GUESTBOOK_REQUEST, editGuestbook)
}

function* watchDeleteGuestbook() {
    yield takeLatest(DELETE_GUESTBOOK_REQUEST, deleteGuestbook)
}

export default function* guestbookSaga() {
    yield all([
        fork(watchLoadGuestbooks),
        fork(watchPostGuestbook),
        fork(watchEditGuestbook),
        fork(watchDeleteGuestbook),
    ])
}
