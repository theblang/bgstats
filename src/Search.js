import React, { useState, useEffect } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Snackbar,
    Button
} from '@material-ui/core';
import localforage from 'localforage';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import CloseIcon from '@material-ui/icons/Close';
import uuidv3 from 'uuid/v3';
import uuidNamespaces from './uuidNamespaces';
import { Link } from 'react-router-dom';
// import xmljs from 'xml-js';

const useBggSearch = searchString => {
    const [results, setResults] = useState([]);

    // See https://boardgamegeek.com/wiki/page/BGG_XML_API2#toc1
    // See https://boardgamegeek.com/xmlapi2/search?query=7+wonders
    const searchUrl = new URL('https://boardgamegeek.com/xmlapi2/search');
    searchUrl.search = new URLSearchParams({
        query: searchString
    });

    useEffect(() => {
        // This works, but let's just read from a real search stored in a test file for now to minimize requests to BGG
        // fetch(searchUrl)
        //     .then(response => {
        //         return response.text();
        //     })
        //     .then(xml => {
        //         const json = xmljs.xml2js(xml, { compact: true });
        //         let games = json.items.item;
        //         games = games.map((game = {}) => {
        //             return {
        //                 id: game._attributes && game._attributes.id,
        //                 name:
        //                     game.name &&
        //                     game.name._attributes &&
        //                     game.name._attributes.value,
        //                 yearpublished:
        //                     game.yearpublished &&
        //                     game.yearpublished._attributes &&
        //                     game.yearpublished._attributes.value
        //             };
        //         });
        //         setResults(games);
        //     });

        async function searchGames() {
            const response = await fetch('/7wonderssearch.json');
            const jsonResponse = await response.json();
            const games = jsonResponse.map(gameJson =>
                Object.assign(gameJson, {
                    id: uuidv3(gameJson.name, uuidNamespaces.bgg)
                })
            );
            setResults(games);
        }
        searchGames();
    }, []);

    return results;
};

export default function Search() {
    const games = useBggSearch('7 Wonders');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    async function addBggGame(game) {
        if (!game) {
            return;
        }

        let games;
        try {
            games = await localforage.getItem('games');
            games = games || [];
            games = games.concat(game);
            await localforage.setItem('games', games);
            setSnackbarOpen(true);
            return games;
        } catch (e) {
            console.error('Error querying games');
        }
    }

    function handleSnackbarClose() {
        setSnackbarOpen(false);
    }

    return (
        <div>
            <List component="nav">
                {games.map((game, i) => {
                    return (
                        <ListItem
                            alignItems="flex-start"
                            button
                            key={i}
                            component={Link}
                            to={`game/${game.id}`}
                        >
                            <ListItemText
                                primary={game.name}
                                secondary={game.yearpublished}
                            />
                            <ListItemSecondaryAction
                                onClick={() => addBggGame(game)}
                            >
                                <IconButton aria-label="Delete">
                                    <NoteAddIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                ContentProps={{
                    'aria-describedby': 'message-id'
                }}
                message={<span id="message-id">Note archived</span>}
                action={[
                    <Button
                        key="undo"
                        color="secondary"
                        size="small"
                        onClick={handleSnackbarClose}
                    >
                        Go to Collection
                    </Button>,
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={handleSnackbarClose}
                    >
                        <CloseIcon />
                    </IconButton>
                ]}
            />
        </div>
    );
}
