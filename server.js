'use strict';

const express = require('express');
require('dotenv').config;
const cors = require('cors');
const weather = require('./data/weather.json');

const server = express();
const PORT = process.env.PORT || 3001;
server.use(cors());



server.get('/', (req, res) => {
    res.send('no error, you in home page');

});

class forcast {
    constructor(item) {
        this.date = item.valid_date;
        this.description = item.weather.description;
 
    }
}



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
    res.status(400).send(' not found');

});

server.listen(PORT, () => {
    console.log('Lisining to the port ' + PORT);
});