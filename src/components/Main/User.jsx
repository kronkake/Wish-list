import React, { Component } from 'react'

import { Firestore } from '../../Data/Firebase'

import './styles/User.css'

import { LinearProgress } from 'material-ui/Progress'

import UserCard from './UserCard'

class User extends Component {
    constructor(props) {
        super(props)

        this.state ={
            loading: true,
            wishes: [],
            user: {},
            popIn: ''
        }

        this.getSnapShot = this.getSnapShot.bind(this)
        this.applyTransition = this.applyTransition.bind(this)
        this.insertData = this.insertData.bind(this)

    }
    componentDidMount() {
        const uid = this.props.match.params.id
        if (uid) {
            this.userRef = this.userCollection = Firestore.collection('users').doc(uid)
            this.wishesRef = this.userRef.collection('wishes')
            this.getSnapShot()
        }
    }

    applyTransition() {
        setTimeout(() => {
            this.setState({
                popIn: 'PopIn'
            })
        }, 200)
    }
    getSnapShot() {
        let user = {}
        let wishes = []

        const userRefPromise = this.userRef.get().then((userDocument) => {
          user = userDocument.data()
        })
        const wishRefPromise = this.wishesRef.get().then((wishCollection) => {
            wishCollection.forEach((wish) => {
                wishes.push(wish.data())
            })
        })

        Promise.all([userRefPromise, wishRefPromise])
            .then(() => this.insertData(user, wishes))
    }
    insertData(user, wishes) {
        //Sync data insert with image popin animation
        setTimeout(() => {
            wishes.sort((a, b) => { return (a.index - b.index) })
            
            this.setState({ 
                user: user, 
                wishes: wishes, 
                loading: false 
            })
        }, 200)
    }
    render() {
        return (
            <section className="User">
                {this.state.loading ? <LinearProgress /> : null}
                <header className="User-Info">
                    <div className={`User-image ${this.state.popIn}`}>
                        <img onLoad={this.applyTransition} src={this.state.user.profilePicUrl} />
                    </div>
                </header>

                {!this.state.loading ? 
                    <section className="User-Wishes">
                        <div className="User-Content">
                            <h1>{this.state.user.name}</h1>
                            {!this.state.loading ? 'A.K.A: ' + this.state.user.nickname : ''}
                            {this.state.wishes.length === 0 && !this.state.loading ? 
                                <h2 className="User-Nickname">
                                    "{this.state.user.nickname}" 
                                    ønsker seg ingenting til jul :(
                                </h2> 
                            : null}
                        </div>
                        {this.state.wishes.map((wish, i) => {
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
    );
  }
}

export default User;
