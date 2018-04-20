import React from 'react'

import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl, FormHelperText } from 'material-ui/Form'

const WishCardEditMode = ({
    editWish,
    toggleEditMode,
    handleChange,
    wish: { id, text, linkToPrisjakt, url, index }
}) => {
    const _editWish = () => {
        editWish({ id, text, linkToPrisjakt, url, index })
        toggleEditMode()
    }
    return (
        <Paper elevation={6} className="WishCard">
            <section className="WishCard-Content">
                <FormControl fullWidth>
                    <InputLabel htmlFor="text">Wish</InputLabel>
                    <Input id="text" value={text} onChange={handleChange} />
                    <FormHelperText>State your wish</FormHelperText>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel htmlFor="url">Lenke</InputLabel>
                    <Input id="url" value={url} onChange={handleChange} />
                    <FormHelperText>Link to product</FormHelperText>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel htmlFor="linkToPrisjakt">
                        Link to Prisjakt
                    </InputLabel>
                    <Input
                        id="linkToPrisjakt"
                        value={linkToPrisjakt}
                        onChange={handleChange}
                    />
                    <FormHelperText>
                        Link to Prisjakt/Prisguide.no
                    </FormHelperText>
                </FormControl>
            </section>
            <section className="WishCard-Toolbar">
                <Button
                    raised
                    className="Form-margin"
                    color="primary"
                    onClick={toggleEditMode}
                >
                    Cancel
                </Button>
                <Button
                    raised
                    className="Form-margin"
                    color="primary"
                    onClick={_editWish}
                >
                    Save
                </Button>
            </section>
        </Paper>
    )
}

export default WishCardEditMode
