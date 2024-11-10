import request from 'supertest';
import URLS from '../src/models/URLS';
import app from '../app';
import dotenv from 'dotenv';
import sequelize from '../src/config/database/db.js';

dotenv.config();


beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterEach(async () => {
    await URLS.destroy({ where: {} });
});

afterAll(async () => {
    await sequelize.close();
});


describe('URL Shortener API', () => {
    it('should shorten a URL', async () => {
        const response = await request(app)
            .post('/shorten-url')
            .send({ url: 'http://example.com' });
        expect(response.status).toBe(200);
        expect(response.body.url).toMatch(new RegExp(`${process.env.BASE_URL}[A-Z0-9]{5,10}`));
    });

    it('should return 404 for non-existent short URL', async () => {
        const response = await request(app).get('/nonexistent');
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('URL não encontrada');
    });

    it('should redirect to the original URL', async () => {
        const shorted = 'ABCDE';
        await URLS.create({ url: 'http://example.com', shorted, expiresAt: new Date(Date.now() + 60 * 60 * 1000) });
        const response = await request(app).get(`/${shorted}`);
        expect(response.status).toBe(302);
        expect(response.header.location).toBe('http://example.com');
    });

    it('should return 404 for expired URL', async () => {
        const shorted = 'EXPIRED';
        await URLS.create({ url: 'http://example.com', shorted, expiresAt: new Date(Date.now() - 60 * 60 * 1000) });
        const response = await request(app).get(`/${shorted}`);
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('URL expirada');
    });
});