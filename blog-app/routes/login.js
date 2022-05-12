
var express = require('express');
var router = express.Router();
var services = require('../services/login');
var {authenticateRequest} = require('../services/global')



/* GET home page. */
router.get('/', services.get);
router.get('test',authenticateRequest,services.test);



module.exports = router;