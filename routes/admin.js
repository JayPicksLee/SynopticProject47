var express = require('express');
var router = express.Router();
const userModel = require('../model/users.js');
const tourModel = require('../model/tour.js');
const marketItemModel = require('../model/marketitem.js');

//GET METHOD : Rendering the page with the market items, tours and users stored in the database with methods from the models.
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
  //Checking if the person is logged in, or verifying their authentication as an admin
  if(!req.session.isLoggedIn || req.session.isAdmin== false ){
    return res.redirect("/login");
  }else{


  //Tracking if the visitor has visited the website before, normally the session id resets upon every visit to the main page. Now we can watch the visitor and what they do.
  req.session.visited = true;

  res.render('admin', {users: user, tours: tour, items: item});
  }
});

//POST METHOD AddItem: Creating item based off inputs values from webpage upon post request.
router.post('/AddItem', (req, res) =>{

  const name = req.body.newItemName;
  const price = req.body.newItemPrice;
  const type = req.body.newItemType;
  const availability = req.body.newItemAvailability;

  marketItemModel.createItem(name,price,type, availability);
  res.redirect('/admin');

});
//POST METHOD AddTour: Creating tour based off inputs values from webpage upon post request.
router.post('/AddTour', (req, res) =>{

  const tourGuide = req.body.newTourGuide;
  const destination = req.body.newDestination;
  const description  = req.body.newDescription;
  const price = req.body.newPrice;
  const capacity = req.body.newCapacity;

  tourModel.createTour(tourGuide,destination,description, price, capacity);

  res.redirect('/admin');

});

//POST METHOD DeleteTour: Upon request, get id for the tour from the webpage and delete it from the database.
router.post('/DeleteTour', (req, res) =>{
  
  const tourId = {_id: req.body.id};
  try {
    
    tourModel.deleteTour(tourId);
    res.redirect('/admin');

  } catch (error) {
    
  }

})
//POST METHOD DeleteITem: Upon request, get id for the item from the webpage and delete it from the database.
router.post('/DeleteItem', (req, res) =>{
  const itemId = {_id : req.body.id};
  try {
    
    marketItemModel.deleteItem(itemId);
    res.redirect('/admin');

  } catch (error) {
    
  }

  res.redirect('/admin');

});
//POST METHOD DeleteUserAccount: Upon request, get id for the user from the webpage and delete it from the database.
router.post('/deleteUserAccount', (req,res) =>{
  const userId  = {_id: req.body.id};
  try {
    userModel.deleteUserAccount(userId);
    res.redirect('/admin');


  } catch (error) {
    
  }
});

module.exports = router;