import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class DeleteWarning extends React.Component {
    render() {
        return (
            <Dialog open={this.props.open} onRequestClose={this.props.toggleConfirmation}>
                <DialogTitle>{"Confirm"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this wish for ever and ever?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.props.deleteWish(true)} color="primary">
                        Yes
                    </Button>
                    <Button onClick={this.props.toggleConfirmation} color="primary" autoFocus>
                        No
                    </Button>
                 </DialogActions>
             </Dialog>
        );
     }
}

export default DeleteWarning;