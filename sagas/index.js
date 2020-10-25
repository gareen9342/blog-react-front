import { all, fork } from 'redux-saga/effects'
import axios from 'axios'
import userSaga from './user'
import postSaga from './post'
import categorySaga from './category'
import diarySaga from './diary'
import searchSaga from './search'

axios.defaults.baseURL =
    process.env.NODE_ENV === 'production'
        ? process.env.BACKURL
        : 'http://localhost:80'
axios.defaults.withCredentials = true

export default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(postSaga),
        fork(categorySaga),
        fork(diarySaga),
        fork(searchSaga),
    ])
}
