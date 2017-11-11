import React from 'react';

import { Link } from 'react-router-dom'

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Home from 'material-ui-icons/Home'
import LockOpen from 'material-ui-icons/LockOpen'

const HeaderNormal = ({ openLoginDialog, toggleDrawer }) => {
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
                <Link to="/" onClick={() => { toggleDrawer(); openLoginDialog() }}>
                    <ListItem button>
                    <ListItemIcon>
                        <LockOpen />
                    </ListItemIcon>
                        <ListItemText primary="Sign in" />              
                    </ListItem>
                </Link>
            </List>
    );
}

export default HeaderNormal;
