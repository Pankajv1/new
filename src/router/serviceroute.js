const express = require('express');
const route = new express.Router();
 const ServiceController = require('../controllers/ServiceController');
 route.get('/list_service',ServiceController.list);
 route.post('/save_service',ServiceController.saveservice);
 route.delete('/delete_service/:id',ServiceController.deleteservice);
 route.get('/single_service/:id',ServiceController.singleservice);
 route.patch('/update_service/:id',ServiceController.updateservice);
module.exports = route;