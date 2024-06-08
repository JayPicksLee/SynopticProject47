var express = require('express');
var router = express.Router();
const usermodel = require('../model/users.js');

/* GET users information. */
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

  const userInfo = await usermodel.getUserById(req.session.userID);
  console.log("USER IS" + userInfo);

  res.render('user', {user: userInfo});
});

router.post('/deleteUserAccount', (req,res) =>{
  const userId  = {_id: req.body.id};
  try {
    
    userModel.deleteUserAccount(userId);
    res.redirect('/');


  } catch (error) {
    
  }
});

module.exports = router;
