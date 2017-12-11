import { connect } from 'react-redux'
import ManageWishes from '.././ManageWishes'

const getActiveUser = (userData, auth) => {
    if (!auth) { return }

    let user = userData.users
        .filter(user => user.id === auth.uid)

    let wishes = []
    , loading = true
    if (!user) { user = {} }

    if (user.length > 0) {
        wishes = user[0].wishes
        loading = user[0].loadingWishes
        user = user[0]
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

const ActiveUser = connect(
  mapStateToProps
)(ManageWishes)

export default ActiveUser