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
