import produce from '../util/produce'

const initialState = {
    isLoggedIn: false,
}

// 이전 상태를 액션을 ㄴ통해 다음 상태로 만들어 내는 함수 (불변성은 지키면서)
const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            default:
                return state
        }
    })
}

export default reducer
