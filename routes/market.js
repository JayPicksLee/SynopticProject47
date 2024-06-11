var express = require('express');
var router = express.Router();
const marketmodel = require('../model/marketitem.js');

/* GET market page. */
router.get('/', async function(req, res, next) {
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

  //Tracking if the visitor has visited the website before, normally the session id resets upon every visit to the main page. Now we can watch the visitor and what they do.
  req.session.visited = true;
  let items = await marketmodel.getItems();

  console.log
  (items)
  switch (req.session.language) {
    case "en":
      res.render('market', {items: items});
      break;
    case "th": 
      res.render('thaiMarket', {items:items});
      break;
    case "kh":
      res.render('khmerMarket', {items: items});
      break;
    default:
      break;
  }

});
module.exports = router;
