import React, { Component } from 'react';

import './styles/UserForm.css'

import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

class UserForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            name: '',
            nickname: '',
            profilePicUrl: ''
        }

        this.AddUser = this.AddUser.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.clearInputFields = this.clearInputFields.bind(this)
    }
    AddUser() {
        this.props.AddUser(this.state, this.clearInputFields)
    }
    clearInputFields() {
        this.setState({
            email: '',
            password: '',
            name: '',
            nickname: '',
            profilePicUrl: ''
        })
    }
    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value })
    }
    render() {
        return (
            <form className="Form">
                <FormControl>
                    <InputLabel htmlFor="Email">E-mail</InputLabel>
                    <Input id="email" value={this.state.email} onChange={this.handleChange} />
                    <FormHelperText>Login mail</FormHelperText>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input id="password" value={this.state.password} onChange={this.handleChange} />
                    <FormHelperText>Password</FormHelperText>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="Name">Name</InputLabel>
                    <Input id="name" value={this.state.name} onChange={this.handleChange} />
                    <FormHelperText>State your name</FormHelperText>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="nickname">Nickname</InputLabel>
                    <Input id="nickname" value={this.state.nickname} onChange={this.handleChange} />
                    <FormHelperText>State your nickname</FormHelperText>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="profilePicUrl">Picture url</InputLabel>
                    <Input id="profilePicUrl" value={this.state.profilePicUrl} onChange={this.handleChange} />
                    <FormHelperText>Enter a url for a profile picture.</FormHelperText>
                </FormControl>

                <Button raised className="Form-margin" color="primary" onClick={this.AddUser}>
                    Add User
                </Button>
            </form>
        );
    }
}

export default UserForm;
