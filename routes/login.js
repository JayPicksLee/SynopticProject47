var express = require('express');
var router = express.Router();
const usermodel = require('../model/users.js');

//GET METHOD: Rendering login page upon site start up
router.get('/', function(req, res, next) { 
    console.log(req.session);
    console.log(req.session.id);
    console.log(req.session.userID);
    console.log(req.session.isLoggedIn);

    req.session.isAdmin = false;
    req.sessionStore.get(req.session.id, (err, sessionData) =>{
      if(err){
        console.log(err);
        throw err;
      }
      console.log(sessionData);
    });
  
    //Tracking if the visitor has visited the website before, normally the session id resets upon every visit to the main page. Now we can watch the visitor and what they do.
    req.session.visited = true;

    switch (req.session.language) {
      case "en":
        res.render('login');
        break;
      case "th": 
        res.render('thaiLogin');
        break;
      case "kh": 
        res.render('khmerLogin');
        break;
      default:
        break;
    }
});

//POST METHOD login: Logging in the user by checking if the user first exists, and then checking the users login details (username, password). The users account level is then checked in order to direct them to the correct page.
router.post(
    '/loginRequest', 
    async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
  
    try {
      //Checking if email exists already
      const exists = await usermodel.checkExists(email);
  
      if (exists) {
  
        //Checking login details - password and email
        const user = await usermodel.checkLoginDetails(email, password);
  
        if (user) {
          const userID = await usermodel.getUserID(email);
          req.session.userID = userID;
          req.session.isLoggedIn = true;
          // Gets users account level 
          const level = await usermodel.getUserStatus(email);

          if (level) { 
            req.session.isAdmin = true;

            res.redirect('/admin');
            
          } else if(!level){
            req.session.isAdmin = false;

            res.redirect('/user');
          }
  
        }
      }else if (!exists){
        throw new Error("User does not exist");
      }
    } catch (error) {
      switch (req.session.language) {
        case "en":
          res.render('login',{errorMessage: error.message });
          break;
        case "th": 
          res.render('thaiLogin', {errorMessage: error.message });
          break;
        case "kh": 
          res.render('khmerLogin', {errorMessage: error.message });
          break;
        default:
          break;
      }
    }
    
  });


module.exports = router;
