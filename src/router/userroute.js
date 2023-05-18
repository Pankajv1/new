const express = require('express');
const router = new express.Router();
const UserController = require('../controllers/UserController');
router.get('/all_user',UserController.getalluser);
router.get('/user/:id',UserController.user);
router.patch('/upadate_user/:id',UserController.updateuser);
router.delete('/deleteuser/:id',UserController.deleteuser);
router.get('/getdepartment',UserController.getdepartment);
router.post('/saveaddress',UserController.saveaddress);  
router.patch('/updateaddress/:id',UserController.updateaddress);  
router.delete('/deleteaddress/:id',UserController.deleteaddress);  
router.get('/fetch_user_all_address/:id',UserController.fetchalluseraddress);  
router.get('/fetch_user_single_address/:id',UserController.fetchuseraddress);  
router.patch('/updateprofile/:id',UserController.updateprofile);  
router.delete('/deleteprofile/:id',UserController.deleteprofile);  
router.patch('/edituserprofile/:id',UserController.edituserprofile);  
router.get('/getpermission',UserController.getpermission);  
router.post('/setpermission',UserController.setpermission);  

module.exports = router;