var express = require('express');
var router = express.Router();
const tourFunctions = require("../model/tour.js");

/* GET booking page. */
router.get('/', async function(req, res, next) {
  try {
    console.log(req.session);
    console.log(req.session.id);
    console.log(req.session.userID);
    console.log(req.session.isLoggedIn);

    req.sessionStore.get(req.session.id, (err, sessionData) => {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log(sessionData);
    });

    req.session.visited = true;

    const tours = await tourFunctions.getTours();
    console.log('Tours:', tours);

    res.render('booking', {
      title: 'Booking Page',
      tours: tours
    });
  } catch (error) {
    console.error('Error fetching tours:', error.message);
    res.status(500).send('Error fetching tours');
  }
});

module.exports = router;
