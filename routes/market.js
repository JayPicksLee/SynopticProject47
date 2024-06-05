var express = require('express');
var router = express.Router();

/* GET market page. */
router.get('/', function(req, res, next) {
  res.render('market', { title: 'Welcome to the market' });
});

module.exports = router;
