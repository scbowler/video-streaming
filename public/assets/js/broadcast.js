createBroadcast();

const BASE_URL = 'https://www.googleapis.com/youtube/v3/liveBroadcasts'

async function createBroadcast(){
    try {
        const accessToken = getAccessToken();

        const resp = await axios.get('/api/test');

        console.log('Test Response:', resp.data);
    } catch(err){
        console.log('Request Failed:', err);
    }
}

async function listBroadcasts(){
    try {
        const accessToken = getAccessToken();

        console.log('Access Token:', accessToken);

        const resp = await axios.get(BASE_URL + '?part=id%2Csnippet%2CcontentDetails%2Cstatus&mine=true', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });


        console.log('Broadcast List:', resp);
    } catch(err) {
        console.log('Get List Failed:', err);
    }
}
