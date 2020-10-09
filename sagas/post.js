import { all, fork, put, takeLatest, call } from 'redux-saga/effects'
import {
    UPLOAD_POST_REQUEST,
    UPLOAD_POST_SUCCESS,
    UPLOAD_POST_FAILURE,
    LOAD_MAINPOST_REQUEST,
    LOAD_MAINPOST_SUCCESS,
    LOAD_MAINPOST_FAILURE,
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAILURE,
    UNLIKE_POST_REQUEST,
    UNLIKE_POST_SUCCESS,
    UNLIKE_POST_FAILURE,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST,
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

function likePostAPI(postId) {
    return axios.patch(`/post/${postId}/like`)
}
function* likePost(action) {
    try {
        const result = yield call(likePostAPI, action.data)
        yield put({
            type: LIKE_POST_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.error(err)
        yield put({
            type: LIKE_POST_FAILURE,
            error: err.response.data,
        })
    }
}

function unlikePostAPI(postId) {
    return axios.delete(`/post/${postId}/like`)
}

function* unlikePost(action) {
    try {
        const result = yield call(unlikePostAPI, action.data)
        yield put({
            type: UNLIKE_POST_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.error(err)
        yield put({
            type: UNLIKE_POST_FAILURE,
            error: err.response.data,
        })
    }
}

function addCommentAPI(data) {
    console.log(data)
    return axios.post(`/post/${data.postId}/comment`, {
        content: data.content,
    })
}

function* addComment(action) {
    try {
        const result = yield call(addCommentAPI, action.data)
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.error(err)
        yield put({
            type: ADD_COMMENT_FAILURE,
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

function* watchLikePost() {
    yield takeLatest(LIKE_POST_REQUEST, likePost)
}

function* watchUnlike() {
    yield takeLatest(UNLIKE_POST_REQUEST, unlikePost)
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

export default function* postSaga() {
    yield all([
        fork(watchUploadPost),
        fork(watchloadMainPost),
        fork(watchLikePost),
        fork(watchUnlike),
        fork(watchAddComment),
    ])
}
