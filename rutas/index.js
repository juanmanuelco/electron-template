var express = require('express'), 
    router = express.Router();

//De esta forma mostramos la página principal de nuestra aplicación    
router.get('/',function(req,res){
    //usamos la cadena JSON despues de la coma ('index',{ESTA ES LA CADENA JSON}), con el fin de poder enviar datos desde aquí hasta el cliente
    //Para que esto funcione debemos poner {{saludo}} en el handlebars correspondiente
    res.render('index',{saludo:'Hola a todos'})
})

module.exports = router;
