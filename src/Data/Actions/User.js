export const LOAD_INITIAL_USERS = 'LOAD INITIAL USERS'

export const loadUsers = (user) => ({
    type: LOAD_INITIAL_USERS,
    data: user
})

export const LOAD_WISHES = 'LOAD WISHES'

export const loadWishes = (wishes, uid) => ({
    type: LOAD_WISHES,
    data: wishes,
    userId: uid
})