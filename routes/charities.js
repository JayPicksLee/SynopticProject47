var express = require('express');
var router = express.Router();

/* GET market page. */
router.get('/', function(req, res, next) {
  res.render('charities', { title: 'Welcome to the charities page' });
});

module.exports = router;
