import React from 'react'

import './styles/WishCard.css'

import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'

const WishCard = ({ deleteWish, editWish, wish: { id, text, linkToPrisjakt, url } }) => {
    return (
            <Paper elevation={6} className="WishCard">
                    <section className="WishCard-Content">
                        {text}
                    </section>
                    <section className="WishCard-Toolbar">
                        <Button raised className="Form-margin" color="primary" onClick={() => deleteWish(id)}>
                            Delete
                        </Button>
                        <Button raised className="Form-margin" color="primary" onClick={() => editWish(id)}>
                            Edit
                        </Button>
                    </section>
            </Paper>
    );
}



export default WishCard;
