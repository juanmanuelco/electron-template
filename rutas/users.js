var express = require('express'), 
    router = express.Router(),
    passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	E_DBF_USUARIO = require('../modelos/user'),
    bcrypt = require('bcryptjs');

router.get('/login',function(req,res){
    res.render('login')
})

    
module.exports = router;
