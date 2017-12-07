import Store from '../Store'
import { LOAD_INITIAL_USERS, LOAD_WISHES, FINISHED_LOADING_WISHES } from '../Actions/User'
import { LOGIN, LOGOUT, SET_LOGIN } from '../Actions/Auth'

import { Firestore, Firebase } from '../Firebase'

const userCollection = Firestore.collection('users')

export const initFirestoreEventListeners = () => {
    authEventListener()
    userDataListener()
        .then((wishDataListeners))
        .then((Store.dispatch({type: FINISHED_LOADING_WISHES})))
}

const userDataListener = () => {
    return new Promise((resolve, reject) => {
        userCollection.onSnapshot((usersSnapshot) => {
            const users = []
            usersSnapshot.forEach((userRef) => {
                const user = userRef.data()
                user.id = userRef.id 
                users.push(user)
            })
            resolve(users)
            Store.dispatch({
                type: LOAD_INITIAL_USERS,
                users: users
            })
        })
    })

}

const wishDataListeners = (users) => {
    if (users.length === 0) { return }

    users.forEach((user) => {
        const wishCollection = userCollection.doc(user.id).collection('wishes')
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
                uid: user.id
            })
        })
    })
}

const authEventListener = () => {
    const promise = onAuthChange()

    Store.dispatch({
        type: SET_LOGIN,
        promise: promise
    })

    promise.then((user) => {
        if (user) {
            Store.dispatch({
                  type: LOGIN,
                  uid: user.uid,
                 promise: promise
            })
         } else {
              Store.dispatch({
                type: LOGOUT,
                promise: promise
             })
         }
     })
}

const onAuthChange = () => {
    //We need to generate a promise for this shizz
    return new Promise((resolve, reject) => {
        Firebase.auth().onAuthStateChanged(
            (user) => {
                resolve(user)
        })
    })

}
