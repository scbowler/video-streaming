const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const BC_URL = BASE_URL + '/liveBroadcasts';
const LS_URL = BASE_URL + '/liveStream';
const PART = 'part=id%2Csnippet%2CcontentDetails%2Cstatus';
const monitor = document.getElementById('monitor');

async function createStream(){
    try {
        const accessToken = getAccessToken();

        const resp = await axios.post(`${LS_URL}?${PART}`, {
            snippet: {
                title: 'Test Stream 1'
            },
            cdn: {
                frameRate: 'variable',
                ingestionType: 'dash',
                resolution: 'variable'
            }
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        console.log('Create Stream Response:', resp);
    } catch(err) {
        console.log('Error creating stream:', err);
    }
}

async function createBroadcast(){
    try {
        const accessToken = getAccessToken();

        const resp = await axios.post(`${BC_URL}?${PART}`, {
            snippet: {
                scheduledStartTime: new Date('10/1/2019 16:00').toISOString(),
                title: 'Live Session Broadcast Test October 1st #3'
            },
            status: {
                privacyStatus: 'unlisted'
            }
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        monitor.innerHTML = resp.data.contentDetails.monitorStream.embedHtml;

        console.log('Create Response:', resp.data);
    } catch(err){
        console.log('Request Failed:', err);
    }
}

async function listBroadcasts(){
    try {
        const accessToken = getAccessToken();

        console.log('Access Token:', accessToken);

        const resp = await axios.get(`${BC_URL}?${PART}&mine=true`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        console.log('Broadcast List:', resp);
    } catch(err) {
        console.log('Get List Failed:', err);
    }
}
