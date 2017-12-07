import { LOGIN, LOGOUT, SET_LOGIN } from '../Actions/Auth'

const initialState = { loggedIn: false, finishedAuth: false }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN:
            return { 
                loggedIn: false, 
                uid: action.uid, 
                finishedAuth: false,
                promise: action.promise
            }
        case LOGIN:
            return { 
                loggedIn: true, 
                uid: action.uid, 
                finishedAuth: true,
                promise: action.promise
            }
        case LOGOUT:
            return { 
                loggedIn: false, 
                finishedAuth: true,
                promise: action.promise
            }
        default:
            return state
    }
}

export default reducer
