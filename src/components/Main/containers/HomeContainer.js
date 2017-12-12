import { connect } from 'react-redux'
import Home from '.././Home'

const convertToArray = (userData) => {
    let users = []
    , loading = true

    for (const userIdProp in userData.users) {
        users.push(userData.users[userIdProp])
    }

    return {
        users,
        loading: userData.loadingUsers,
    }
}

const mapStateToProps = state => {
  return {
    User: convertToArray(state.user)
  }
}

const HomeContainer = connect(
  mapStateToProps
)(Home)

export default HomeContainer