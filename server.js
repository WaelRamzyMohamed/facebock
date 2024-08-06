const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware to parse JSON and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Angular App Hosting Production Build
app.use(express.static(__dirname + '/'));

// For all GET requests, send back index.html (PathLocationStrategy) (Refresh Error)
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// POST route to handle incoming data
app.post('/submit', (req, res) => {
    const postData = req.body;
    const dataToWrite = JSON.stringify(postData, null, 2); // Format the data as JSON

    // Write data to a text file
    fs.appendFile('postData.txt', dataToWrite, (err) => {
        if (err) {
            console.error('Error writing to file', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send('Data received and written to file');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
