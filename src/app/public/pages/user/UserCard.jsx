import React from 'react'

import Card, { CardActions, CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'

const UserCard = ({ index, style, wish: { text, url, linkToPrisjakt } }) => {
    return (
        <Card style={style} className="UserWishCard" elevation={0}>
            <CardContent>
                {`${index + 1}. `}{text}
            </CardContent>
            <CardActions>
                {url ?
                    (<a target="_blank" href={url}>
                        <Button color="primary" dense>Lenke</Button>
                    </a>) : null
                }
                {linkToPrisjakt ?
                    (<a target="_blank" href={linkToPrisjakt}>
                        <Button dense>Prisjakt</Button>
                    </a>) : null}
            </CardActions>
        </Card>
    );
}



export default UserCard;
