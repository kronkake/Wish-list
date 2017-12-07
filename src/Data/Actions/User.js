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

export const FINISHED_LOADING_WISHES = 'FINISHED LOADING WISHES'

export const setWishes = () => ({
    type: LOAD_WISHES
})