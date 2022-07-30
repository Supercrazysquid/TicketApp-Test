const fs = require('fs');

// Create config file
if (!fs.existsSync('./config.json')) {
    fs.writeFileSync('./config.json', JSON.stringify({
        port: 3000,
        db: 'mongodb://localhost/test'
    }));
});