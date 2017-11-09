import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'

import Header from './components/Main/Header'
import Footer from './components/Main/Footer' 

import ManageWishes from './components/Admin/ManageWishes'
import Home from './components/Main/Home'
import ManageUsers from './components/Admin/ManageUsers'

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
            <Route exact path='/' component={Home} />
            <Route path='/manageWishes' render={() => 
            <ManageWishes 
              finishedAuth={this.state.finishedAuth} 
              uid={this.state.uid} 
              LoggedIn={this.state.loggedIn} />} 
            />
            <Route path='/manageUsers' render={() => <ManageUsers LoggedIn={this.state.loggedIn} />} />
          </Switch>
        </main>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
