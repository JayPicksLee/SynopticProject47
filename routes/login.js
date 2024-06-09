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

  res.render('login');
});

//POST METHOD login: Logging in the user by checking if the user first exists, and then checking the users login details (username, password). The users account level is then checked in order to direct them to the correct page.
router.post(
    '/loginRequest', 
    async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
  
    try {
      //Checking if the username inputted exists
      const exists = await usermodel.checkExists(email);
  
      if (exists) {
  
        const userID = await usermodel.getUserID(email);
        req.session.userID = userID;
        req.session.isLoggedIn = true;
        //Checking user details
        const user = await usermodel.checkLoginDetails(email, password);
  
        if (user) {
          
          const level = await usermodel.getUserStatus(email);
          //Checking user status to differentiate user and admin
          if (level) { 
            req.session.isAdmin = true;

            res.redirect('/admin');
          } else {
            req.session.isAdmin = false;
            res.redirect('/user');
          }
  
        } else {
  
          console.log("Invalid login details");
          res.render('/', { error: true, message: "Invalid login details" });
        }
      } else {
  
        console.log("User does not exist");
        res.render('/', { error: true, message: "User does not exist" });
      }
  
    } catch (error) {
  
      console.error("An error occurred:", error);
      res.render('index', { error: true, message: "An error occurred" });
    }
    

  });


module.exports = router;
