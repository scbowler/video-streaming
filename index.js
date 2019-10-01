const express = require('express');
const { resolve } = require('path');
const axios = require('axios');
const PORT = process.env.PORT || 9000;
const googleConfig = require('./config/google');

const app = express();

app.use(express.static(resolve(__dirname, 'public')));

app.get('/api/test', (req, res) => {
    res.send({
        message: 'Test endpoint response'
    });
});

app.get('/auth', (req, res) => {
    const url = `https://accounts.google.com/o/oauth2/auth?client_id=${googleConfig.clientId}&redirect_uri=http%3A%2F%2Flocalhost%3A9000%2Fauth%2Fgoogle&scope=https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.upload&response_type=code&access_type=offline`;

    res.redirect(url);
});

app.get('/auth/google', async (req, res) => {
    const { code } = req.query;
    
    try {
        const resp = await axios.post('https://accounts.google.com/o/oauth2/token', postData({
            code,
            client_id: googleConfig.clientId,
            client_secret: googleConfig.clientSecret,
            redirect_uri: 'http://localhost:9000/auth/google',
            grant_type: 'authorization_code'
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const { access_token, refresh_token } = resp.data;


        res.redirect(`/?access_token=${access_token}&refresh_token=${refresh_token}`);
    } catch(err){
        console.log('Auth Error:', err);
        res.status(500).send('It broke');
    }
});

app.get('/auth/final', async (req, res) => {
    console.log('Query:', req.query);
    console.log('Headers:', req.headers);

    res.redirect('/');
});

app.listen(PORT, () => {
    console.log('Server Listening @ localhost:%d', PORT);
});

function postData(obj){
    const params = new URLSearchParams();

    for([k, v] of Object.entries(obj)){
        params.append(k, v);
    }

    return params;
}
