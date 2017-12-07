import { combineReducers } from 'redux'
import user from './User'
import auth from './Auth'

export default combineReducers({
    user,
    auth
});