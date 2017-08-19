var express = require('express'), 
    router = express.Router();

function ensureAuthenticated(req, res, next) { 
	if (req.isAuthenticated()) { 
		return next(); 
	} else { 
		res.redirect('/users/login'); 
	} 
}

//De esta forma mostramos la página principal de nuestra aplicación  

//router.get('/',ensureAuthenticated,function(req,res){
router.get('/',ensureAuthenticated, function(req,res){
    //usamos la cadena JSON despues de la coma ('index',{ESTA ES LA CADENA JSON}), con el fin de poder enviar datos desde aquí hasta el cliente
    //Para que esto funcione debemos poner {{saludo}} en el handlebars correspondiente
    res.render('ventas',{saludo:'Modulo de Ventas'})
})

module.exports = router;
