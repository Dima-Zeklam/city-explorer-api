'use strict';
require('dotenv').config();
const axios = require('axios');
const express = require('express');

const cors = require('cors');
const getWetherData = require('./modules/weather.js');
const getMovieData = require('./modules/movies.js');
// const weather = require('./data/weather.json');


const server = express();
const PORT = process.env.PORT;
server.use(cors());



function homePage(req, res) {
    res.send('no error, you in home page');
}


server.get('/', homePage);
server.get('/weather', getWetherData);
server.get('/movie', getMovieData);

server.listen(PORT, () => {
    console.log('Lisining to the port ' + PORT);
});
