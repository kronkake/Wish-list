import { LOAD_INITIAL_USERS, FINISHED_LOADING_WISHES } from '../Actions/User'
import { LOAD_WISHES } from '../Actions/User'

const initialState = { users: [], loadingUsers: true, loadingWishes: true }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_INITIAL_USERS:
            return { 
                users: action.users, 
                loadingUsers: false, 
                loadingWishes: true
            }
        case LOAD_WISHES:
            const users = [...state.users]
            const userIndex = users.findIndex(user => user.id === action.uid)
            if (userIndex) {
                users[userIndex].wishes = action.wishes
            }
            return {
                users,
                loadingUsers: false, 
                loadingWishes: true
            } 
        case FINISHED_LOADING_WISHES:
            return {
                ...state.users,
                loadingUsers: false,
                loadingWishes: false
            }
        default:
            return state
    }
}

export default reducer
