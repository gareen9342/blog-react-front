// import { DRAFT_STATE } from 'immer/dist/internal'
import {
    SEARCH_POST_REQUEST,
    SEARCH_POST_SUCCESS,
    SEARCH_POST_FAILURE,
} from '../types/search'
import produce from '../util/produce'

const initialState = {
    searchResultPosts: [],
    searchResultHashtags: [],
    searchLoading: false,
    searchDone: false,
    searchError: null,
}

// 이전 상태를 액션을 ㄴ통해 다음 상태로 만들어 내는 함수 (불변성은 지키면서)

const reducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case SEARCH_POST_REQUEST:
                draft.searchLoading = true
                draft.searchDone = false
                draft.searchError = null
                break
            case SEARCH_POST_SUCCESS:
                draft.searchLoading = false
                draft.searchDone = true
                draft.searchResultPosts = action.data.posts
                draft.searchResultHashtags = action.data.hashtags
                break
            case SEARCH_POST_FAILURE:
                draft.searchDone = true
                draft.searchError = action.error
                break

            default:
                break
        }
    })

export default reducer
