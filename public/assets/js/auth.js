storeAuthTokens();

function storeAuthTokens(){
    const { access_token = null, refresh_token = null } = getQuery();

    if(access_token){
        localStorage.setItem('access_token', access_token);
        location.search = '';
    }

    if(refresh_token){
        localStorage.setItem('refresh_token', refresh_token);
        location.search = '';
    }
}

async function refreshAuthToken(){
    try {
        const refreshToken = getRefreshToken();

        const resp = await axios.post(`/auth/refresh`, {
            refreshToken
        });

        console.log('Refresh Response:', resp);

        const { access_token = null } = resp.data;

        if(!access_token){
            throw new Error('Did not receive access token');
        }

        localStorage.setItem('access_token', access_token);
    } catch(error) {
        console.log('Refresh Token Error:', error);
    }
}

function getQuery(){
    const q = location.search.replace('?', '');

    if(!q){
        return {};
    }

    const query = {};

    q.split('&').forEach(q => {
        const [k, v] = q.split('=');

        query[k] = v;
    });

    return query;
}

function getAccessToken(){
    const accessToken = localStorage.getItem('access_token') || null;

    if (!accessToken) {
        throw new Error('Not signed in, click sign in link');
    }

    return accessToken;
}

function getRefreshToken() {
    const refreshToken = localStorage.getItem('refresh_token') || null;

    if (!refreshToken) {
        throw new Error('Not signed in, no refresh token available, click sign in link');
    }

    return refreshToken;
}
