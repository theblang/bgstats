import React, { Component } from 'react';
import { Typography, Button } from '@material-ui/core';

class Collection extends Component {
    render() {
        return (
            <div>
                <Typography paragraph>This is the Collection page</Typography>
                <Button variant="contained">Add Game</Button>
            </div>
        );
    }
}

export default Collection;
