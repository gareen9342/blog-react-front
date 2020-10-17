import { all, fork, put, takeLatest, call } from 'redux-saga/effects'
import {
    SEARCH_POST_REQUEST,
    SEARCH_POST_SUCCESS,
    SEARCH_POST_FAILURE,
} from '../types/search'
import axios from 'axios'

function searchPostAPI(data) {
    return axios.get(`/post/search/${encodeURIComponent(data)}`)
}
function* searchPost(action) {
    try {
        const result = yield call(searchPostAPI, action.data)
        console.log(result)
        yield put({
            type: SEARCH_POST_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.error(err)
        yield put({
            type: SEARCH_POST_FAILURE,
            error: err.response.data,
        })
    }
}

/*watch functions */
function* watchSearchPost() {
    yield takeLatest(SEARCH_POST_REQUEST, searchPost)
}

export default function* postSaga() {
    yield all([fork(watchSearchPost)])
}
