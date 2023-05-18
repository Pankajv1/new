const express = require('express');
const router = new express.Router();
const LoginController = require('../controllers/LoginController');
router.post('/registation',LoginController.registation);
router.post('/login',LoginController.login);
module.exports = router;  