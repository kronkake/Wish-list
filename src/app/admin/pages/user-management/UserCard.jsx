import React from 'react'

import './UserCard.css'

import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'

const UserCard = ({ name, nickname, profilePicUrl, deleteUser, id }) => {
    return (
        <Paper elevation={6} className="UserCard">
            <section className="UserCard-Picture">
                <img src={profilePicUrl} alt={`A person named ${name}`} />
            </section>
            <section className="UserCard-InfoWrap">
                <section className="UserCard-UserInfo">
                    <h3>Name: {name}</h3>
                    <h4>Also goes by "{nickname}"</h4>
                </section>
                <section className="UserCard-Toolbar">
                    <Button raised className="Form-margin" color="primary" onClick={() => deleteUser(id)}>
                        Delete
                    </Button>
                </section>
            </section>
        </Paper>
    )
}

export default UserCard
