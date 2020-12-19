import { all, fork, put, takeLatest, throttle, call } from 'redux-saga/effects'
import {
    UPLOAD_POST_REQUEST,
    UPLOAD_POST_SUCCESS,
    UPLOAD_POST_FAILURE,
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAILURE,
    UNLIKE_POST_REQUEST,
    UNLIKE_POST_SUCCESS,
    UNLIKE_POST_FAILURE,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILURE,
    DELETE_COMMENT_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILURE,
    DELETE_POST_REQUEST,
    LOAD_POSTLIST_SUCCESS,
    LOAD_POSTLIST_FAILURE,
    LOAD_POSTLIST_REQUEST,
    LOAD_SINGLE_POST_SUCCESS,
    LOAD_SINGLE_POST_FAILURE,
    LOAD_SINGLE_POST_REQUEST,
    LOAD_HASHTAG_POSTS_SUCCESS,
    LOAD_HASHTAG_POSTS_FAILURE,
    LOAD_HASHTAG_POSTS_REQUEST,
    EDIT_POST_SUCCESS,
    EDIT_POST_FAILURE,
    EDIT_POST_REQUEST,
} from '../types/post'
import axios from 'axios'

function uploadPostAPI(data) {
    return axios.post('/post', data)
}
function* uploadPost(action) {
    try {
        const result = yield call(uploadPostAPI, action.data)
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

function loadSinglePostAPI(postId) {
    return axios.get(`/post?postId=${postId ? postId : ''}`)
}
function* loadSinglePost(action) {
    try {
        const result = yield call(loadSinglePostAPI, action.data)
        yield put({
            type: LOAD_SINGLE_POST_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.error(err)
        yield put({
            type: LOAD_SINGLE_POST_FAILURE,
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
    // console.log(data)
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

function deleteCommentAPI(data) {
    return axios.delete(`/post/${data.postId}/${data.commentId}`)
}

function* deleteComment(action) {
    try {
        const result = yield call(deleteCommentAPI, action.data)
        yield put({
            type: DELETE_COMMENT_SUCCESS,
            data: result.data,
        })
    } catch (error) {
        console.error(error)
        yield put({
            type: DELETE_COMMENT_FAILURE,
            error: error.response.data,
        })
    }
}

function deletePostAPI(data) {
    //postid
    return axios.delete(`/post/${data}`)
}
function* deletePost(action) {
    try {
        const result = yield call(deletePostAPI, action.data)
        yield put({
            type: DELETE_POST_SUCCESS,
            data: result.data,
        })
    } catch (error) {
        console.error(error)
        yield put({
            type: DELETE_POST_FAILURE,
            error: error.response.data,
        })
    }
}

function loadPostListAPI(data) {
    // categoryId
    return axios.get(`/post/${data}`)
}

function* loadPostList(action) {
    try {
        const result = yield call(loadPostListAPI, action.data)
        yield put({
            type: LOAD_POSTLIST_SUCCESS,
            data: result.data,
        })
    } catch (error) {
        console.error(error)
        yield put({
            type: LOAD_POSTLIST_FAILURE,
            error: error.response.data,
        })
    }
}

function loadHashtagPostsAPI(data, lastId) {
    //주소에 한글이나 특수 문자 들어가면 에러나니까 변환해서 서버로 보내고, 받을 수 있다
    return axios.get(
        `/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`
    )
}

function* loadHashtagPosts(action) {
    try {
        const result = yield call(
            loadHashtagPostsAPI,
            action.data,
            action.lastId
        )
        yield put({
            type: LOAD_HASHTAG_POSTS_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.error(err)
        yield put({
            type: LOAD_HASHTAG_POSTS_FAILURE,
            error: err.response.data,
        })
    }
}

function editPostAPI(data) {
    //주소에 한글이나 특수 문자 들어가면 에러나니까 변환해서 서버로 보내고, 받을 수 있다
    return axios.patch(`post/${data.id}`, data)
}

function* editPost(action) {
    try {
        const result = yield call(editPostAPI, action.data)
        yield put({
            type: EDIT_POST_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.error(err)
        yield put({
            type: EDIT_POST_FAILURE,
            error: err.response.data,
        })
    }
}
/*watch functions */
function* watchUploadPost() {
    yield takeLatest(UPLOAD_POST_REQUEST, uploadPost)
}

function* watchLoadSinglePost() {
    yield takeLatest(LOAD_SINGLE_POST_REQUEST, loadSinglePost)
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

function* watchDeleteComment() {
    yield takeLatest(DELETE_COMMENT_REQUEST, deleteComment)
}

function* watchDeletePost() {
    yield takeLatest(DELETE_POST_REQUEST, deletePost)
}

function* watchLoadPostList() {
    yield takeLatest(LOAD_POSTLIST_REQUEST, loadPostList)
}

function* watchLoadHashtagPosts() {
    yield throttle(5000, LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts)
}

function* watchEditPost() {
    yield takeLatest(EDIT_POST_REQUEST, editPost)
}

export default function* postSaga() {
    yield all([
        fork(watchUploadPost),
        fork(watchLoadSinglePost),
        fork(watchLikePost),
        fork(watchUnlike),
        fork(watchAddComment),
        fork(watchDeleteComment),
        fork(watchDeletePost),
        fork(watchLoadPostList),
        fork(watchLoadHashtagPosts),
        fork(watchEditPost),
    ])
}
