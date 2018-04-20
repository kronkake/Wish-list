import {
    LOAD_INITIAL_USERS,
    FINISHED_LOADING_WISHES,
    LOAD_WISHES
} from '../Actions/User'

const initialState = { users: {}, loadingUsers: true }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_INITIAL_USERS:
            return {
                users: action.users,
                loadingUsers: false
            }
        case LOAD_WISHES:
            const users = Object.assign({}, state.users)
            if (users.hasOwnProperty(action.uid)) {
                users[action.uid].wishes = action.wishes
                users[action.uid].loadingWishes = false
            }
            return {
                users,
                loadingUsers: false
            }
        default:
            return state
    }
}

export default reducer
