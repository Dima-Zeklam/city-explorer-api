'use strict';
require('dotenv').config();
const axios = require('axios');

class forcast {
    constructor(element) {
        this.date = element.valid_date;
        this.description = element.weather.description;

    }
}


let getWetherData = (req, res) => {


    //https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=amman
    //localhost:3002/weather?city=amman

      let  cityName = req.query.city
   
    // let lat = req.query.lat;
    // let lon = req.query.lon;
    console.log(cityName);
    let WitherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&days=7&lat=31.9539&lon=35.9106&city=${cityName}`;

    try {
        axios.get(WitherUrl).then(item => {
            let weatherData = item.data.data.map(element => {
                return new forcast(element);

            });
            console.log(weatherData);
            res.send(weatherData);
        })


    } catch (error) {
        return res.status(500).send('this city is not found');
    }
}

module.exports = getWetherData;