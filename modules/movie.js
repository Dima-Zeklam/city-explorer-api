'use strict';

const axios = require('axios');

class movie {
    constructor(dataItem) {
        this.title = dataItem.title;
        this.overview = dataItem.overview;
        this.average_votes = dataItem.vote_average;
        this.total_votes = dataItem.vote_count;
        // this.image_url = 'https://image.tmdb.org/t/p/w500' ;
        this.popularity = dataItem.popularity;
        this.released_on = dataItem.release_date;
        this.poster_path = dataItem.poster_path;

    }
}

let getMovieData = (req, res) => {


    //https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${cityName}
    //https://api.themoviedb.org/3/search/movie?api_key=3e93ed962f0f458c5c241108f065a8ec&query=amman

    let cityMovieName = req.query.city;
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

module.exports = getMovieData;
