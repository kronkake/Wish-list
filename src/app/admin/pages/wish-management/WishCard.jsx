import React, { Component }  from 'react'

import './WishCard.css'

import WishCardEditMode from './WishCards/WishCardEdit'
import WishCardStandard from './WishCards/WishCardStandard'
import DeleteWarning from './WishCards/DeleteWarning'

class WishCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            editMode: false,
            confirmationDialogOpen: false,
            wish: this.props.wish
        }

        this.toggleEditMode = this.toggleEditMode.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.toggleConfirmation = this.toggleConfirmation.bind(this)
        this.deleteWish = this.deleteWish.bind(this)

    }
    deleteWish(confirmation)  {
        if (confirmation) {
            this.props.deleteWish(this.state.wish.id)
            this.setState({ confirmationDialogOpen: false })
        }
    }
    toggleConfirmation() {
        const confirmationDialogOpen = this.state.confirmationDialogOpen
        this.setState({ confirmationDialogOpen: !confirmationDialogOpen })
    }
    handleChange(event) {
        const wish = this.state.wish
        wish[event.target.id] = event.target.value
        this.setState({ wish: wish })
    }
    toggleEditMode() {
        const editMode = this.state.editMode
        this.setState({ editMode: !editMode })
    }
    render() {
        if (this.state.editMode) {
            return ( 
                <WishCardEditMode
                    deleteWish={this.deleteWish}
                    editWish={this.props.editWish}
                    toggleEditMode={this.toggleEditMode}
                    handleChange={this.handleChange}
                    wish={this.state.wish}
                 />
            )
        } else {
            return(
                <section>
                    <DeleteWarning
                        open={this.state.confirmationDialogOpen}
                        toggleConfirmation={this.toggleConfirmation}
                        deleteWish={this.deleteWish}
                    />
                    <WishCardStandard
                        toggleEditMode={this.toggleEditMode}
                        toggleConfirmation={this.toggleConfirmation}
                        wish={this.state.wish}
                    />
                </section>
            )   
        }
    }
}

export default WishCard;
