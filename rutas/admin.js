var express = require('express'), 
    router = express.Router();

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) 
		return next();
	else 
		res.redirect('/users/login');	
} 

router.get('/ventas', ensureAuthenticated , function(req, res){
	res.render('ventas');
});


module.exports = router;
