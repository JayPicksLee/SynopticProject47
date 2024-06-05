var express = require('express');
var router = express.Router();
const usermodel = require('../model/users.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post('/createNewUser', (req, res, next) => {

    const username = req.body.username;
    const password = req.body.password;
  
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
  
    try 
    {
        usermodel.signUpUser(username, password, email, phoneNumber);
        
        console.log("Signup successful");
        res.redirect('/login');
        
    } 
    catch (error) 
    { 
        res.render('signup', { errorMessage: error.message });
    }
  });

module.exports = router;
