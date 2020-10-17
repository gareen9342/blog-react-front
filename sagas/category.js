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
    ADD_CATEGORY_FAILURE,
    ADD_CATEGORY_REQUEST,
    ADD_CATEGORY_SUCCESS,
} from '../types/post'
import axios from 'axios'

function addCategoryAPI(data) {
    // console.log(data)
    return axios.post('/category', data)
}
function* addCategory(action) {
    try {
        const result = yield call(addCategoryAPI, action.data)
        yield put({
            type: ADD_CATEGORY_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.error(err)
        yield put({
            type: ADD_CATEGORY_FAILURE,
            err: err.response.data,
        })
    }
}

function* watchAddCategory() {
    yield takeLatest(ADD_CATEGORY_REQUEST, addCategory)
}

export default function* postSaga() {
    yield all([fork(watchAddCategory)])
}
