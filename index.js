const express = require('express');
const port = 3000;

// create server
const server = express();

server.listen(port, () => console.log(`Server listen on ${port} port`));

// use express.static midleware
server.use(express.static('public'));