const express = require('express');
const port = 3000;

// create server
const server = express();

server.listen(port, () => console.log(`Server listen on ${port} port`));

// use express.static midleware
server.use(express.static('public'));

// для того чтобы сервер мог принимать POST запросы с json, необходимо использовать 
// мидлварь express.json
server.use(express.json());

server.post('/api/geo', (req, res) => {
    console.log(req.body);
    res.json(req.body);
});