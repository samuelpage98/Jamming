let accessToken = undefined;
let expiresIn = undefined;

const clientId = 'b7215b395983485481ca6756db692e65';
//const redirectUri = 'http://localhost:3000/';
const redirectUri = "http://jammm1ng.surge.sh/";


const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken
        } 
        const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
        if (urlAccessToken && urlExpiresIn) {
            accessToken = urlAccessToken[1];
            expiresIn = urlExpiresIn[1];
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public%20user-read-private&redirect_uri=${redirectUri}`
        }   
    },

    async search(term) {
        return fetch(
            `https://api.spotify.com/v1/search?type=track&q=${term}`,
            {headers: { 
              Authorization: 'Bearer ' + accessToken,
            }}
        ) 
        .then(response => {return response.json()})
        .then(jsonResponse => {
            if (!jsonResponse.tracks) return [];
            return jsonResponse.tracks.items.map(track => {
                return {
                 id: track.id,
                 name: track.name,
                 artist: track.artists[0].name,
                 album: track.album.name,
                 uri: track.uri 
                }   
            })
            
        })
    },

    async savePlaylist(playlistName, trackUris) {
        if (!playlistName || !trackUris || trackUris.length === 0) return;
        let userId = undefined;
        let playlistId = undefined;
        return fetch(
            'https://api.spotify.com/v1/me',
            {headers: {Authorization: `Bearer ${accessToken}`}}
        )
        .then(response => {return response.json()})
        .then(jsonResponse => {return userId = jsonResponse.id})
        .then(() => {
            return fetch(
                `https://api.spotify.com/v1/users/${userId}/playlists`,
                {
                    method: 'POST',
                    headers: { Authorization: 'Bearer ' + accessToken},
                    body: JSON.stringify({
                        name: playlistName
                    })
                }
            )
        })
        .then(response => {return response.json()})
        .then(jsonResponse => {return playlistId = jsonResponse.id})
        .then(() => {
            return fetch(
                `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                {
                    method: 'POST',
                    headers: { Authorization: 'Bearer ' + accessToken},
                    body: JSON.stringify({
                        uris: trackUris
                    })
                }
            )
        })
    }
};

export default Spotify;