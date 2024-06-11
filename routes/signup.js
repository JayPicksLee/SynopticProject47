var express = require('express');
var router = express.Router();
const usermodel = require('../model/users.js');

//GET METHOD: Rendering signup page upon get request

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

    switch (req.session.language) {
      case "en":
        res.render('signup');
        break;
      case "th": 
        res.render('thaiSignup');
        break;
      case "kh": 
        res.render('khmerSignup');
        break;
      default:
        break;
    }
});

//POST METHOD createnewUser: Creates user with model function, with values in input fields.
router.post('/createNewUser', async (req, res, next) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
  
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;

    try {
        await usermodel.signUpUser(firstName, lastName, password, email, phoneNumber);
        console.log("Signup successful");
        return res.redirect("/login");
    } catch (error)  { 
        res.render('signup', { errorMessage: error.message });
    }

  });

module.exports = router;
