var express = require('express'), 
    router = express.Router();

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) 
		return next();
	else 
		res.redirect('/users/login');	
} 

/*router.get('/ventas', ensureAuthenticated, function(req, res){
	res.render('ventas');
});*/

router.get('/control-actividades',ensureAuthenticated,function(req,res){
	res.render('Control_Actividades')
});

router.get('/productos',ensureAuthenticated, function(req,res){
	res.render('productos')
});

router.get('/inventario',ensureAuthenticated, function(req,res){
	res.render('inventario')
});

router.get('/cliente',ensureAuthenticated, function(req,res){
	res.render('cliente')
});
router.get('/administracion',ensureAuthenticated,function(req,res){
	res.render('administracion')
})

module.exports = router;
