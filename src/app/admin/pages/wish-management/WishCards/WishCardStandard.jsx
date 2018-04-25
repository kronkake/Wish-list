import React from 'react'

import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'

const WishCardNormalMode = ({
    toggleConfirmation,
    toggleEditMode,
    showToolbar,
    wish: { id, text, linkToPrisjakt, url, index }
}) => {
    return (
        <Paper elevation={6} className="WishCard">
            <section className="WishCard-Content">
                {index}. {text}
            </section>
            <section className="WishCard-Toolbar">
                <Button
                    variant="raised"
                    className="Form-margin"
                    color="primary"
                    onClick={() => toggleConfirmation(true)}
                >
                    Delete
                </Button>
                <Button variant="raised" className="Form-margin" color="secondary" onClick={toggleEditMode}>
                    Edit
                </Button>
            </section>
        </Paper>
    )
}

export default WishCardNormalMode
