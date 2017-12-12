import React, { Component } from 'react';

import { Link } from 'react-router-dom'

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

    this.applyTransition = this.applyTransition.bind(this)

  }
  applyTransition() {
    setTimeout(()=> {
      this.setState({ popIn: 'PopIn' })
    }, 200)
  }
  render() {
    return (
      <section>
        {this.props.User.loading ? <LinearProgress /> : null}
        <h1 className="text-center">Her kan du finne ønskelister for alle de kule folka!</h1>
        <section className="ContentContainer-Row">
          {this.props.User.users.map((user, i) => { 
            return (
              <div className={`UserHome ${this.state.popIn}`} key={i}>
                <Link to={`/user/${user.id}`} className="UserHome-Image">
                    <img src={user.profilePicUrl} onLoad={this.applyTransition} />
                </Link>
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
