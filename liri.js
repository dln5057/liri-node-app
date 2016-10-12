var fs = require('fs');
var request = require('request');
var keys = require('./keys.js');

var action = process.argv[2];
// function run(action){
  switch(action){
    case 'my-tweets':
          tweets();
      break;

      case 'spotify-this-song':
          spotify();
      break;

      case 'movie-this':
          movie();
      break;

      case 'do-what-it-says':
          doIt();
      break;
  }
// }
function tweets(){
  var Twitter = require('twitter');
  var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
  });
  var params = {screen_name: 'deeej11', count: 20 };
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      // console.log(tweets);
      var count = 1
      for(var i = 0; i < tweets.length; i++){
        console.log("Tweet #: " + count);
        console.log("Created: " + tweets[i].created_at);
        console.log("Tweet text: " + tweets[i].text);
        console.log("\n----------------\n");
        count++
      }
    }
  });
}

function spotify(){
  var SpotifyWebApi = require('spotify-web-api-node');
  var spotifyApi = new SpotifyWebApi({
  clientId : keys.spotifyKeys.clientId,
  clientSecret : keys.spotifyKeys.clientSecret,
  redirectUri : keys.spotifyKeys.redirectUri
  });
  var songName = process.argv;
  var songTrack =  "";
  for(var i = 3; i < songName.length; i++){
    songTrack = songTrack + " " + songName[i];
  }
  console.log("This is the full song " + songTrack);
  spotifyApi.searchTracks(songTrack).then(function(data) {
    // console.log('Search by ' + songName, data.body);
    console.log("Artist Name: " + data.body.tracks.items[0].artists[0].name)
    console.log("Album Name: " + data.body.tracks.items[0].album.name)
    console.log("Song Name: " + data.body.tracks.items[0].name);
    console.log("Preview Link: " + data.body.tracks.items[0].preview_url);
  }, function(err) {
    console.error(err);
  });
}

function movie(){
  var APIClinet = require('omdb-api-client');
  var omdb = new APIClinet();
  var action = process.argv[3];
  var queryUrl = 'http://www.omdbapi.com/?t=' + action +'&y=&plot=short&r=json';
  request(queryUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("Movie Title: " + JSON.parse(body)["Title"]);
      console.log("Year: " + JSON.parse(body)["Year"]);
      console.log("Movie Rating: " + JSON.parse(body)["Rated"]);
      console.log("Country Produced: " + JSON.parse(body)["Country"]);
      console.log("Language: " + JSON.parse(body)["Language"]);
      console.log("Plot: " + JSON.parse(body)["Plot"]);
      console.log("Actors: " + JSON.parse(body)["Actors"]);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["imdbRating"]);
      console.log("Rotten Tomatoes URL: " + JSON.parse(body)["Year"]);
    };
  });
};

function doIt(){
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);

    var dataArr = data.split(', ');

    console.log(dataArr)

    for(var i =0; i < dataArr.length; i++){
      console.log(dataArr[i]);

      action = dataArr[i];

    
    }
  });
}