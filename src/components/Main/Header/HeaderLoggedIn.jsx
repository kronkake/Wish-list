import React from 'react';

import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'
import { AdminUserId } from '../../../Data/Firebase'

const HeaderLoggedIn = ({ logOut, uid }) => {
    return (
            <section className="HeaderBottom">
                <Button className="ButtonLink">
                    <Link to="/">Home</Link>
                </Button>
                <Button className="ButtonLink">
                    <Link to="/manageWishes">Wishes</Link>
                </Button>
                {
                AdminUserId === uid ?                 
                    <Button className="ButtonLink">
                        <Link to="/manageUsers">Users</Link>
                    </Button>
                : null
                }
                <Button className="ButtonLink" onClick={logOut}>
                    Log out
                </Button>
            </section>
    );
  }

export default HeaderLoggedIn
