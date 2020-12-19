// import { DRAFT_STATE } from 'immer/dist/internal'
import {
    LOAD_GUESTBOOKS_REQUEST,
    LOAD_GUESTBOOKS_SUCCESS,
    LOAD_GUESTBOOKS_FAILURE,
    POST_GUESTBOOK_REQUEST,
    POST_GUESTBOOK_SUCCESS,
    POST_GUESTBOOK_FAILURE,
    EDIT_GUESTBOOK_REQUEST,
    EDIT_GUESTBOOK_SUCCESS,
    EDIT_GUESTBOOK_FAILURE,
    DELETE_GUESTBOOK_REQUEST,
    DELETE_GUESTBOOK_SUCCESS,
    DELETE_GUESTBOOK_FAILURE,
} from '../types/guestbook'
import produce from '../util/produce'

const initialState = {
    loadGuestbooksLoading: false,
    loadGuestbooksDone: false,
    loadGuestbooksError: null,
    postGuestbookLoading: false,
    postGuestbookDone: false,
    postGuestbookError: null,
    editGuestbookLoading: false,
    editGuestbookDone: false,
    editGuestbookError: null,
    deleteGuestbookLoading: false,
    deleteGuestbookDone: false,
    deleteGuestbookError: null,
    guestbooksList: [],
}

const reducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case LOAD_GUESTBOOKS_REQUEST:
                draft.loadGuestbooksLoading = true
                draft.loadGuestbooksDone = false
                draft.loadGuestbooksError = null
                break
            case LOAD_GUESTBOOKS_SUCCESS: {
                draft.guestbooksList = action.data
                draft.loadGuestbooksLoading = false
                draft.loadGuestbooksDone = true
                break
            }
            case LOAD_GUESTBOOKS_FAILURE:
                draft.loadGuestbooksDone = true
                draft.loadGuestbooksError = action.error
                break
            case POST_GUESTBOOK_REQUEST:
                draft.postGuestbookLoading = true
                draft.postGuestbookDone = false
                draft.postGuestbookError = null
                break
            case POST_GUESTBOOK_SUCCESS: {
                draft.guestbooksList.unshift(action.data)
                draft.postGuestbookLoading = false
                draft.postGuestbookDone = true
                break
            }
            case POST_GUESTBOOK_FAILURE:
                draft.postGuestbookDone = true
                draft.postGuestbookError = action.error
                break
            case EDIT_GUESTBOOK_REQUEST:
                draft.editGuestbookLoading = true
                draft.editGuestbookDone = false
                draft.editGuestbookError = null
                break
            case EDIT_GUESTBOOK_SUCCESS: {
                const idx = draft.guestbooksList.findIndex(
                    (x) => x.id === +action.data.id
                )
                draft.guestbooksList[idx].content = action.data.content
                draft.editGuestbookLoading = false
                draft.editGuestbookDone = true
                break
            }
            case EDIT_GUESTBOOK_FAILURE:
                draft.editGuestbookDone = true
                draft.editGuestbookError = action.error
                break
            case DELETE_GUESTBOOK_REQUEST:
                draft.deleteGuestbookLoading = true
                draft.deleteGuestbookDone = false
                draft.deleteGuestbookError = null
                break
            case DELETE_GUESTBOOK_SUCCESS: {
                draft.guestbooksList = draft.guestbooksList.filter(
                    (x) => x.id !== +action.data.id
                )
                draft.editGuestbookLoading = false
                draft.editGuestbookDone = true
                break
            }
            case DELETE_GUESTBOOK_FAILURE:
                draft.deleteGuestbookDone = true
                draft.deleteGuestbookError = action.error
                break
            default:
                break
        }
    })

export default reducer
