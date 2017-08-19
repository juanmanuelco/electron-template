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

router.get('/productos',function(req,res){
	res.render('productos')
});

router.get('/inventario',function(req,res){
	res.render('inventario')
});

router.get('/cliente',function(req,res){
	res.render('cliente')
});

module.exports = router;
