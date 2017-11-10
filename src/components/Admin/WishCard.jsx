import React, { Component }  from 'react'

import './styles/WishCard.css'

import WishCardEditMode from './WishCards/WishCardEdit'
import WishCardStandard from './WishCards/WishCardStandard'

class WishCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            editMode: false,
            wish: this.props.wish
        }

        this.toggleEditMode = this.toggleEditMode.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }
    handleChange(event) {
        this.setState({ wish[event.target.id]: event.target.value });
    }
    toggleEditMode() {
        const editMode = this.state.editMode
        this.setState({ editMode: !editMode })
    }
    render() {
        if (this.state.editMode) {
            return ( 
                <WishCardEditMode
                    deleteWish={this.props.deleteWish}
                    editWish={this.props.editWish}
                    toggleEditMode={this.toggleEditMode}
                    handleChange={this.handleChange}
                    wish={this.state.wish}
                 />
            )
        } else {
            return(
                <WishCardStandard
                    toggleEditMode={this.toggleEditMode}
                    deleteWish={this.props.deleteWish}
                    wish={this.state.wish}
                 />
            )   
        }
    }
}

export default WishCard;
