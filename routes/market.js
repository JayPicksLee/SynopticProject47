var express = require('express');
var router = express.Router();
const marketmodel = require('../model/marketitem.js');

/* GET market page. */
router.get('/', async function(req, res, next) {
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
  let items = await marketmodel.getItems();
  console.log(items)
  res.render('market', { title: 'Market', items: items});
});

/* GET market page. */
router.get('/th/market', async function(req, res, next) {
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
  let items = await marketmodel.getItems();
  console.log(items)
  res.render('thaimarket', { title: 'Market', items: items});
});

module.exports = router;
