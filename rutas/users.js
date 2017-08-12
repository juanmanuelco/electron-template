var express = require('express'), 
    router = express.Router(),
    passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	E_DBF_USUARIO = require('../modelos/user'),
    bcrypt = require('bcryptjs');
    
module.exports = router;
