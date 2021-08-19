'use strict';
require('dotenv').config();
const axios = require('axios');
const express = require('express');

const cors = require('cors');
// const weather = require('./data/weather.json');


const server = express();
const PORT = process.env.PORT;
server.use(cors());



function homePage(req, res) {
    res.send('no error, you in home page');
}


class forcast {
    constructor(element) {
        this.date = element.valid_date;
        this.description = element.weather.description;

    }
}


class movie {
    constructor(dataItem) {
        this.title = dataItem.title;
        this.overview = dataItem.overview;
        this.average_votes = dataItem.vote_average;
        this.total_votes = dataItem.vote_count;
        this.image_url = `https://image.tmdb.org/t/p/w500${dataItem.poster_path}`;
        this.popularity = dataItem.popularity;
        this.released_on = dataItem.release_date;

    }
}


console.log(process.env.WEATHER_API_KEY);
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

let getMovieData = (req, res) => {


    //https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${cityName}
//https://api.themoviedb.org/3/search/movie?api_key=3e93ed962f0f458c5c241108f065a8ec&query=amman

    let cityMovieName= req.query.city;
    console.log('cityName is ', cityMovieName);
    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityMovieName}`;
    try {
        axios.get(movieUrl).then(ele => {
            let movieData = ele.data.results.map(item => {

                return new movie(item);

            })
            res.send(movieData);

            console.log('movie is ', movieData);
        });




    } catch (error) {
        return res.status(404).send('not found');
    }
}



// server.get('*', (req, res) => {
//     res.status(400).send('error: Something went wrong.');

// });

server.get('/', homePage);
server.get('/weather', getWetherData);
server.get('/movie', getMovieData);

server.listen(PORT, () => {
    console.log('Lisining to the port ' + PORT);
});
