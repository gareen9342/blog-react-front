// import { DRAFT_STATE } from 'immer/dist/internal'
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
} from '../types/user'
import produce from '../util/produce'

const initialState = {
    me: {},
    logInLoading: false,
    logInDone: false,
    logInError: null,
    signUpLoading: false,
    signUpDone: false,
    signUpError: null,
}

// 이전 상태를 액션을 ㄴ통해 다음 상태로 만들어 내는 함수 (불변성은 지키면서)

const reducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case SIGN_UP_REQUEST:
                draft.signUpLoading = true
                draft.signUpDone = false
                draft.signUpError = null
                break
            case SIGN_UP_SUCCESS:
                draft.signUpLoading = false
                draft.signUpDone = true
                break
            case SIGN_UP_FAILURE:
                draft.signUpDone = true
                draft.signUpError = action.error
                break
            case LOGIN_REQUEST: {
                draft.logInLoading = true
                draft.logInError = null
                break
            }
            case LOGIN_SUCCESS: {
                draft.logInLoading = false
                draft.logInDone = true
                draft.me = action.data
                break
            }
            case LOGIN_FAILURE: {
                draft.logInLoading = false
                draft.logInError = action.error
                break
            }
            default:
                break
        }
    })

export default reducer
