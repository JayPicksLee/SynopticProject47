var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session);
  console.log(req.session.id);
  console.log(req.session.userID);
  console.log(req.session.isLoggedIn);
  req.session.language = "en";
  console.log(req.session.language);

  req.sessionStore.get(req.session.id, (err, sessionData) =>{
    if(err){
      console.log(err);
      throw err;
    }
    console.log(sessionData);
  });

  //Tracking if the visitor has visited the website before, normally the session id resets upon every visit to the main page. Now we can watch the visitor and what they do.
  req.session.visited = true;

  res.render('index' , {title: 'Pu Ngaol, Here and Now' });

});

//GET REQUEST th: For the thai version of the website
router.get('/th', function(req, res, next) {
  console.log(req.session);
  console.log(req.session.id);
  console.log(req.session.userID);
  console.log(req.session.isLoggedIn);
  req.session.language = "th";
  console.log(req.session.language);
  req.sessionStore.get(req.session.id, (err, sessionData) =>{
    if(err){
      console.log(err);
      throw err;
    }
    console.log(sessionData);
  });

  //Tracking if the visitor has visited the website before, normally the session id resets upon every visit to the main page. Now we can watch the visitor and what they do.
  req.session.visited = true;

  res.render('thaiIndex', { title: 'Pu Ngaol, Here and Now' });
});

//GET REQUEST kh: For the khmer version of the website
router.get('/kh', function(req, res, next) {
  console.log(req.session);
  console.log(req.session.id);
  console.log(req.session.userID);
  console.log(req.session.isLoggedIn);
  req.session.language = "kh";
  console.log(req.session.language);
  req.sessionStore.get(req.session.id, (err, sessionData) =>{
    if(err){
      console.log(err);
      throw err;
    }
    console.log(sessionData);
  });

  //Tracking if the visitor has visited the website before, normally the session id resets upon every visit to the main page. Now we can watch the visitor and what they do.
  req.session.visited = true;

  res.render('khmerIndex', { title: 'Pu Ngaol, Here and Now' });
});

//POST METHOD logout: method is used for all pages, upon post request from any page from signout button, destroy the current session.
router.post(
  '/logout',
  (req,res)=>
  {

    switch (req.session.language) {
      case "en":
        res.redirect('/');
        break;
      case "th": 
        res.redirect('/th');
        break;
      case "kh":
        res.redirect('/kh');
        break;
      default:
        break;
    }
    req.session.destroy();

  }
)

module.exports = router;
