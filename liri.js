require("dotenv").config();
var keys = require("./keys.js");
var spotify = (keys.spotify.id);
// console.log(spotify)
var newBand = process.argv;
var mediaAction = process.argv[2]
var axios = require("axios");
//var file = require('file-system');
var fs = require("fs");

// if 
//  (process.argv[3] = "concert-this")\
// "spotify-this-song"
// "movie-this"
// //  .then(function(response)



if (mediaAction === "concert-this") {
  bandInfo();
}

if (mediaAction === "spotify-this-song") {
  songInfo();
}

if (mediaAction === "movie-this") {
  movieInfo();
}

if (mediaAction === "do-what-it-says") {
  randomInfo();
}



function bandInfo(){
var urlBase = "https://rest.bandsintown.com/artists/";

// to handle bands with 2+ word names //takes fourth+ item in argument
var bandName = "";

for (var i = 3; i < newBand.length; i++) {
  if (i > 3 && i < newBand.length) {
    bandName = bandName + newBand[i];
  }
  else {
    bandName += newBand[i];
  }
}


//URL
var string = "/events?app_id=";
var fullURL = urlBase + bandName + string + spotify + "request &date=all";
console.log(fullURL)
  

// API Call
var axios = require('axios');
axios
    .get(fullURL)
    .then(function(response)  {
    // console.log(response.data)
    for (var i = 0; i < response.data.length;) {
    console.log(response.data[i++].venue.name);
    console.log(response.data[i++].venue.city);


//Using moment.js to convert date format
    var moment = require('moment');
    moment().format();

    var randomDate = response.data[i++].datetime;
    var randomFormat = "YYYY-MM-DD";
    var convertedDate = moment(randomDate, randomFormat);
    console.log(convertedDate.format("MM/DD/YY"));
    console.log("  ");

    }
    }
    );
}


//same as before
function songInfo(){
  var Spotify = require("node-spotify-api");
  var spotify = new Spotify(keys.spotify);
  var songName = "";
  for (var i = 3; i < newBand.length; i++){
      if (i > 3 && i < newBand.length){
          songName = songName + "+" + newBand[i];
      }
      else{
          songName += newBand[i];
      }
  }
 
  //API call took forever to understand!
  spotify.request('https://api.spotify.com/v1/search?q=track:' + songName + '&type=track&limit=10', function(error, songResponse) 
  
  {   
      // console.log(songResponse.tracks)
      for (var i = 0; i < songResponse.tracks.items.length;) {
      console.log(" ");
      console.log("Artist(s): " + songResponse.tracks.items[i++].artists[0].name);
      console.log("Song: " + songResponse.tracks.items[i++].name);
      console.log("Spotify Link: " + songResponse.tracks.items[i++].preview_url);
      console.log("Album: " + songResponse.tracks.items[i++].album.name);
      console.log("  ");
  }
  
  });
};

  //Attempt to resolve movies with multiple words
  function movieInfo(){
    var movieName = ""

for (var i = 3; i < process.argv.length; i++) {
    if (i > 3 && i < process.argv.length) {
      movieName = process.argv[3] + "%20" + process.argv[4];
    }
    else {
      movieName += process.argv[3];
    }
  }


// OMDB API with the movie specified
var movieUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(movieUrl);

axios.get(movieUrl).then(
  function(response) {
    // console.log(response)
    console.log(" ");
    console.log("Movie Title: " + response.data.Title);
    console.log("Release Year: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[0].Value);
    console.log("Production Country: " + response.data.Country);
    console.log("Language(s): " + response.data.Language);
    console.log("Plot Summary: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
    console.log(" ");

  }
);
}
  


function randomInfo() {


  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }

    data = data.split(",");
    console.log(data);
  });
}






        
