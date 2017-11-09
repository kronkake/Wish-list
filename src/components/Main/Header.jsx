import React, { Component } from 'react'
import './styles/Header.css'

import { Firebase } from '../../Data/Firebase'
import LoginDialog from './LoginDialog'
import HeaderLoggedIn from './Header/HeaderLoggedIn'
import HeaderNormal from './Header/HeaderNormal'

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      username: '',
      password: '',
      message: '',
      loading: false,
      loggedIn: false,
      uid: ''
    }

    this.openLoginDialog = this.openLoginDialog.bind(this)
    this.login = this.login.bind(this)
    this.loggedIn = this.loggedIn.bind(this)
    this.logOut = this.logOut.bind(this)
    this.onChange = this.onChange.bind(this)
    this.checkForEnter = this.checkForEnter.bind(this)
  }
  openLoginDialog() {
    this.setState({ open: !this.state.open })
  }
  onChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  checkForEnter(event) {
    if (event.key === 'Enter') { this.login() }
  }
  login() {
    if (this.state.loading) { return }
    this.setState({ loading: true })
    Firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
      .then(this.loggedIn)
      .catch((error) => {
        console.log(error); 
        this.setState({ message: error.code, loading: false })
      })
  }
  loggedIn(user) {
    this.setState({ loading: false })
    this.openLoginDialog()
  }
  logOut() {
    Firebase.auth().signOut().then(() => { })
  }
  render() {
    return (
      <header className="MainHeader">
        <LoginDialog 
          open={this.state.open}
          login={this.login}
          openLoginDialog={this.openLoginDialog}
          onChange={this.onChange}
          loading={this.state.loading}
          message={this.state.message}
          checkForEnter={this.checkForEnter}
        />
      {this.props.loggedIn ?
        <HeaderLoggedIn
          logOut={this.logOut}
          uid={this.props.uid} />
        : 
        <HeaderNormal 
          openLoginDialog={this.openLoginDialog} />
      }
      </header>
    );
  }
}

export default Header;
