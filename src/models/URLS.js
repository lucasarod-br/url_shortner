
import { DataTypes } from 'sequelize';
import sequelize from '../config/database/db.js';

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

export default URLS;