var express = require('express');
var router = express.Router();

/* GET market page. */
router.get('/', function(req, res, next) {
  res.render('tourism', { title: 'Welcome to the tourism page' });
});

module.exports = router;
