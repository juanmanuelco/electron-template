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
//Se quita la autenticacion solo por el momento
router.get('/',function(req,res){
    //usamos la cadena JSON despues de la coma ('index',{ESTA ES LA CADENA JSON}), con el fin de poder enviar datos desde aquí hasta el cliente
    //Para que esto funcione debemos poner {{saludo}} en el handlebars correspondiente
    res.render('index',{saludo:'Hola a todos'})
})

module.exports = router;
