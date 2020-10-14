import { combineReducers } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import user from './user'
import post from './post'
import diary from './diary'
const rootReducer = (state, action) => {
    switch (action.type) {
        // 루트 리듀서의 상태를 전체를 덮어씌울 수 있다.
        case HYDRATE:
            // console.log('HYDRATE', action)
            return action.payload
        default: {
            const combinedReducer = combineReducers({
                user,
                post,
                diary,
            })
            return combinedReducer(state, action)
        }
    }
}

export default rootReducer
