var express = require('express'), 
    router = express.Router();
	var EMAEVENTINV_OBJ=require('../modelos/productos')
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
//===================Productos===============================================//

//renderiza en la ruta /productos la vista productos 
router.get('/productos',function(req,res){
	res.render('productos')
});
//Obtener los valores de los input para guardarlos en el esquema o eso se supone..
router.post('/productos',function(req,res){
	
	var nuevoProducto=new EMAEVENTINV_OBJ({
		CodigoProducto:req.body.Cod_Prod,
		Descripcion:req.body.Des_Prod,
		Existencia:req.body.Exis_Prod,
		PrecComp_Pro:req.body.PrecComp_Pro,
		PrecVen_Pro:req.body.PrecVen_Pro
	})
	nuevoProducto.save(function(error,resp){
		if(error){
			res.render('500',{error:error})
		}else{
			res.render('productos',{success_msg:'Guardado'})
		}
	})
});
//renderiza en la ruta inventario la vista inventario
router.get('/inventario',function(req,res){
	res.render('inventario')
});

//===================Productos fin===============================================//

router.get('/cliente',function(req,res){
	res.render('cliente')
});

router.get('/registro_empleado',function(req,res){
	res.render('registro_empleado')
});

module.exports = router;
