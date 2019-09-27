const express = require('express');
const { resolve } = require('path');
const PORT = process.env.PORT || 9000;

const app = express();

app.use(express.static(resolve(__dirname, 'public')));

app.get('/auth', (req, res) => {
    const url = `https://accounts.google.com/o/oauth2/auth?
        client_id=&
        redirect_uri=http%3A%2F%2Flocalhost%2Foauth2callback&
        scope=https://www.googleapis.com/auth/youtube&
        response_type=code&
        access_type=offline`;


    res.redirect(url);
});

app.get('/auth/google', (req, res) => {
    console.log('Query:', req.query);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);

    res.redirect('/');
});

app.listen(PORT, () => {
    console.log('Server Listening @ localhost:%d', PORT);
});
