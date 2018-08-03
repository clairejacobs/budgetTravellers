var express = require('express');
var router = express.Router();
var posts = require('../db.json');
var request = require("request");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Budget Travelling', posts: posts.posts });
});

router.get('/views/:id', function(req, res, next) {
  request({
   uri: "http://localhost:8000/posts/" + req.params.id,
   method: "GET"
  }, function(error, response, body) {
       console.log(JSON.parse(body));


       res.render('readMore', {posts: JSON.parse(body), images: body.image});
       
   });
});

// get new page//
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact', posts: posts.posts });
});

router.get('/loginin', function(req, res, next) {
  res.render('loginin', { title: 'login in'});
});

router.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'Sign in'});
});

router.get('/archive', function(req, res, next) {
  res.render('archive', { title: 'Archives', posts: posts.posts});
});

router.get('/edit', function(req, res, next) {
  res.render('edit', { title: 'Edit'});
});

router.get('/post', function(req, res, next){
  res.render('post',{title: 'New Post'});
});





/* POST new page. */
router.post('/contact', function(req, res, next) {
  // res.send(req.body)

// create variable to posts
let obj ={
  "title": req.body.title,
  "author": req.body.author,
  "datetime": req.body.datetime,
  "content": req.body.content,
}
  //write logic that saves this data
  request.post({
    url:"http://localhost:8000/posts",
    body: obj,
    json: true
  }, function(error , response, body){
    //what to send when function has finished
    // res.redirect('/');
    res.redirect('/');
  });

});

//  get edit page
router.get('/edit/:id', function(req, res, next){
  request({
    url: "http://localhost:8000/posts/"+req.params.id,
    method: "GET",
  }, function(error, response, body){
    res.render("edit", {message: false, posts: JSON.parse(body), title: body.title})
  });
});

router.post("/edit/:id", function(req, res, next){
  console.log(req.params.id);
  request({
    url: "http://localhost:8000/posts/"+req.params.id,
    method: "PATCH",
    form: {
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
      image: req.body.image
    },
    function(error,response,body){
      res.render("index",{message:"successfully added"});
    }
      
    })
    res.redirect("/");
})

// get delete post
router.get('/delete/:id', function(req, res, next) {
  request({
    url: "http://localhost:8000/posts/"+req.params.id,
    method: "DELETE",
    function(error, response, body) {
      res.render("index", {message: "successfully added"});
    }
  })
  res.redirect("/");
});

// post login page
router.post('/loginin', function(req, res, next)
  {
    var users = post.users;
    console.log(users);

    var username = req.body.username;
    var password = req.body.password;
    console.log("username:" +username);

    for(let i in users){
      console.log(username);
      if(username == users[i].username &&
      password == users[i].password){
        res.render('index',{title:'Home',
      posts: posts.posts});
      }
    }
    res.render('loginin',{title:'login'});
  });


module.exports = router;
