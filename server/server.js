const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log("Server is running on port " + port);
});

// Access example.com/
app.get('/', (req, res) => {
    res.send("I love HackSchool.");
});

app.get('/memes', (req, res) => {
    res.sendFile(__dirname + 'htmlStructure/index.html');
});

app.get('*', (req, res) => {
    res.status(404).sendFile(__dirname + '/error.html');
});