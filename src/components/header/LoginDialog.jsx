import React from 'react'

import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import { CircularProgress } from 'material-ui/Progress'
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog'

const LoginDialog = ({ open, login, openLoginDialog, onChange, message, loading, checkForEnter }) => {
    return (
        <Dialog open={open} onRequestClose={openLoginDialog}>
            <DialogTitle>Log in</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="username"
                    label="Email Address"
                    type="email"
                    onChange={onChange}
                    onKeyPress={checkForEnter}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="password"
                    label="password"
                    type="password"
                    onChange={onChange}
                    onKeyPress={checkForEnter}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={openLoginDialog} color="default">
                    Cancel
                </Button>
                <Button onClick={login} size={50} color="primary">
                    {loading ? <CircularProgress /> : 'Log in'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default LoginDialog
