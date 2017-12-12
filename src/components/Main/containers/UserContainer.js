import { connect } from 'react-redux'
import User from '.././User'

const getSelectedUserData = (userData, ownProps) => {
    const uid = ownProps.match.params.id

    let user = {}
    , wishes = []
    , loading = true

    if (userData.users.hasOwnProperty(uid)) {
        user = userData.users[uid]
        wishes = user.wishes
        loading = user.loadingUsers
    }

    return {
        user,
        loading: loading,
        wishes: wishes
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userData: getSelectedUserData(state.user, ownProps)
  }
}

const UserContainer = connect(
  mapStateToProps
)(User)

export default UserContainer