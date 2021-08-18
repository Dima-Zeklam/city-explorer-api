'use strict';

const express = require('express');
require('dotenv').config;
const cors = require('cors');
const weather = require('./data/weather.json');

const server = express();
const PORT = process.env.PORT || 3001;
server.use(cors());



server.get('/', (req, res) => {
    res.send('ALL GOOD');

});

class forcast {
    constructor(item) {
        this.date = item.valid_date;
        this.description = item.weather.description;
 
    }
}

//MOVIE_API_KEY
// https://api.themoviedb.org/3/movie/550?api_key=3e93ed962f0f458c5c241108f065a8ec


server.get('/weather', (req, res) => {

//localhost:3001/weather?searchQuery=amman&lat=31&lon=35
    let cityName = req.query.searchQuery;
    let lat = req.query.lat;
    let lon = req.query.lon;
    let weatherData = weather.find(item => {
        if (item.city_name.toLowerCase() === cityName.toLowerCase())
            return item;
    });
    console.log('wetherData is ',weatherData);
    try {
        let forcastArr = weatherData.data.map(ele => {
            return new forcast(ele);
        })
        console.log(forcastArr);
        res.send(forcastArr);
    } catch (error) {
        return res.status(500).send('this city is not found');
    }
});


server.get('*', (req, res) => {
    res.status(400).send('error: Something went wrong.');

});

server.listen(PORT, () => {
    console.log('Lisining to the port ' + PORT);
});