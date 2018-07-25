var express = require('express');
var router = express.Router();
var posts = require('../db.json');
var request = require("request");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Budget Travelling', posts: posts.posts });
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
  var id;
  var posts = posts.posts;
  
  for(var i = 0; i < post.length; i++){
    if(post[i].id == req.params.id){
      id = i;
    }
  }

  res.render('edit', {
    title : 'Edit Page',
    posts : posts.posts,
    id : id
  });
});

router.get("/edit/:id", function(req, res, next){
  console.log(req.params.id);
  request({
    url: "http://localhost:8000/contact/"+req.params.id,
    method: "PATCH",
    form: {
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
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


module.exports = router;
