import { Sequelize, DataTypes } from 'sequelize';
import express from 'express';

const app = express();
const port = 8000;
const address = 'http://localhost:8000/';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:'
});
const URLS = sequelize.define('URLS', {
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shorted: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
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
    try {
        const result = await URLS.create({ url, shorted, expiresAt: new Date(Date.now() + 60 * 60 * 1000) });
        res.json({url: `${ address + result.shorted }`});
    } catch (error) {
        res.status(500).json({ error: 'Ocorreu um erro ao encurtar a URL' });
    }
});

app.get('/:short', (req, res) => {
    res.redirect('https://www.google.com');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});