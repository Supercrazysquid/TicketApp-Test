// Requires:
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const mongoClient = mongodb.MongoClient;
const app = express();

const configPath = path.join(__dirname, 'config.json');

// Create config file
if (!fs.existsSync(configPath)) {
    console.log('Creating config file...');

    fs.writeFileSync(configPath, JSON.stringify({
        port: 3000,
        db: {
            host: 'localhost',
            port: 27017,
            database: 'test',
            username: '',
            password: ''
        }
    }));
};

// Load config file
const config = require(configPath);
