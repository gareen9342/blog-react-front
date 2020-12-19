import { combineReducers } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import user from './user'
import post from './post'
import diary from './diary'
import search from './search'
import guestbook from './guestbook'
const rootReducer = (state, action) => {
    switch (action.type) {
        // 루트 리듀서의 상태를 전체를 덮어씌울 수 있다.
        case HYDRATE:
            return action.payload
        default: {
            const combinedReducer = combineReducers({
                user,
                post,
                diary,
                search,
                guestbook,
            })
            return combinedReducer(state, action)
        }
    }
}

export default rootReducer
