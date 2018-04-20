import React, { Component } from 'react'

import './Drawer.css'

import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'

import HeaderLoggedIn from './HeaderLoggedIn'
import HeaderNormal from './HeaderNormal'

class SideDrawer extends Component {
    render() {
        const LoggedInContent = (
            <section className="DrawerGrid">
                <div className="DrawerGrid-Header">
                    <div className="DrawerGrid-ImagePlacerholder" />
                </div>
                <div className="DrawerGrid-Content">
                    <Divider />
                    <HeaderLoggedIn
                        logOut={this.props.logOut}
                        uid={this.props.uid}
                        toggleDrawer={this.props.toggleDrawer}
                    />
                </div>
            </section>
        )
        const LoggedOutContent = (
            <section className="DrawerGrid">
                <div className="DrawerGrid-Header">
                    <div className="DrawerGrid-ImagePlacerholder" />
                </div>
                <div className="DrawerGrid-Content">
                    <Divider />
                    <HeaderNormal
                        toggleDrawer={this.props.toggleDrawer}
                        openLoginDialog={this.props.openLoginDialog}
                    />
                </div>
            </section>
        )
        return (
            <Drawer
                open={this.props.open}
                onRequestClose={this.props.toggleDrawer}
            >
                {this.props.loggedIn ? LoggedInContent : LoggedOutContent}
            </Drawer>
        )
    }
}

export default SideDrawer
