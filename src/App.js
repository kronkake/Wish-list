import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'

import Header from './components/header/Header'
import Footer from './components/footer/Footer' 

import ManageWishesContainer from './app/admin/pages/wish-management/ManageWishesContainer'
import ManageUsers from './app/admin/pages/user-management/ManageUsers'
import HomeContainer from './app/public/pages/home/HomeContainer'
import UserContainer from './app/public/pages/user/UserContainer'

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
