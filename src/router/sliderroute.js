const express = require('express');
const route = new express.Router();
 const SliderController = require('../controllers/SliderController');
 route.get('/slider_list',SliderController.list);
 route.post('/save_slider',SliderController.saveslider);
 route.delete('/delete_slider/:id',SliderController.deleteslider);
 route.get('/get_slider/:id',SliderController.singleslider);
 route.patch('/update_slider/:id',SliderController.updateslider);
module.exports = route;