var express = require('express');
var router = express.Router();
var posts = require('../db.json');
var request = require("request");

router.get('/:id', function(req, res, next) {
    //make a post request to our database
    request({
    uri: "http://localhost:8000/posts/" + req.params.id,
    method: "GET",
    }, function(error, response, body) {
        console.log(JSON.parse(body));
        //send a response message
        res.render('views', {posts: JSON.parse(body)});
    });
 });

  module.exports = router;