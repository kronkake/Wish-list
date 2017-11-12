import React, { Component } from 'react';

import { Firestore } from '../../Data/Firebase'

import { LinearProgress } from 'material-ui/Progress'

import './styles/Home.css'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      loading: true,
      popIn: ''
    }

    this.getSnapShot = this.getSnapShot.bind(this)
    this.applyTransition = this.applyTransition.bind(this)

    this.userCollection = Firestore.collection('users')

  }
  componentWillMount() {
    this.getSnapShot()
  }
  applyTransition() {
    this.setState({
      popIn: 'PopIn'
    })
  }
  getSnapShot() {
    this.userCollection.get().then((usersRef) => {
      const users = []
      usersRef.forEach((userRef) => {
          const user = userRef.data()
          user.id = userRef.id 
          users.push(user)
      })
      this.setState({ users: users, loading: false })
      })
  }
  render() {
    return (
      <section>
        {this.state.loading ? <LinearProgress /> : null}
        <h1 className="text-center">Her kan du finne ønskelister for alle de kule folka!</h1>
        <section className="ContentContainer-Row">
          {this.state.users.map((user, i) => { 
            return (
              <div className={`UserHome ${this.state.popIn}`} key={i}>
                <div className="UserHome-Image">
                  <img src={user.profilePicUrl} onLoad={this.applyTransition} />
                </div>
                <div className="UserHome-Content">
                  {user.name}
                </div>
              </div>
              ) 
            })
          }
        </section>
      </section>
    );
  }
}

export default Home;
