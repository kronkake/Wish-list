import { LOAD_INITIAL_USERS } from '../Actions/User'
import { LOAD_WISHES } from '../Actions/User'

const initialState = { users: [], loadingUsers: true }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_INITIAL_USERS:
            return { 
                users: action.users, 
                loadingUsers: false
            }
        case LOAD_WISHES:
            const users = [...state.users]
            const userIndex = users.findIndex(user => user.id === action.uid)
            if (userIndex) {
                users[userIndex].wishes = action.wishes
                users[userIndex].loadingWishes = false
            }
            return {
                users,
                loadingUsers: false,
            } 
        default:
            return state
    }
}

export default reducer
