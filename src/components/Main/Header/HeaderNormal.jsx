import React from 'react';

import Button from 'material-ui/Button'

const HeaderNormal = ({ openLoginDialog }) => {
    return (
        <section className="HeaderTop">
            <Button className="ButtonLink"  onClick={openLoginDialog}>
                <h1 style={{marginTop: 0, marginBottom: 0}}>Log in</h1>  
            </Button>
        </section>
    );
}

export default HeaderNormal;
