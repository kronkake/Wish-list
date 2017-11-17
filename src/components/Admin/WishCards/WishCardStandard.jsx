import React from 'react'

import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'

const WishCardNormalMode = ({ toggleConfirmation, toggleEditMode, wish: { id, text, linkToPrisjakt, url, index } }) => {
    return (
            <Paper elevation={6} className="WishCard">
                    <section className="WishCard-Content">
                        {index}. {text}
                    </section>
                    <section className="WishCard-Toolbar">
                        <Button raised className="Form-margin" color="primary" onClick={() => toggleConfirmation(true)}>
                            Delete
                        </Button>
                        <Button raised className="Form-margin" color="primary" onClick={toggleEditMode}>
                            Edit
                        </Button>
                    </section>
            </Paper>
    );
}

export default WishCardNormalMode