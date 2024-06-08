var express = require('express');
var router = express.Router();
const userModel = require('../model/users.js');
const tourModel = require('../model/tour.js');
const marketItemModel = require('../model/marketitem.js');

/* GET admin page */
router.get('/', async function(req, res, next) {
  console.log(req.session);
  console.log(req.session.id);
  console.log(req.session.userID);
  console.log(req.session.isLoggedIn);

  let user = await userModel.getUsers();
  let item = await marketItemModel.getItems();
  let tour = await tourModel.getTours();  

  req.sessionStore.get(req.session.id, (err, sessionData) =>{
    if(err){
      console.log(err);
      throw err;
    }
    console.log(sessionData);
  });

  //Tracking if the visitor has visited the website before, normally the session id resets upon every visit to the main page. Now we can watch the visitor and what they do.
  req.session.visited = true;
  req.session.isAdmin = true;

  res.render('admin', {users: user, tours: tour, items: item});
});

router.post('/AddItem', (req, res) =>{

  const name = req.body.newItemName;
  const price = req.body.newItemPrice;
  const type = req.body.newItemType;
  const availability = req.body.newItemAvailability;

  marketItemModel.createItem(name,price,type, availability);
  res.redirect('/admin');

});

router.post('/DeleteItem', (req, res) =>{
  const itemId = {_id : req.body.id};
  try {
    
    marketItemModel.deleteItem(itemId);
    res.redirect('/admin');

  } catch (error) {
    
  }

  marketItemModel.createItem(name,price,type, availability);
  res.redirect('/admin');

});
module.exports = router;
