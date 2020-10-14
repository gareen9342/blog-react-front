// import { DRAFT_STATE } from 'immer/dist/internal'
import {
    UPLOAD_DIARY_FAILURE,
    UPLOAD_DIARY_REQUEST,
    UPLOAD_DIARY_SUCCESS,
    LOAD_DIARIES_REQUEST,
    LOAD_DIARIES_SUCCESS,
    LOAD_DIARIES_FAILURE,
} from '../types/diary'
import produce from '../util/produce'

const initialState = {
    loadDiariesLoading: false,
    loadDiariesDone: false,
    loadDiariesError: null,
    uploadDiaryLoading: false,
    uploadDiaryDone: false,
    uploadDiaryError: null,
    hasMorePosts: false,
    diaryList: [],
}

// 이전 상태를 액션을 ㄴ통해 다음 상태로 만들어 내는 함수 (불변성은 지키면서)

const reducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case UPLOAD_DIARY_REQUEST:
                draft.uploadDiaryLoading = true
                draft.uploadDiaryError = null
                draft.uploadDiaryDone = false
                break
            case UPLOAD_DIARY_SUCCESS:
                draft.uploadDiaryLoading = false
                draft.uploadDiaryDone = true
                draft.diaryList = [...draft.diaryList, action.data]
                break
            case UPLOAD_DIARY_FAILURE:
                draft.uploadDiaryLoading = false
                draft.uploadDiaryError = action.error
                break
            case LOAD_DIARIES_REQUEST:
                draft.loadDiariesLoading = true
                draft.loadDiariesError = null
                draft.loadDiariesDone = false
                break
            case LOAD_DIARIES_SUCCESS:
                draft.loadDiariesLoading = false
                draft.loadDiariesDone = true
                draft.diaryList = [...draft.diaryList, ...action.data]
                draft.hasMorePosts = action.data.length >= 9
                break
            case LOAD_DIARIES_FAILURE:
                draft.loadDiariesLoading = false
                draft.loadDiariesError = action.error
                break
            default:
                break
        }
    })

export default reducer
