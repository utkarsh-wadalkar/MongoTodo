

const express = require('express');
const router = express.Router();
const authcontroller = require('../controller/authcontroller');

router.post('/register', authcontroller.register);
router.post('/login', authcontroller.login); //we will be sending JSON WEB TOKEN for authorization purpose
module.exports = router;    


