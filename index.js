const express = require('express');
const { resolve } = require('path');
const PORT = process.env.PORT || 9000;

const app = express();

app.use(express.static(resolve(__dirname, 'public')));


app.listen(PORT, () => {
    console.log('Server Listening @ localhost:%d', PORT);
});
