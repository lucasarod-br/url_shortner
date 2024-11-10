// src/routes/urlRoutes.js
import express from 'express';
import { shortenUrl, redirectUrl } from '../controllers/urlController.js';

const router = express.Router();

router.post('/shorten-url', shortenUrl);
router.get('/:short', redirectUrl);

export default router;