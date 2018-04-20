import { connect } from 'react-redux'
import ManageWishes from './ManageWishes'

const getActiveUser = (userData, auth) => {
    if (!auth) {
        return
    }

    let user = {},
        wishes = [],
        loading = true

    if (userData.users.hasOwnProperty([auth.uid])) {
        let user = userData.users[auth.uid]
        wishes = user.wishes
        loading = user.loadingWishes
    }

    return {
        user,
        loading: loading,
        wishes: wishes
    }
}

const mapStateToProps = state => {
    return {
        User: getActiveUser(state.user, state.auth),
        Auth: state.auth
    }
}

const ManageWishesContainer = connect(mapStateToProps)(ManageWishes)

export default ManageWishesContainer
