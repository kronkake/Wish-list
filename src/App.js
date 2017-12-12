import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'

import Header from './components/Main/Header'
import Footer from './components/Main/Footer' 

import ManageWishesContainer from './components/Admin/containers/ManageWishesContainer'
import HomeContainer from './components/Main/containers/HomeContainer'
import ManageUsers from './components/Admin/ManageUsers'
import UserContainer from './components/Main/containers/UserContainer'

import { Firebase } from './Data/Firebase'

class App extends Component {
  constructor() {
    super()

    this.state = {
      loggedIn: true,
      finishedAuth: false,
      uid: ''
    }
  }
  componentDidMount() {
    Firebase.auth().onAuthStateChanged(
      (user) => {
          if (!user) {
            this.setState({ loggedIn: false })
          } else {
            this.setState({ loggedIn: true, uid: user.uid, finishedAuth: true })
          }
      })
  }
  render() {
    return (
      <div className="MainContainer">
        <Header loggedIn={this.state.loggedIn} uid={this.state.uid}></Header>
        <main className="MainContentContainer">
          <Switch>
            <Route exact path='/' component={HomeContainer} />
            <Route exact path='/manageWishes' component={ManageWishesContainer} />
            <Route exact path='/manageUsers' render={() => <ManageUsers LoggedIn={this.state.loggedIn} />} />
            <Route path='/user/:id' component={UserContainer} />
          </Switch>
        </main>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
