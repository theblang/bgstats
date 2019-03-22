import React, { Component } from 'react';
import {
    Typography,
    Button,
    TextField,
    ListItem,
    ListItemText,
    List,
    ListItemSecondaryAction,
    IconButton
} from '@material-ui/core';
import localforage from 'localforage';
import DeleteIcon from '@material-ui/icons/Delete';

class Collection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [],
            newGameName: ''
        };
    }

    addGame(name) {
        if (name) {
            const games = this.state.games.concat([{ name }]);
            localforage
                .setItem('games', games)
                .then(() => {
                    this.setState({ games, newGameName: '' });
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }

    removeGame(game) {
        if (game && game.name) {
            const index = this.state.games.map(g => g.name).indexOf(game.name);
            if (index > -1) {
                const games = Object.assign([], this.state.games);
                games.splice(index, 1);
                localforage
                    .setItem('games', games)
                    .then(() => {
                        this.setState({ games });
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        }
    }

    componentDidMount() {
        localforage
            .getItem('games')
            .then(games => {
                // This code runs once the value has been loaded
                // from the offline store.
                games = games || [];
                this.setState({ games });
            })
            .catch(err => {
                // This code runs if there were any errors
                console.log(err);
            });
    }

    componentWillUnmount() {}

    render() {
        return (
            <div>
                <Typography paragraph>This is the Collection page</Typography>
                <List component="nav">
                    {this.state.games.map((game, i) => {
                        return (
                            <ListItem button key={i}>
                                <ListItemText inset primary={game.name} />
                                <ListItemSecondaryAction
                                    onClick={() => this.removeGame(game)}
                                >
                                    <IconButton aria-label="Delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>
                <form>
                    <TextField
                        id="game-name"
                        label="Game Name"
                        margin="normal"
                        value={this.state.newGameName}
                        onChange={e =>
                            this.setState({ newGameName: e.target.value })
                        }
                    />
                    <Button
                        variant="contained"
                        onClick={() => this.addGame(this.state.newGameName)}
                    >
                        Add Game
                    </Button>
                </form>
            </div>
        );
    }
}

export default Collection;
