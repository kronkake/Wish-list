import React, { Component } from 'react'

import './User.css'

import { LinearProgress } from 'material-ui/Progress'

import UserCard from './UserCard'

class User extends Component {
    constructor(props) {
        super(props)

        this.state ={
            loading: true,
            user: {},
            popIn: ''
        }

        this.applyTransition = this.applyTransition.bind(this)

    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    applyTransition() {
        setTimeout(() => {
            this.setState({
                popIn: 'PopIn',
                loading: false
            })
        }, 200)
    }
    render() {
        const userData = this.props.userData
        const wishes = this.props.userData.wishes
        return (
            <section className="User">
                {userData.loading ? <LinearProgress /> : null}
                <header className="User-Info">
                    <div className={`User-image ${this.state.popIn}`}>
                        <img onLoad={this.applyTransition} src={userData.user.profilePicUrl} />
                    </div>
                </header>

                {!userData.loading && !this.state.loading ? 
                    <section className="User-Wishes">
                        <div className="User-Content">
                            <h1>{userData.user.name}</h1>
                            {!userData.loading ? 'A.K.A: ' + userData.user.nickname : ''}
                            {wishes.length === 0 && !userData.loading ? 
                                <h2 className="User-Nickname">
                                    "{userData.user.nickname}" 
                                    ønsker seg ingenting til jul :(
                                </h2> 
                            : null}
                        </div>
                        {wishes.map((wish, i) => {
                            return (
                                <UserCard
                                    wish={wish}
                                    index={i}
                                    key={i}
                                />
                                ) 
                            })
                        }
                    </section> : null}
            </section>
        )
    }
}

export default User;
