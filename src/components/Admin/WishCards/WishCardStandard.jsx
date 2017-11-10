import React from 'react'

import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'

const WishCardNormalMode = ({ deleteWish, toggleEditMode, wish: { id, text, linkToPrisjakt, url } }) => {
    return (
            <Paper elevation={6} className="WishCard">
                    <section className="WishCard-Content">
                        {text}
                    </section>
                    <section className="WishCard-Toolbar">
                        <Button raised className="Form-margin" color="primary" onClick={() => deleteWish(id)}>
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