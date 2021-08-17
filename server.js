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

server.get('/movie', (req, res) => {


//https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${cityName}

        let cityName = req.query.searchQuery;
        let lat = req.query.lat;
        let lon = req.query.lon;
        let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${cityName}`;
        try{
        axios.get(movieUrl).then(movie => {
            let movieData = movie.data.results.map(item=>{
          let movieCity = new Movie(item);
             return movieCity;
            })
            res.send(movieData);
     
        });
        console.log('wetherData is ',weatherData);
            console.log(forcastArr);
           
        } catch (error) {
            return res.status(500).send('ERROR');
        }
    });



server.get('*', (req, res) => {
    res.status(400).send('error: Something went wrong.');

});

server.listen(PORT, () => {
    console.log('Lisining to the port ' + PORT);
});