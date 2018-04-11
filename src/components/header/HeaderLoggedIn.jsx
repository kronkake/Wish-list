import React from 'react';

import { Link } from 'react-router-dom'

import Home from 'material-ui-icons/Home'
import Favourite from 'material-ui-icons/Favorite'
import SignOut from 'material-ui-icons/ExitToApp'
import Users from 'material-ui-icons/SupervisorAccount'

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import { AdminUserId } from '../../Data/Firebase'

const HeaderLoggedIn = ({ logOut, uid, toggleDrawer }) => {
    return (
            <List>
                <Link to="/" onClick={toggleDrawer}>
                    <ListItem button>
                    <ListItemIcon>
                        <Home />
                    </ListItemIcon>
                        <ListItemText primary="Home" />              
                    </ListItem>
                </Link>
            
                <Link to="/manageWishes" onClick={toggleDrawer}>
                    <ListItem button>
                    <ListItemIcon>
                        <Favourite />
                    </ListItemIcon>
                        <ListItemText primary="Manage wishes" />
                    </ListItem>
                </Link>

                {AdminUserId === uid ?      
                    <Link to="/manageUsers" onClick={toggleDrawer}>           
                        <ListItem button>
                        <ListItemIcon>
                            <Users />
                        </ListItemIcon>
                            <ListItemText primary="Manage Users" />
                        </ListItem>
                     </Link>
                : null}
                
                <ListItem button onClick={() => { toggleDrawer(); logOut()}} >
                <ListItemIcon>
                    <SignOut />
                </ListItemIcon>
                <ListItemText primary="Log out" />
                </ListItem>
            </List>
    );
  }

export default HeaderLoggedIn
