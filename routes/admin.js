var express = require('express');
var router = express.Router();
const userModel = require('../model/users.js');

/* GET admin page */
router.get('/', async function(req, res, next) {
  console.log(req.session);
  console.log(req.session.id);
  console.log(req.session.userID);
  console.log(req.session.isLoggedIn);

  let user = await userModel.getUsers();
  

  req.sessionStore.get(req.session.id, (err, sessionData) =>{
    if(err){
      console.log(err);
      throw err;
    }
    console.log(sessionData);
  });

  //Tracking if the visitor has visited the website before, normally the session id resets upon every visit to the main page. Now we can watch the visitor and what they do.
  req.session.visited = true;
  req.session.isAdmin = true;

  res.render('admin', {users: user});
});

module.exports = router;
