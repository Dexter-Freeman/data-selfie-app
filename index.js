const express = require('express');
const mongoose = require('mongoose');

const port = 3000;

// create server
const server = express();

// Connect to database
mongoose.connect('mongodb+srv://dexter:test@cluster0-e8drk.mongodb.net/test?retryWrites=true&w=majority', 
  { useNewUrlParser: true, useUnifiedTopology: true });

const geoSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    timestamp: Date
});

// Create model
const Geo = mongoose.model('Geo', geoSchema);


server.listen(port, () => console.log(`Server listen on ${port} port`));

// use express.static midleware
server.use(express.static('public'));

// для того чтобы сервер мог принимать POST запросы с json, необходимо использовать 
// мидлварь express.json
server.use(express.json());

server.post('/api/geo', (req, res) => {
  const data = req.body;
  data.timestamp = Date.now();
  Geo(data).save((err, data) => {
    if (err) throw err;
    console.log('pushed data from mongoDB ', data);
    res.json(data);
  });
  console.log(data);
  // res.json(req.body);
});