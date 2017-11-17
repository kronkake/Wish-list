import React, { Component } from 'react'

import { Firestore } from '../../Data/Firebase'

import './styles/User.css'

import Button from 'material-ui/Button'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import { LinearProgress } from 'material-ui/Progress'

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
        this.setState({
            popIn: 'PopIn'
        })
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
            .then(() => this.setState({ 
                user: user, 
                wishes: wishes, 
                loading: false 
            })
        )
    }
    render() {
        return (
            <section className="User">
                {this.state.loading ? <LinearProgress /> : null}
                <header className="User-Info">
                    <div className={`User-image ${this.state.popIn}`}>
                        <img onLoad={this.applyTransition} src={this.state.user.profilePicUrl} />
                    </div>
                    {this.state.wishes.length === 0 && !this.state.loading ? 
                    <h2>"{this.state.user.nickname}" ønsker seg ingenting til jul :(</h2> 
                    : null}
                </header>

                {!this.state.loading ? 
                    <section className="User-Wishes">
                        <div className="User-Content">
                            <h1>{this.state.user.name}</h1>
                            <span>{!this.state.loading ? 'A.K.A: ' + this.state.user.nickname : ''}</span>
                        </div>
                        {this.state.wishes.map((wish, i) => {
                            return (
                                <Card className="UserWishCard" elevation={0} key={i}>    
                                    <CardContent>
                                        {`${i +1}. `}{wish.text}
                                    </CardContent>
                                    <CardActions>
                                        {wish.url ? 
                                            (<a target="_blank" href={wish.url}>
                                                <Button color="primary" dense>Lenke</Button>
                                            </a>) : null  
                                        }

                                        {wish.linkToPrisjakt ?  
                                            (<a target="_blank" href={wish.linkToPrisjakt}>
                                            <Button dense>Prisjakt</Button>
                                            </a>) : null}
                                    </CardActions>
                                </Card>
                                ) 
                            })
                        }
                    </section> : null}
            </section>
    );
  }
}

export default User;
