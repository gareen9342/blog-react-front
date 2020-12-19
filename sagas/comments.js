// import { all, fork, put, takeLatest, call } from 'redux-saga/effects'
// import {
//     LOAD_MAIN_COMMENTS_REQUEST,
//     LOAD_MAIN_COMMENTS_SUCCESS,
//     LOAD_MAIN_COMMENTS_FAILURE,
// } from '../types/comments'
// import axios from 'axios'

// function loadMainCommentsAPI() {
//     return axios.get(`/post/comments`)
// }
// function* loadMainComments() {
//     try {
//         const result = yield call(loadMainCommentsAPI)
//         yield put({
//             type: LOAD_MAIN_COMMENTS_SUCCESS,
//             data: result.data,
//         })
//     } catch (error) {
//         console.error(error)
//         yield put({
//             type: LOAD_MAIN_COMMENTS_FAILURE,
//             error: error.response.data,
//         })
//     }
// }

// function* watchLoadMainComments() {
//     yield takeLatest(LOAD_MAIN_COMMENTS_REQUEST, loadMainComments)
// }
// export default function* guestbookSaga() {
//     yield all([fork(watchLoadMainComments)])
// }
