// src/controllers/urlController.js
import URLS from '../models/URLS.js';

export const shortenUrl = async (req, res) => {
    const { url } = req.body;
    const generateShortCode = (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
    };

    const shorted = generateShortCode(Math.floor(Math.random() * 6) + 5);
    try {
        const result = await URLS.create({ url, shorted, expiresAt: new Date(Date.now() + 60 * 60 * 1000) });
        res.json({ url: `${process.env.BASE_URL}${result.shorted}` });
    } catch (error) {
        res.status(500).json({ error: 'Ocorreu um erro ao encurtar a URL' });
    }
};

export const redirectUrl = async (req, res) => {
    const { short } = req.params;
    try {
        const result = await URLS.findOne({ where: { shorted: short } });
        if (!result) {
            return res.status(404).json({ error: 'URL não encontrada' });
        }
        if (result.expiresAt < new Date()) {
            return res.status(404).json({ error: 'URL expirada' });
        }
        res.status(302).redirect(result.url);
    } catch (error) {
        res.status(500).json({ error: 'Ocorreu um erro ao buscar a URL' });
    }
};