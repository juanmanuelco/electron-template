var express = require('express'), 
    router = express.Router();

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) 
		return next();
	else 
		res.redirect('/users/login');	
}

router.get('/control-actividades',function(req,res){
	res.render('Control_Actividades')
});

router.get('/productos',function(req,res){
	res.render('productos')
});

router.get('/inventario',function(req,res){
	res.render('inventario')
});
module.exports = router;
