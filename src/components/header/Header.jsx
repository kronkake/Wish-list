import React, { Component } from 'react'
import './Header.css'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { logOut, login, setLogin } from '../../Data/Actions/Auth'

import { Firebase } from '../../Data/Firebase'
import LoginDialog from './LoginDialog'
import SideDrawer from './Drawer'

import Menu from 'material-ui-icons/Menu'
import IconButton from 'material-ui/IconButton'
import SvgIcon from 'material-ui/SvgIcon'

const SantaHat = props => (
  <SvgIcon {...props}>
    <path d="M12.03.18l11.7 10.273-7.17-1.214"/><circle cx="23.73" cy="10.453" r="2.297"/><path d="M20.71 17.542L12.03.182 3.35 17.54M24.06 23.96c0 1.037-.9 1.886-2.004 1.886H2.006C.9 25.846 0 24.996 0 23.96v-3.775c0-1.038.902-1.887 2.005-1.887h20.05c1.104 0 2.006.85 2.006 1.887v3.774z"/>
  </SvgIcon>
)

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
      uid: '',
      drawerOpen: false,
      slideIn: ''
    }

    this.toggleLoginDialog = this.toggleLoginDialog.bind(this)
    this.login = this.login.bind(this)
    this.loggedIn = this.loggedIn.bind(this)
    this.logOut = this.logOut.bind(this)
    this.onChange = this.onChange.bind(this)
    this.checkForEnter = this.checkForEnter.bind(this)
    this.toggleDrawer = this.toggleDrawer.bind(this)
  }
  componentDidMount() {
    setTimeout(() => this.setState({ slideIn: 'slideIn'}), 500);
  }
  toggleLoginDialog() {
    this.setState({ open: !this.state.open })
  }
  onChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  checkForEnter(event) {
    if (event.key === 'Enter') { this.login() }
  }
  login() {
    const {setLogin} = this.props
    if (this.state.loading) { return }
    this.setState({ loading: true })
    
    const promise = Firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
      .then(this.loggedIn)
      .catch((error) => {
        console.log(error) 
        this.setState({ message: error.code, loading: false })
      })
    dispatch(setLogin(promise))
  }
  loggedIn(user) {
    const {login} = this.props
    dispatch(login(user))
    this.setState({ loading: false })
    this.toggleLoginDialog()
  }
  logOut() {
    const {logOut} = this.props
    const promise = Firebase.auth().signOut().then(() => { })
    dispatch(logOut(promise))
  }
  toggleDrawer() {
    const drawerOpen = this.state.drawerOpen
    this.setState({ drawerOpen: !drawerOpen })
  }
  render() {
    return (
      <header className={`MainHeader ${this.state.slideIn}`}>
        <Link to='/' className="SantaHat">
          <SantaHat className="SantaHat-Icon" style={{height: 30, width: 30}} />
        </Link>

        <LoginDialog 
          open={this.state.open}
          login={this.login}
          openLoginDialog={this.toggleLoginDialog}
          onChange={this.onChange}
          loading={this.state.loading}
          message={this.state.message}
          checkForEnter={this.checkForEnter}
        />
        <IconButton onClick={this.toggleDrawer}>
          <Menu className="DrawerIcon" />
        </IconButton>
        <SideDrawer 
          open={this.state.drawerOpen}
          toggleDrawer={this.toggleDrawer}
          openLoginDialog={this.toggleLoginDialog}
          loggedIn={this.state.loggedIn} 
          logOut={this.logOut}
          uid={this.state.uid}
        />
      </header>
    );
  }
}

const mapStateToProps = state => {
  return { Auth: state.auth }
}

const mapDispatchToProps = dispatch => {
  return {
    logOut: promise => dispatch(logOut(promise)),
    setLogin: promise => dispatch(setLogin(promise)),
    login: promise => dispatch(login(promise))
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Header);
