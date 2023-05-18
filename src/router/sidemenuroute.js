const express = require('express');
const route = new express.Router();
 const SidemenuController = require('../controllers/SidemenuController');
 route.get('/list_sidemenu',SidemenuController.list);
 route.post('/save_sidemenu',SidemenuController.savesidemenu);
 route.delete('/delete_sidemenu/:id',SidemenuController.deletesidemenu);
 route.get('/singlesidemenu/:id',SidemenuController.singlesidemenu);
 route.patch('/updatesidemenu/:id',SidemenuController.updatesidemenu);
module.exports = route;