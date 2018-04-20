import React, { Component } from 'react'
import { Firestore, FirebaseUserCreation } from '../../../../Data/Firebase'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { LinearProgress } from 'material-ui/Progress'

import UserForm from './UserForm'
import UserCard from './UserCard'

class ManageUsers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],
            loading: true,
            loggedIn: true
        }

        this.addUser = this.addUser.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
        this.getSnapShot = this.getSnapShot.bind(this)

        this.userCollection = Firestore.collection('users')
    }
    componentDidMount() {
        this.getSnapShot()
    }
    getSnapShot(callback = false) {
        this.userCollection.get().then(usersRef => {
            const users = []
            usersRef.forEach(userRef => {
                const user = userRef.data()
                user.id = userRef.id
                users.push(user)
            })
            this.setState({ users: users, loading: false })
            if (callback) {
                callback()
            }
        })
    }
    addUser(user, callback) {
        this.setState({ loading: true })
        FirebaseUserCreation.auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(firebaseUser => {
                FirebaseUserCreation.auth().signOut()
                this.userCollection
                    .doc(firebaseUser.uid)
                    .set({
                        name: user.name,
                        nickname: user.nickname,
                        profilePicUrl: user.profilePicUrl,
                        wishes: []
                    })
                    .then(() => this.getSnapShot(callback))
                    .catch(error => console.error(error))
            })
    }
    deleteUser(id) {
        this.userCollection
            .doc(id)
            .delete()
            .then(() => console.log('User is deleted'))
            .catch(error => console.log(error))
    }
    render() {
        const { loggedIn, finishedAuth } = this.props.Auth
        if (!loggedIn && finishedAuth) {
            return <Redirect to="/" />
        }
        return (
            <div>
                <h2>Here you can manage your users</h2>
                <UserForm AddUser={this.addUser} />
                <h2>Existing Users</h2>
                {this.state.loading ? <LinearProgress /> : null}
                {this.state.users.map((user, i) => {
                    return (
                        <UserCard
                            key={i}
                            nickname={user.nickname}
                            name={user.name}
                            profilePicUrl={user.profilePicUrl}
                            id={user.id}
                            deleteUser={this.deleteUser}
                        />
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        Auth: state.auth
    }
}

export default connect(mapStateToProps)(ManageUsers)
