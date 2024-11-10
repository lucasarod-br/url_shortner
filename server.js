import app from './app.js';

const port = process.env.PORT || 8000;
const address = process.env.BASE_URL || `http://localhost:${port}/`;

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at ${address}`);
    });
}