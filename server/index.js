// Requires:
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

let mongoClient = null;
const app = express();

const configPath = path.join(__dirname, 'config.json');

// Create config file
if (!fs.existsSync(configPath)) {
	console.log('Creating config file...');

	fs.writeFileSync(configPath, JSON.stringify({
		port: 3000,
		mongodb: {
			hostname: 'localhost:27017',
			username: 'username',
			password: 'password',
			database: 'database'
		}
	}));
};

// Load config file
const config = require(configPath);

// Connect to mongodb
async function connectMongo() {
	let url = `mongodb://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.hostname}/${config.mongodb.database}`;
	
	mongoClient = new mongodb.MongoClient(url, { useNewUrlParser: true });
	
	console.log('Connecting to mongodb with url: ' + url);

	mongoClient.connect((err, db) => {
		if(err) throw err;

		console.log('Connected to mongodb');

		console.log('Checking if users collection exists...');

		db.listCollections({ name: 'users' }).toArray((err, collections) => {
			if(err) {
				console.log('Attempting to create collection...');

				db.createCollection('users', (err, res) => {
					if(err) throw err;
				});
			}
		});

		db.close();
	});
}

connectMongo();
