'use strict';

const express = require('express');
require('dotenv').config;
const cors = require('cors');
const weather = require('./data/weather.json');

const server = express();
const PORT = process.env.PORT || 3001;
server.use(cors());


server.listen(PORT, () => {
    console.log('Lisining to the port ' + PORT);
});

server.get('/', (req, res) => {
    res.send('no error, you in home page');

});


// server.get('/weather', (req, res) => {
//     res.send('set the city name');
// });

server.get('/weather', (req, res) => {
    try {
        
   
    let cityName = req.query.city;
    let weatherData = weather.find(item => {
        if (item.city_name.toLowerCase() === cityName.toLowerCase())
            return item;
            });
       console.log(weatherData.city_name);

    //    if(weatherData.city_name.toLowerCase !== 'amman' ||weatherData.city_name.toLowerCase !== 'paris')
    //    return res.status(404).send('not found');
    //    else
    res.send(weatherData);
} catch (error) {
    return res.status(500).send('this city is not found');
}
});