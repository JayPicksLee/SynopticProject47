var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session);
  console.log(req.session.id);
  console.log(req.session.userID);
  console.log(req.session.isLoggedIn);

  req.sessionStore.get(req.session.id, (err, sessionData) =>{
    if(err){
      console.log(err);
      throw err;
    }
    console.log(sessionData);
  });

  //Tracking if the visitor has visited the website before, normally the session id resets upon every visit to the main page. Now we can watch the visitor and what they do.
  req.session.visited = true;

  res.render('index', { title: 'Pu Ngaol, Here and Now' });
});

//POST METHOD logout: method is used for all pages, upon post request from any page from signout button, destroy the current session.
router.post(
  '/logout',
  (req,res)=>
  {
    req.session.destroy();
    res.redirect('/');  

  }
)

module.exports = router;
