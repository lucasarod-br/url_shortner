const express = require('express');

const app = express();
const port = 8000;

app.post('/shorten-url', (req, res) => {
    url = req.body.url;
    res.send('Shortened URL: http://localhost:8000/abc123');
});

app.get('/:short', (req, res) => {
    res.redirect('https://www.google.com');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});