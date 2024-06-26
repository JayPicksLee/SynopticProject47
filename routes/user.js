var express = require('express');
var router = express.Router();
const usermodel = require('../model/users.js');

//GET METHOD: Rendering user page upon get request with the users personal details

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

  if(!req.session.isLoggedIn){
    return res.redirect("/login");
  }else{

  //Tracking if the visitor has visited the website before, normally the session id resets upon every visit to the main page. Now we can watch the visitor and what they do.
  req.session.visited = true;

  const userInfo = await usermodel.getUserById(req.session.userID);
  console.log("USER IS" + userInfo);

  switch (req.session.language) {
    case "en":
      res.render('user', {user: userInfo});
      break;
    case "th": 
      res.render('thaiUser', {user: userInfo});
      break;
    case "kh": 
      res.render('khmerUser', {user: userInfo});
      break;
    default: 
      break;
  }
 }

});

//POST METHOD deleteUserAccount: Upon post request, get userid attached to the user rendered on the page and delete the id from the database.
router.post('/deleteUserAccount', (req,res) =>{
  const userId  = {_id: req.body.id};
  try {

    usermodel.deleteUserAccount(userId);
    res.redirect('/');

  } catch (error) {
    
  }
});

module.exports = router;
