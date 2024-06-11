var express = require('express');
var router = express.Router();
const weatherModel = require('../model/weather.js');
/* GET weather page. */
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

  const data = await weatherModel.getWeatherData();
  console.log(data);

  //Tracking if the visitor has visited the website before, normally the session id resets upon every visit to the main page. Now we can watch the visitor and what they do.
  req.session.visited = true;
  res.render('weather', {weatherData: data});
});


router.post(
  '/logout',
  (req,res)=>
  {
    req.session.destroy();
    res.redirect('/');  

  }
)

module.exports = router;
