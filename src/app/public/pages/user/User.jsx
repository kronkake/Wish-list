import React, { Component, Fragment } from 'react'

import { Transition, animated } from 'react-spring'

import './User.css'

import { LinearProgress } from 'material-ui/Progress'

import UserCard from './UserCard'

class User extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            user: {},
            loadingImage: true
        }

        this.toggleImage = this.toggleImage.bind(this)
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    toggleImage() {
        setTimeout(() => {
            this.setState({
                loadingImage: false
            })
        }, 0)
    }
    renderNoWishes() {
        const {
            userData,
            userData: { wishes }
        } = this.props

        if (!userData.loading && wishes.length === 0) {
            return (
                <h2 className="User-Nickname">
                    "{userData.user.nickname}" ønsker seg ingenting til jul :(
                </h2>
            )
        } else {
            return null
        }
    }
    renderPlaceholder({ opacity, ...rest }) {
        const profilePicUrl = rest.profilePicUrl
        return (
            <animated.div
                style={{ opacity }}
                className="User-image-transitionLayer"
            >
                <img src={profilePicUrl} />
            </animated.div>
        )
    }

    renderUserImage({ opacity }) {
        return (
            <animated.div
                style={{ opacity }}
                className="User-image-transitionLayer"
            >
                <div className="User-image--placeholder" />
            </animated.div>
        )
    }

    render() {
        const {
            userData,
            userData: { wishes }
        } = this.props
        const { loadingImage } = this.state

        return (
            <section className="User">
                {userData.loading ? <LinearProgress /> : null}
                <header className="User-Info">
                    <div className="User-image">
                        <Transition
                            native
                            from={{ opacity: 0 }}
                            enter={{ opacity: 1 }}
                            leave={{ opacity: 0 }}
                            profilePicUrl={userData.user.profilePicUrl}
                            toggleImage={this.toggleImage}
                            config={{ tension: 5, friction: 5 }}
                        >
                            {loadingImage
                                ? this.renderUserImage
                                : this.renderPlaceholder}
                        </Transition>
                    </div>
                </header>
                <img
                    src={userData.user.profilePicUrl}
                    onLoad={this.toggleImage}
                    style={{ display: 'none' }}
                />
                <section className="User-Wishes">
                    {!userData.loading && !this.state.loading ? (
                        <Fragment>
                            <div className="User-Content">
                                <h1>{userData.user.name}</h1>
                                {!userData.loading
                                    ? 'A.K.A: ' + userData.user.nickname
                                    : ''}
                                {this.renderNoWishes()}
                            </div>
                            <Transition
                                from={{
                                    opacity: 0,
                                    transform: 'translateY(20%)'
                                }}
                                to={{ opacity: 1, transform: 'translateY(0)' }}
                                keys={wishes.map(item => item.id)}
                            >
                                {wishes.map((wish, i) => styles => (
                                    <UserCard
                                        wish={wish}
                                        index={i}
                                        style={styles}
                                    />
                                ))}
                            </Transition>
                        </Fragment>
                    ) : null}
                </section>
            </section>
        )
    }
}

export default User
