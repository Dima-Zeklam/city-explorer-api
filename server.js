'use strict';

const express = require('express');
require('dotenv').config;
const cors = require('cors');
const weather = require('./data/weather.json');

const server = express();
const PORT = process.env.PORT || 3002;
server.use(cors());



server.get('/', (req, res) => {
    res.send('no error, you in home page');

});

class forcast {
    constructor(element) {
        this.date = element.valid_date;
        this.description = element.weather.description;
 
    }
}

class Movie {
    constructor(item) {
        this.title = item.title;
        this.overview = item.overview;
        this.average_votes = item.vote_average;
        this.total_votes = item.vote_count;
        this.image_url = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
        this.popularity = item.popularity;
        this.released_on = item.release_date;

    }
}

//localhost:3002/weather?searchQuery=amman
server.get('/weather', (req, res) => {

    //https://api.weatherbit.io/v2.0/forecast/daily?key=pk.cee886669f45d2dab9b093f5c7f8817b&searchQuery=amman
//localhost:3002/weather?searchQuery=amman&lat=31&lon=35
    let cityName = req.query.searchQuery;
    let lat = req.query.lat;
    let lon = req.query.lon;
    let WitherUrl =`https://api.weatherbit.io/v2.0/forecast/daily?key=pk.cee886669f45d2dab9b093f5c7f8817b&days=7&lat=31.9539&lon=35.9106&city=${cityName}`;
    try {
        axios.get(WitherUrl).then(weather => {
            let weatherData = weather.data.data.map(element => {
                 return new forcast(element);
    });
    console.log('wetherData is ',weatherData);
 
        })
        console.log(forcastArr);
        res.send(forcastArr);
    } catch (error) {
        return res.status(500).send('this city is not found');
    }
});

server.get('/movie', (req, res) => {


//https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${cityName}

        let cityMovieName = req.query.query;
        console.log('cityName is ',cityMovieName);
        let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityMovieName}`;
        try{
        axios.get(movieUrl).then(movie => {
            let movieData = movie.data.results.map(item=>{
                return new Movie(item);
         
            })
            res.send(movieData);
            
        });
        
        console.log('movieData is ',movieData);
           
        } catch (error) {
            return res.status(404).send('not found');
        }
    });



server.get('*', (req, res) => {
    res.status(400).send('error: Something went wrong.');

});

server.listen(PORT, () => {
    console.log('Lisining to the port ' + PORT);
});
