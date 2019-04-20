import React, { useState, useEffect } from 'react';
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
import uuidv3 from 'uuid/v3';
import uuidNamespaces from './uuidNamespaces';
import { Link } from 'react-router-dom';

export default function Collection({ match }) {
    const [games, setGames] = useState([]);
    const [newGameName, setNewGameName] = useState('');

    async function storeGames(games) {
        try {
            await localforage.setItem('games', games);
        } catch (e) {
            console.err('Error storing games');
        }
        return games;
    }

    async function addGame(name) {
        if (!name) {
            return;
        }
        const newGames = await storeGames(
            games.concat([
                { id: uuidv3(name, uuidNamespaces.manual), name: name }
            ])
        );
        setGames(newGames);
        setNewGameName('');
    }

    async function removeGame(game) {
        const index = games.map(g => g.name).indexOf(game.name);
        if (index > -1) {
            const newGames = Object.assign([], games);
            newGames.splice(index, 1);
            await storeGames(newGames);
            setGames(newGames);
        }
    }

    useEffect(() => {
        async function loadGames() {
            let games;
            try {
                games = await localforage.getItem('games');
                setGames(games || []);
            } catch (e) {
                console.error('Error querying games');
            }
            return games || [];
        }
        loadGames();
    }, []);

    return (
        <div>
            <Typography paragraph>This is the Collection page</Typography>
            <List component="nav">
                {games.map((game, i) => {
                    return (
                        <ListItem
                            button
                            key={i}
                            component={Link}
                            to={`game/${game.id}`}
                        >
                            <ListItemText inset primary={game.name} />
                            <ListItemSecondaryAction
                                onClick={() => removeGame(game)}
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
                    onClick={() => addGame(newGameName)}
                >
                    Add Game
                </Button>
            </form>
        </div>
    );
}
