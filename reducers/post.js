// import { DRAFT_STATE } from 'immer/dist/internal'
import {
    UPLOAD_POST_REQUEST,
    UPLOAD_POST_SUCCESS,
    UPLOAD_POST_FAILURE,
    ADD_CATEGORY_REQUEST,
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_FAILURE,
    LOAD_MAINPOST_REQUEST,
    LOAD_MAINPOST_SUCCESS,
    LOAD_MAINPOST_FAILURE,
} from '../types/post'
import produce from '../util/produce'

const initialState = {
    uploadPostLoading: false,
    uploadPostDone: false,
    uploadPostError: null,
    addCategoryLoading: false,
    addCategoryDone: false,
    addCategoryError: null,
    loadMainPostLoading: false,
    loadMainPostDone: false,
    loadMainPostError: null,
    mainPost: {},
}

// 이전 상태를 액션을 ㄴ통해 다음 상태로 만들어 내는 함수 (불변성은 지키면서)

const reducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case UPLOAD_POST_REQUEST:
                draft.uploadPostLoading = true
                draft.uploadPostDone = false
                draft.uploadPostError = null
                break
            case UPLOAD_POST_SUCCESS:
                draft.uploadPostLoading = false
                draft.uploadPostDone = true
                break
            case UPLOAD_POST_FAILURE:
                draft.uploadPostDone = true
                draft.uploadPostError = action.error
                break
            case ADD_CATEGORY_REQUEST:
                draft.addCategoryLoading = true
                draft.addCategoryDone = false
                draft.addCategoryError = null
                break
            case ADD_CATEGORY_SUCCESS:
                draft.addCategoryLoading = false
                draft.addCategoryDone = true
                break
            case ADD_CATEGORY_FAILURE:
                draft.addCategoryDone = true
                draft.addCategoryError = action.error
                break
            case LOAD_MAINPOST_REQUEST:
                draft.loadMainPostLoading = true
                draft.loadMainPostDone = false
                draft.loadMainPostError = null
                break
            case LOAD_MAINPOST_SUCCESS:
                draft.loadMainPostLoading = false
                draft.loadMainPostDone = true
                draft.mainPost = action.data
                break
            case LOAD_MAINPOST_FAILURE:
                draft.loadMainPostDone = true
                draft.loadMainPostError = action.error
                break
            default:
                break
        }
    })

export default reducer
