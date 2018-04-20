import Store from '../Store'
import { LOAD_INITIAL_USERS, LOAD_WISHES, FINISHED_LOADING_WISHES } from '../Actions/User'
import { LOGIN, LOGOUT, SET_LOGIN } from '../Actions/Auth'

import { Firestore, Firebase } from '../Firebase'

const userCollection = Firestore.collection('users')

export const initFirestoreEventListeners = () => {
    authEventListener()
    userDataListener()
        .then((wishDataListeners))
}

const userDataListener = () => {
    return new Promise((resolve, reject) => {
        userCollection.onSnapshot((usersSnapshot) => {
            const users = {}
            usersSnapshot.forEach((userRef) => {
                const user = userRef.data()
                user.id = userRef.id 
                users[userRef.id] = user
                users[userRef.id].loadingWishes = true
            })
            Store.dispatch({
                type: LOAD_INITIAL_USERS,
                users: users
            })
            resolve(users)
        })
    })

}

const wishDataListeners = (users) => {
    for (const prop in users) {
        const wishCollection = userCollection.doc(prop).collection('wishes')
        wishCollection.onSnapshot((wishSnapshot) => {
            const wishes = []
            wishSnapshot.forEach((wishRef) => {
              const wish = wishRef.data()
              wish.id = wishRef.id
              wishes.push(wish)
            })

            wishes.sort((a, b) => { return (a.index - b.index) })

            Store.dispatch({
                type: LOAD_WISHES,
                wishes: wishes,
                uid: prop
            })
        })
    }
}

const authEventListener = () => {
    Store.dispatch({
        type: SET_LOGIN
    })

    Firebase.auth().onAuthStateChanged(
        (user) => {
            if (user) {
                Store.dispatch({
                    type: LOGIN,
                    uid: user.uid,
                })
             } else {
                Store.dispatch({
                    type: LOGOUT,
                 })
             }
    })

}
