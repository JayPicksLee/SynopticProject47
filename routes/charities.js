var express = require('express');
var router = express.Router();

/* GET charities page. */
router.get('/', function(req, res, next) {
  console.log(req.session);
  console.log(req.session.id);
  console.log(req.session.userID);
  console.log(req.session.isLoggedIn);
  console.log(req.session.language);
  req.sessionStore.get(req.session.id, (err, sessionData) =>{
    if(err){
      console.log(err);
      throw err;
    }
    console.log(sessionData);
  });

  req.session.visited = true;

  switch (req.session.language) {
    case "en":
      res.render('charities', { title: 'Market'});
      break;
    case "th": 
      res.render('thaiCharities');
    case "kh": 
      res.render('khmerCharities');
    default:
      break;
  }

  //Tracking if the visitor has visited the website before, normally the session id resets upon every visit to the main page. Now we can watch the visitor and what they do.

});

module.exports = router;
