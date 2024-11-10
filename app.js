// app.js
import 'module-alias/register.js';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import sequelize from './src/config/database/db.js';
import urlRoutes from './src/routes/urlRoutes.js';

const app = express();

sequelize.sync();

app.use(express.json());
app.use('/', urlRoutes);

export default app;