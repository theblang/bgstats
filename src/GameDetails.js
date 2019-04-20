import React, { useEffect, useState } from 'react';
import { IconButton } from '@material-ui/core';
import SyncIcon from '@material-ui/icons/Sync';
import uuidv3 from 'uuid/v3';
import uuidNamespaces from './uuidNamespaces';
import xmljs from 'xml-js';
import localforage from 'localforage';

export default function GameDetails({ match }) {
    const id = match.params.id;
    const [gameDetails, setGameDetails] = useState({});

    useEffect(() => {
        async function loadGameDetails() {
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

    async function syncDetailsFromBgg() {
        // See https://boardgamegeek.com/wiki/page/BGG_XML_API2#toc1
        // See https://boardgamegeek.com/xmlapi2/thing?id=68448
        const syncUrl = new URL('https://boardgamegeek.com/xmlapi2/thing');
        syncUrl.search = new URLSearchParams({ id });

        // This works, but let's just read from a real search stored in a test file for now to minimize requests to BGG
        // const response = await fetch(syncUrl);
        // const xmlResponse = await response.text();
        // const jsonResponse = xmljs.xml2js(xmlResponse, { compact: true });
        // const gameDetails = jsonResponse.items.item;

        // FIXME: Temporary
        const response = await fetch('/7wondersthing.json');
        const jsonResponse = await response.json();
        const gameDetails = jsonResponse;

        setGameDetails(gameDetails);
    }

    return (
        <div>
            <span>Game Details for {id}</span>
            <IconButton aria-label="Sync" onClick={() => syncDetailsFromBgg()}>
                <SyncIcon />
            </IconButton>
        </div>
    );
}
