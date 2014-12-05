var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://aqueous-beach-2788.herokuapp.com";
}

var _showError = function (req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Oh dear. Looks like we can't find this page. Sorry.";
  } else {
    title = status + ", something's gone wrong";
    content = "Something, somewhere, has gone just a little bit wrong.";
  }
  res.status(status);
  res.render('generic-text', {
    title : title,
    content : content
  });
};


/* GET 'home' page */
var renderHomepage = function(req, res, responseBody) {
  res.render('homepage', { 
    title: 'Dracula Dossier Clue Map',
    pageHeader: {
      title: 'Dracula Dossier Clue Map',
      strapline: 'See the collected additional clues sent to high level backers.'
    },
    mapCentre: {
      lat: 51.5322,
      lng: -0.1567
    },
    mapZoom: 11,
    clues: responseBody /*[{
      lat: 51.536943,
      lng: -0.121683,
      text: "Hello Laurel, They're after me. I'll send you a postcard every few days - if a week goes by without one, publish what I gave you. Say hello to an easy one for a girl with news. -51.536943, -0.121683 Jonni",
      imageURL: "https://plus.google.com/u/0/114869894166442852870/posts/adQdY8BdEvh?pid=6088917931632336018&oid=114869894166442852870"
    },{
      lat: 51.557344,
      lng: -0.181939,
      text: "Hey there, The things S. has seen. His sister was taken by one of them. They've been hunting her ever since. 51.557344, -0.181939 Jenni (could be Lonni)"
    },{
      lat: 51.592260,
      lng: -0.227689,
      text: "Wish you were here. Here we go. Dropping this into a postbox so you'll know where we were. 51.592260,-0.227689",
      imageURL: "http://imgur.com/a/Wim49"
    },{
      lat: 51.532200,
      lng: 0.015893,
      text: "Hi Laurel, Delivery van - Axel Logistics. Called at one of the false fronts. Heavy boxes. 51.532200, 0.015893 Jonni",
      imageURL: "http://imageshack.com/a/img538/2883/yIMZ6k.jpg"
    },{
      lat: 51.512430,
      lng: -0.384923,
      text: "Hey! Found German driving license in glovebox. S's photo. But no S's name on it. Can you check out the name Wilhelm Krieder? 51.512430, -0.384923 (roughly)"
    },{
      lat: 51.494955,
      lng: -0.378542,
      text: "Heya, M. says that we should wait for S. to show up. Wants to go back to their place again. More scared now than he was at the churchyard. 51.494955, -0.378542"
    },{
      lat: 51.591627,
      lng: -0.224063,
      text: "Wish you were here. Scouting the nest. Writing this by the light of my phone. Cold and I miss you. I want to come home.51.591627, -0.224063 Jonni"
    },{
      lat: 51.470073,
      lng: -0.356846,
      text: "[Heyz]. Dropping this before I go. Got a gad feeling about this. Starting south. 51.470073, -0.356846"
    },{
      lat: 51.470557,
      lng: -0.357651,
      text: "Heya Laurel, Car prowling around outside. Swear I know the driver. Was he at PINDAR? 51.470557, -0.357651 Jonni"
    },{
      lat: 51.5139258,
      lng: -0.0787431,
      text: "The message was addressed to 'Haley' and said, if I recall correctly, that there were things underground, but that not everything underground could stay buried."
    }]*/
  });
};

module.exports.homelist = function(req, res){
  var requestOptions, path;
  path = '/api/clues';
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {},
    qs : {}
  };
  console.log(requestOptions.url);
  request(
    requestOptions,
    function(err, response, body) {
      var data = body;
      if (response.statusCode === 200) {
        renderHomepage(req, res, data);
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
}


/* GET 'Add clue' page */
var renderClueForm = function(req, res) {
  res.render('clue-form', {
    title: 'Add a new clue',
    pageHeader: { title: 'Add clue' },
    error: req.query.err
  });
};

module.exports.addClue = function(req, res){
  renderClueForm(req, res);
}

module.exports.doAddClue = function(req, res){
  var requestOptions, path, postdata;
  path = "/api/clues";
  postdata = {
    lat: req.body.lat,
    lng: req.body.lng,
    text: req.body.clue,
    imageURL: req.body.imageURL
  };
  if (!postdata.lat || !postdata.lng || !postdata.text) {
    res.redirect('/clue/new?err=val');
  } else {
    requestOptions = {
      url : apiOptions.server + path,
      method : "POST",
      json : postdata
    };
    request(
      requestOptions,
      function(err, response, body) {
        if (response.statusCode === 201) {
          res.redirect('/');
          
        } else if (response.statusCode === 400 && body.name && body.name === "ValidationError" ) {
          res.redirect('/clue/new?err=val');
          
        } else {
          _showError(req, res, response.statusCode);
        }
      }
    );
  }
}