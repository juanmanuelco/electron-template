var express = require('express'), 
    router = express.Router();

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) 
		return next();
	else 
		res.redirect('/users/login');	
} 

router.get('/ventas', function(req, res){
	res.render('ventas');
});

router.get('/control-actividades',function(req,res){
	res.render('Control_Actividades')
});

module.exports = router;
