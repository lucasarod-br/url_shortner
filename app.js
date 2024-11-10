import { Sequelize, DataTypes } from 'sequelize';
import express from 'express';

const app = express();
const port = 8000;
const address = 'http://localhost:8000';


const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:'
});
const URLS = sequelize.define('URLS', {
  url: DataTypes.STRING,
  shorted: DataTypes.STRING,
  expiresAt: DataTypes.DATE
});

sequelize.sync();

app.use(express.json());

app.post('/shorten-url', async (req, res) => {
    const { url } = req.body;
    const generateShortCode = (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
    };

    const shorted = generateShortCode(Math.floor(Math.random() * 6) + 5);
    const result = await URLS.create({ url, shorted, expiresAt: new Date(Date.now() + 60 * 60 * 1000) });
    res.json({url: `${ address }/${ result.shorted }`});
});
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