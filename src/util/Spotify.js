let userToken;
const client_id = 'c3c1d516aea14d84a819b04108c6f6cb';
const redirect_uri = 'http://localhost:3000/';

const Spotify = {
    getAccessToken(){
        if (userToken) {
            console.log(1);
            return userToken;
        }

        const accessToken = window.location.href.match(/access_token=([^&]*)/);
        const expired = window.location.href.match(/expires_in=([^&]*)/);

        if (accessToken && expired) {
            userToken=accessToken[1];
            console.log(expired);
            
            const expiredIn = Number(expired[1]);

            window.setTimeout(()=> userToken='', expiredIn*1000);
            window.history.pushState('Access Token', null, '/');
            return userToken;
        } else {
            console.log(3);
            let url = 'https://accounts.spotify.com/authorize';
            url += '?response_type=token';
            url += '&scope=playlist-modify-public'
            url += '&client_id=' + client_id;
            url += '&redirect_uri=' + redirect_uri;
            
            window.location=url;

                        
        }

    },
    search(term){
        let url = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        const accessToken = Spotify.getAccessToken();
        return fetch(url,{headers:{
            Authorization: `Bearer ${accessToken}`
        }}).then(response => {
            return response.json();
        }, networkError => console.log(networkError.message))
        .then(jsonResponse => {
            console.log(jsonResponse);
        })
    }
};

export default Spotify;