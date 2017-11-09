import React, { Component } from 'react';

import './styles/UserForm.css'

import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

class WishForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: '',
            url: '',
            linkToPrisjakt: '',
            index: ''
        }

        this.addWish = this.addWish.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    addWish() {
        this.props.addWish(this.state)

        this.setState({
            text: '',
            url: '',
            linkToPrisjakt: '',
            index: ''
        })
    }
    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }
    render() {
        return (
            <form className="Form">
                <FormControl>
                    <InputLabel htmlFor="text">Wish</InputLabel>
                    <Input id="text" value={this.state.wish} onChange={this.handleChange} />
                    <FormHelperText>State your wish</FormHelperText>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="url">Lenke</InputLabel>
                    <Input id="url" value={this.state.url} onChange={this.handleChange} />
                    <FormHelperText>Link to product</FormHelperText>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="linkToPrisjakt">Link to Prisjakt</InputLabel>
                    <Input id="linkToPrisjakt" value={this.state.linkToPrisjakt} onChange={this.handleChange} />
                    <FormHelperText>Link to Prisjakt/Prisguide.no</FormHelperText>
                </FormControl>
                <Button raised className="Form-margin" color="primary" onClick={this.addWish}>
                    Add Wish
                </Button>
            </form>
        );
    }
}

export default WishForm;
