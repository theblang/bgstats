import React, { useState } from 'react';
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

async function queryGames() {
    let games;
    try {
        games = await localforage.getItem('games');
    } catch (e) {
        console.error('Error querying games');
    }
    return games;
}

async function storeGames(games) {
    try {
        await localforage.setItem('games', games);
    } catch (e) {
        console.err('Error storing games');
    }
    return games;
}

export default function Collection() {
    const [games, setGames] = useState([]);
    const [newGameName, setNewGameName] = useState('');

    queryGames().then(games => {
        setGames(games);
    });

    return (
        <div>
            <Typography paragraph>This is the Collection page</Typography>
            <List component="nav">
                {games.map((game, i) => {
                    return (
                        <ListItem button key={i}>
                            <ListItemText inset primary={game.name} />
                            <ListItemSecondaryAction
                                onClick={async () => {
                                    const index = games
                                        .map(g => g.name)
                                        .indexOf(game.name);
                                    if (index > -1) {
                                        const newGames = Object.assign(
                                            [],
                                            games
                                        );
                                        newGames.splice(index, 1);
                                        await storeGames(newGames);
                                        setGames(newGames);
                                    }
                                }}
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
                    value={newGameName}
                    onChange={e => setNewGameName(e.target.value)}
                />
                <Button
                    variant="contained"
                    onClick={async () => {
                        if (!newGameName) {
                            return;
                        }
                        await storeGames(games.concat([{ name: newGameName }]));
                        setGames(games);
                        setNewGameName('');
                    }}
                >
                    Add Game
                </Button>
            </form>
        </div>
    );
}
