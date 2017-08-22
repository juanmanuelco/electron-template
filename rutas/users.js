var express = require('express'), 
    router = express.Router(),
    passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	E_DBF_USUARIO = require('../modelos/user'),
    bcrypt = require('bcryptjs');

router.get('/login',function(req,res){
    res.render('login')
})

router.get('/administracion', function(req, res){
	res.render('administracion');
});

// registrar usuarios
router.post('/administracion', function(req, res){
	//var name = req.body.name;
	//var email = req.body.email;
	var username = req.body.username;
    var password = req.body.password;
	var typoUser = req.body.typoUser;
	if(typoUser=="Usuario Normal") {var verificar = '';}else{var verificar = 'administrador';};


	//console.log(verificar);
	req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('typoUser', 'Typo de usuario is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.render('administracion',{
			errors:errors
		});
	} else {
		var newUser = new E_DBF_USUARIO({
			//name: name,
			//email:email,
			username: username,
            password: password,
			typoUser: typoUser,
			verificar: verificar
		});

		E_DBF_USUARIO.createUser(newUser, function(err, user){
			if(err) throw err;
			//console.log(user);
		});

		req.flash('success_msg', 'Ha sido registrado satisfactoriamente');

		res.redirect('/users/login');
	}
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    E_DBF_USUARIO.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
		   return done(null, false, {message: 'usuario desconocido'});
		   console.log(user);
   	}

   	E_DBF_USUARIO.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Contrasena incorrecta'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    E_DBF_USUARIO.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/users/login');
});

module.exports = router;
    